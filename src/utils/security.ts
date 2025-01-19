export const CSP_POLICY = {
  "default-src": ["'self'"],
  "script-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "https:"],
  "connect-src": ["'self'", import.meta.env.VITE_API_URL],
};

export const getCSPString = () => {
  return Object.entries(CSP_POLICY)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
};
