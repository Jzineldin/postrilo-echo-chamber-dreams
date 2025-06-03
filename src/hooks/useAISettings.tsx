
import { useState, useEffect } from 'react';

export interface AISettings {
  provider: 'openai' | 'anthropic' | 'gemini';
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const DEFAULT_SETTINGS: AISettings = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 500,
};

const MODELS_BY_PROVIDER = {
  openai: ['gpt-4o', 'gpt-4o-mini'],
  anthropic: ['claude-3-haiku', 'claude-3-sonnet'],
  gemini: ['gemini-pro', 'gemini-pro-vision'],
};

export const useAISettings = () => {
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('ai-settings');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings(parsedSettings);
        setIsConfigured(!!parsedSettings.apiKey);
      } catch (error) {
        console.error('Error loading AI settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AISettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setIsConfigured(!!updated.apiKey);
    localStorage.setItem('ai-settings', JSON.stringify(updated));
  };

  const getAvailableModels = () => {
    return MODELS_BY_PROVIDER[settings.provider] || [];
  };

  const clearSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setIsConfigured(false);
    localStorage.removeItem('ai-settings');
  };

  return {
    settings,
    isConfigured,
    updateSettings,
    clearSettings,
    getAvailableModels,
  };
};
