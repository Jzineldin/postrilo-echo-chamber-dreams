
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Helper function to get API key from Supabase secrets (preferred) or admin settings
async function getApiKey(provider: string): Promise<string | null> {
  // First try to get from Supabase secrets (new method)
  const secretKey = `${provider.toUpperCase()}_API_KEY`;
  let apiKey = Deno.env.get(secretKey);
  
  if (apiKey) {
    console.log(`Found ${provider} API key in Supabase secrets`);
    return apiKey;
  }

  // Fallback to admin_settings table (legacy method)
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('setting_value')
      .eq('setting_key', secretKey)
      .single();
    
    if (error || !data?.setting_value) {
      console.error(`Failed to get ${provider} API key from admin_settings:`, error);
      return null;
    }
    
    console.log(`Found ${provider} API key in admin_settings`);
    return data.setting_value;
  } catch (error) {
    console.error(`Error retrieving ${provider} API key:`, error);
    return null;
  }
}

// Helper function to track usage
async function trackUsage(userId: string, provider: string) {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const { error } = await supabase
      .from('api_usage')
      .upsert({
        user_id: userId,
        provider,
        usage_date: today,
        request_count: 1
      }, {
        onConflict: 'user_id,provider,usage_date',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('Failed to track usage:', error);
    }
  } catch (error) {
    console.error('Error tracking usage:', error);
  }
}

// Helper function to get usage count for today
async function getTodayUsage(userId: string, provider: string): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const { data, error } = await supabase
      .from('api_usage')
      .select('request_count')
      .eq('user_id', userId)
      .eq('provider', provider)
      .eq('usage_date', today)
      .single();

    if (error || !data) {
      return 0;
    }

    return data.request_count;
  } catch (error) {
    console.error('Error getting usage:', error);
    return 0;
  }
}

// Helper function to get user subscription
async function getUserSubscription(userId: string) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return { plan: 'free', status: 'active' };
    }

    return data;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return { plan: 'free', status: 'active' };
  }
}

// AI Provider implementations
async function callGemini(prompt: string, apiKey: string) {
  console.log('Calling Gemini API...');
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', response.status, errorText);
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    console.error('Invalid Gemini response structure:', data);
    throw new Error('Invalid response from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
}

async function callGroq(prompt: string, apiKey: string) {
  console.log('Calling Groq API...');
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a helpful social media content creator.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API error:', response.status, errorText);
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Invalid Groq response structure:', data);
    throw new Error('Invalid response from Groq API');
  }
  
  return data.choices[0].message.content;
}

async function callOpenAI(prompt: string, apiKey: string) {
  console.log('Calling OpenAI API...');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a world-class social media content creator and copywriter.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Invalid OpenAI response structure:', data);
    throw new Error('Invalid response from OpenAI API');
  }
  
  return data.choices[0].message.content;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authorization = req.headers.get('Authorization');
    if (!authorization) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the JWT token
    const token = authorization.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, preferredProvider } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`AI request from user ${user.id} with preferred provider: ${preferredProvider}`);

    // Get user subscription
    const subscription = await getUserSubscription(user.id);
    const isPro = subscription.plan !== 'free' && subscription.status === 'active';

    // Determine which provider to use based on subscription and availability
    let provider = 'groq'; // Default for free users
    
    if (isPro && preferredProvider === 'openai') {
      provider = 'openai';
    } else if (!isPro) {
      // For free users, check usage limits and alternate between Groq and Gemini
      const groqUsage = await getTodayUsage(user.id, 'groq');
      const geminiUsage = await getTodayUsage(user.id, 'gemini');
      
      const FREE_DAILY_LIMIT = 20;
      
      if (groqUsage >= FREE_DAILY_LIMIT && geminiUsage >= FREE_DAILY_LIMIT) {
        return new Response(
          JSON.stringify({ 
            error: 'Daily usage limit reached. Upgrade to Pro for unlimited access.',
            type: 'usage_limit',
            usageInfo: {
              groqUsage,
              geminiUsage,
              dailyLimit: FREE_DAILY_LIMIT
            }
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Use the provider with lower usage, prioritizing Groq
      provider = groqUsage <= geminiUsage ? 'groq' : 'gemini';
    }

    console.log(`Selected provider: ${provider}`);

    // Get API key for the selected provider
    let apiKey = await getApiKey(provider);
    if (!apiKey) {
      console.error(`${provider} API key not found`);
      
      // Try alternative provider for free users
      if (!isPro && provider !== 'openai') {
        const alternativeProvider = provider === 'groq' ? 'gemini' : 'groq';
        const alternativeUsage = await getTodayUsage(user.id, alternativeProvider);
        
        if (alternativeUsage < 20) {
          const alternativeApiKey = await getApiKey(alternativeProvider);
          if (alternativeApiKey) {
            console.log(`Trying alternative provider: ${alternativeProvider}`);
            provider = alternativeProvider;
            apiKey = alternativeApiKey;
          }
        }
      }
      
      if (!apiKey) {
        return new Response(
          JSON.stringify({ 
            error: `${provider} API key not configured. Please contact support.`,
            type: 'configuration_error'
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Call the appropriate AI provider
    let content: string;
    try {
      switch (provider) {
        case 'gemini':
          content = await callGemini(prompt, apiKey);
          break;
        case 'groq':
          content = await callGroq(prompt, apiKey);
          break;
        case 'openai':
          content = await callOpenAI(prompt, apiKey);
          break;
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error(`${provider} API error:`, error);
      
      // For free users, try the alternative provider if available
      if (!isPro && provider !== 'openai') {
        const alternativeProvider = provider === 'groq' ? 'gemini' : 'groq';
        const alternativeUsage = await getTodayUsage(user.id, alternativeProvider);
        
        if (alternativeUsage < 20) {
          const alternativeApiKey = await getApiKey(alternativeProvider);
          if (alternativeApiKey) {
            try {
              console.log(`Trying alternative provider: ${alternativeProvider}`);
              if (alternativeProvider === 'gemini') {
                content = await callGemini(prompt, alternativeApiKey);
              } else {
                content = await callGroq(prompt, alternativeApiKey);
              }
              provider = alternativeProvider; // Update provider for usage tracking
            } catch (alternativeError) {
              console.error(`Alternative provider ${alternativeProvider} also failed:`, alternativeError);
              throw error; // Throw original error
            }
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    // Track usage
    await trackUsage(user.id, provider);

    // Get updated usage for response
    const currentUsage = await getTodayUsage(user.id, provider);

    console.log(`AI response generated for user ${user.id} using ${provider}, usage: ${currentUsage}`);

    return new Response(
      JSON.stringify({ 
        content,
        provider,
        usage: {
          provider,
          todayCount: currentUsage,
          isPro,
          dailyLimit: isPro ? null : 20
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in multi-provider-ai function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
