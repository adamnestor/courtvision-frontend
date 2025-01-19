export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};
