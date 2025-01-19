export const secureStorage = {
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      const encodedValue = btoa(serializedValue); // Basic encoding
      localStorage.setItem(key, encodedValue);
    } catch (error) {
      console.error("Error storing data");
      throw new Error("Failed to store data securely");
    }
  },

  get(key: string): any {
    try {
      const encodedValue = localStorage.getItem(key);
      if (!encodedValue) return null;
      const serializedValue = atob(encodedValue); // Basic decoding
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error("Error retrieving data");
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
