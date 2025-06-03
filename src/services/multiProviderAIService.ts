
import { supabase } from "@/integrations/supabase/client";

export interface MultiProviderAIRequest {
  prompt: string;
  preferredProvider?: 'gemini' | 'groq' | 'openai';
  type?: 'content' | 'optimization' | 'hashtags';
}

export interface MultiProviderAIResponse {
  content: string;
  provider: string;
  usage?: {
    provider: string;
    todayCount: number;
    isPro: boolean;
    dailyLimit: number | null;
  };
  error?: string;
  type?: string;
  usageInfo?: {
    geminiUsage: number;
    groqUsage: number;
    dailyLimit: number;
  };
}

class MultiProviderAIService {
  async generateContent(request: MultiProviderAIRequest): Promise<MultiProviderAIResponse> {
    try {
      console.log('Calling multi-provider AI service:', request);
      
      const { data, error } = await supabase.functions.invoke('multi-provider-ai', {
        body: {
          prompt: request.prompt,
          preferredProvider: request.preferredProvider || 'gemini'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return {
          content: '',
          provider: '',
          error: error.message || 'Failed to generate content'
        };
      }

      if (data?.error) {
        console.error('Multi-provider AI service error:', data.error);
        return {
          content: '',
          provider: data.provider || '',
          error: data.error,
          type: data.type,
          usageInfo: data.usageInfo
        };
      }

      return {
        content: data?.content || '',
        provider: data?.provider || '',
        usage: data?.usage
      };
    } catch (error) {
      console.error('Multi-provider AI service error:', error);
      return {
        content: '',
        provider: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getUserUsage(): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('api_usage')
        .select('provider, request_count, usage_date')
        .eq('usage_date', new Date().toISOString().split('T')[0])
        .order('provider');

      if (error) {
        console.error('Failed to get user usage:', error);
        return {};
      }

      const usage: Record<string, number> = {};
      data?.forEach(item => {
        usage[item.provider] = item.request_count;
      });

      return usage;
    } catch (error) {
      console.error('Error getting user usage:', error);
      return {};
    }
  }

  async getUserSubscription(): Promise<{ plan: string; status: string; current_period_end?: string }> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan, status, current_period_end')
        .single();

      if (error || !data) {
        return { plan: 'free', status: 'active' };
      }

      return data;
    } catch (error) {
      console.error('Error getting user subscription:', error);
      return { plan: 'free', status: 'active' };
    }
  }
}

export const multiProviderAIService = new MultiProviderAIService();
