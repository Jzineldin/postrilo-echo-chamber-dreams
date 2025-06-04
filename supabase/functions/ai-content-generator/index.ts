
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerationRequest {
  prompt: string;
  type?: string;
  platforms?: string[];
  temperature?: number;
  maxTokens?: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedContent?: string;
}

// Security validation functions
function validateInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

function validateContentSafety(content: string): { isValid: boolean; reason?: string } {
  // Check for script injection attempts
  const scriptPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi
  ];

  for (const pattern of scriptPatterns) {
    if (pattern.test(content)) {
      return { isValid: false, reason: 'Potentially malicious content detected' };
    }
  }

  // Check for excessive special characters
  const specialCharCount = (content.match(/[<>{}[\]]/g) || []).length;
  if (specialCharCount > content.length * 0.1) {
    return { isValid: false, reason: 'Excessive special characters detected' };
  }

  return { isValid: true };
}

function validateGenerationRequest(request: GenerationRequest, userId: string): ValidationResult {
  const errors: string[] = [];

  // Sanitize and validate prompt
  const sanitizedPrompt = validateInput(request.prompt);
  if (!sanitizedPrompt || sanitizedPrompt.length < 3) {
    errors.push('Prompt must be at least 3 characters long');
  }

  if (sanitizedPrompt.length > 2000) {
    errors.push('Prompt is too long (max 2000 characters)');
  }

  // Content safety check
  const safetyCheck = validateContentSafety(request.prompt);
  if (!safetyCheck.isValid) {
    errors.push(safetyCheck.reason || 'Content validation failed');
  }

  // Platform validation
  if (request.platforms) {
    const validPlatforms = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok', 'youtube'];
    const invalidPlatforms = request.platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      errors.push(`Invalid platforms: ${invalidPlatforms.join(', ')}`);
    }
  }

  // Type validation
  if (request.type) {
    const validTypes = ['content', 'video-script', 'story', 'carousel'];
    if (!validTypes.includes(request.type)) {
      errors.push(`Invalid content type: ${request.type}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedContent: sanitizedPrompt
  };
}

function checkRateLimit(userId: string): boolean {
  // In a real implementation, this would check against a database or Redis
  // For now, we'll implement a simple in-memory rate limiting
  const now = Date.now();
  const timeWindow = 60000; // 1 minute
  const maxRequests = 10;

  // This is simplified - in production, use proper rate limiting with Redis
  return true; // Allow for now, but structure is in place
}

function logSecurityEvent(event: string, userId: string, details: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    userId,
    details,
    function: 'ai-content-generator'
  };

  console.log('🔒 Security Event:', JSON.stringify(logEntry));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      logSecurityEvent('unauthorized_ai_request', 'anonymous', {
        error: authError?.message || 'No user found'
      });
      
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Rate limiting check
    if (!checkRateLimit(user.id)) {
      logSecurityEvent('rate_limit_exceeded', user.id, {});
      
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait before making more requests.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const requestData: GenerationRequest = await req.json();

    // Validate the request
    const validation = validateGenerationRequest(requestData, user.id);
    
    if (!validation.isValid) {
      logSecurityEvent('invalid_content_request', user.id, {
        errors: validation.errors,
        originalPrompt: requestData.prompt.substring(0, 100)
      });
      
      return new Response(
        JSON.stringify({ 
          error: `Validation failed: ${validation.errors.join(', ')}`,
          validationErrors: validation.errors
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log successful validation
    logSecurityEvent('content_generation_request', user.id, {
      type: requestData.type,
      platforms: requestData.platforms,
      promptLength: requestData.prompt.length
    });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    let generatedContent = '';
    let error = null;
    let provider = 'none';

    // Try OpenAI first
    if (openAIApiKey) {
      try {
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a professional content creator. Create engaging ${requestData.type || 'social media'} content for ${requestData.platforms?.[0] || 'social media'}.`
              },
              {
                role: 'user',
                content: validation.sanitizedContent || requestData.prompt
              }
            ],
            max_tokens: requestData.maxTokens || 500,
            temperature: requestData.temperature || 0.7,
          }),
        });

        if (openAIResponse.ok) {
          const data = await openAIResponse.json();
          generatedContent = data.choices[0].message.content;
          provider = 'openai';
        }
      } catch (openAIError) {
        console.error('OpenAI error:', openAIError);
      }
    }

    // Try Gemini as fallback
    if (!generatedContent && geminiApiKey) {
      try {
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Create engaging ${requestData.type || 'social media'} content for ${requestData.platforms?.[0] || 'social media'}: ${validation.sanitizedContent || requestData.prompt}`
              }]
            }],
            generationConfig: {
              temperature: requestData.temperature || 0.7,
              maxOutputTokens: requestData.maxTokens || 500,
            },
          }),
        });

        if (geminiResponse.ok) {
          const data = await geminiResponse.json();
          generatedContent = data.candidates[0].content.parts[0].text;
          provider = 'gemini';
        }
      } catch (geminiError) {
        console.error('Gemini error:', geminiError);
      }
    }

    // Provide secure fallback if both providers fail
    if (!generatedContent) {
      error = 'AI services temporarily unavailable';
      generatedContent = `Here's a professional ${requestData.type || 'post'} about ${requestData.prompt}:\n\n` +
                        `${requestData.prompt} is an important topic that deserves attention. ` +
                        `Let me share some thoughts on this subject.\n\n` +
                        `Key points to consider:\n` +
                        `• This topic has significant relevance\n` +
                        `• Understanding different perspectives is valuable\n` +
                        `• Continued discussion helps build awareness\n\n` +
                        `What are your thoughts on this topic? Share your perspective below!`;
      provider = 'secure_fallback';
    }

    // Final content validation
    const finalSafetyCheck = validateContentSafety(generatedContent);
    if (!finalSafetyCheck.isValid) {
      logSecurityEvent('unsafe_content_generated', user.id, {
        reason: finalSafetyCheck.reason,
        provider
      });
      
      // Use sanitized fallback
      generatedContent = `Content generated about: ${validation.sanitizedContent}\n\nThis is a safe, moderated response created with security validation.`;
    }

    // Log successful generation
    logSecurityEvent('content_generated_successfully', user.id, {
      provider,
      contentLength: generatedContent.length,
      hadError: !!error
    });

    return new Response(
      JSON.stringify({
        content: generatedContent,
        error,
        provider,
        usage: {
          promptTokens: Math.floor((validation.sanitizedContent || requestData.prompt).length / 4),
          completionTokens: Math.floor(generatedContent.length / 4),
          totalTokens: Math.floor(((validation.sanitizedContent || requestData.prompt).length + generatedContent.length) / 4)
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        content: 'Content generation is temporarily unavailable. Please try again later.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
