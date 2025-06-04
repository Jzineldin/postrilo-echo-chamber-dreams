
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Enhanced input validation
function validateInput(requestData: any): { isValid: boolean; error?: string } {
  if (!requestData) {
    return { isValid: false, error: "Request body is required" };
  }

  const { prompt, type, provider } = requestData;

  // Validate prompt
  if (!prompt || typeof prompt !== 'string') {
    return { isValid: false, error: "Prompt is required and must be a string" };
  }

  if (prompt.length < 5 || prompt.length > 2000) {
    return { isValid: false, error: "Prompt must be between 5 and 2000 characters" };
  }

  // Validate type
  const validTypes = ['content', 'video-script', 'social-post'];
  if (type && !validTypes.includes(type)) {
    return { isValid: false, error: `Type must be one of: ${validTypes.join(', ')}` };
  }

  // Validate provider
  const validProviders = ['openai', 'gemini', 'groq'];
  if (provider && !validProviders.includes(provider)) {
    return { isValid: false, error: `Provider must be one of: ${validProviders.join(', ')}` };
  }

  return { isValid: true };
}

// Enhanced content safety check
function checkContentSafety(prompt: string): { isSafe: boolean; reason?: string } {
  const unsafePatterns = [
    /\b(hack|exploit|vulnerability|ddos|sql injection|xss|csrf)\b/gi,
    /\b(password|credit card|ssn|social security)\b/gi,
    /\b(bomb|weapon|terrorist|violence)\b/gi,
    /<script|javascript:|data:|vbscript:/gi,
    /\b(admin|root|sudo|chmod|rm -rf)\b/gi
  ];

  for (const pattern of unsafePatterns) {
    if (pattern.test(prompt)) {
      return { 
        isSafe: false, 
        reason: `Content contains potentially unsafe patterns: ${pattern.source}` 
      };
    }
  }

  return { isSafe: true };
}

// Rate limiting check
async function checkRateLimit(supabase: any, userId: string): Promise<{ allowed: boolean; resetTime?: number }> {
  const now = new Date();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  try {
    const { data: recentRequests, error } = await supabase
      .from('api_usage')
      .select('request_count')
      .eq('user_id', userId)
      .eq('provider', 'multi-provider-ai')
      .gte('created_at', hourAgo.toISOString());

    if (error) {
      console.error('Rate limit check error:', error);
      return { allowed: true }; // Allow on error to avoid blocking users
    }

    const totalRequests = recentRequests?.reduce((sum, record) => sum + (record.request_count || 1), 0) || 0;
    const rateLimit = 50; // 50 requests per hour

    if (totalRequests >= rateLimit) {
      const resetTime = hourAgo.getTime() + (60 * 60 * 1000);
      return { allowed: false, resetTime };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true }; // Allow on error
  }
}

// Log security event
async function logSecurityEvent(
  supabase: any, 
  event: string, 
  userId: string, 
  details: any, 
  severity: string = 'medium',
  request: Request
) {
  try {
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwarded?.split(',')[0] || realIp || 'unknown';

    await supabase
      .from('security_events')
      .insert({
        event,
        user_id: userId,
        details,
        severity,
        source: 'multi-provider-ai',
        ip_address: ipAddress,
        user_agent: userAgent
      });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user from auth header
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      await logSecurityEvent(
        supabaseClient,
        'unauthorized_ai_access_attempt',
        'anonymous',
        { authError: authError?.message },
        'high',
        req
      );

      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check rate limiting
    const rateLimitResult = await checkRateLimit(supabaseClient, user.id);
    if (!rateLimitResult.allowed) {
      await logSecurityEvent(
        supabaseClient,
        'rate_limit_exceeded',
        user.id,
        { resetTime: rateLimitResult.resetTime },
        'medium',
        req
      );

      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          retryAfter: rateLimitResult.resetTime 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '3600'
          } 
        }
      )
    }

    const requestData = await req.json()

    // Enhanced input validation
    const validation = validateInput(requestData);
    if (!validation.isValid) {
      await logSecurityEvent(
        supabaseClient,
        'invalid_input_attempt',
        user.id,
        { error: validation.error, input: requestData },
        'low',
        req
      );

      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Enhanced content safety check
    const safetyCheck = checkContentSafety(requestData.prompt);
    if (!safetyCheck.isSafe) {
      await logSecurityEvent(
        supabaseClient,
        'unsafe_content_attempt',
        user.id,
        { prompt: requestData.prompt, reason: safetyCheck.reason },
        'high',
        req
      );

      return new Response(
        JSON.stringify({ 
          error: 'Content violates safety guidelines',
          reason: safetyCheck.reason 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log successful request
    await logSecurityEvent(
      supabaseClient,
      'content_generation_request',
      user.id,
      { 
        provider: requestData.provider || 'openai',
        type: requestData.type || 'content',
        promptLength: requestData.prompt.length
      },
      'low',
      req
    );

    // Track API usage
    try {
      await supabaseClient
        .from('api_usage')
        .insert({
          user_id: user.id,
          provider: 'multi-provider-ai',
          request_count: 1
        });
    } catch (error) {
      console.error('Failed to track API usage:', error);
    }

    // Proceed with AI generation (simplified response for demo)
    const response = {
      content: `Generated content for: ${requestData.prompt.substring(0, 50)}...`,
      usage: {
        promptTokens: Math.floor(requestData.prompt.length / 4),
        completionTokens: 150,
        totalTokens: Math.floor(requestData.prompt.length / 4) + 150
      }
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Multi-provider AI error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
