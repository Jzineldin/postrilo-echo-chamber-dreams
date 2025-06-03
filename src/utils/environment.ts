
export const isProduction = () => import.meta.env.PROD;
export const isDevelopment = () => import.meta.env.DEV;

export const getEnvironmentConfig = () => ({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  environment: import.meta.env.MODE,
  baseUrl: import.meta.env.VITE_BASE_URL || window.location.origin
});

export const logEnvironmentInfo = () => {
  if (isDevelopment()) {
    console.log('Environment Config:', getEnvironmentConfig());
  }
};
