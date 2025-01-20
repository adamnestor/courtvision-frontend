interface ImportMetaEnv {
  VITE_API_URL: string;
}

export function validateEnv() {
  const requiredEnvVars: (keyof ImportMetaEnv)[] = ["VITE_API_URL"];

  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

export const ENV = {
  API_URL: import.meta.env.VITE_API_URL,
} as const;
