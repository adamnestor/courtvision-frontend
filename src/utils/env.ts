export const validateEnv = () => {
  const required = ["VITE_API_URL"];

  for (const variable of required) {
    if (!import.meta.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }
};
