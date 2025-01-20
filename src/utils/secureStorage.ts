export const secureStorage = {
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch {
      console.error(`Failed to store item with key: ${key}`);
    }
  },

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      console.error(`Failed to retrieve item with key: ${key}`);
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
