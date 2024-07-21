const isClient = typeof window !== "undefined";

export const getItem = (key: string): string | null => {
  if (isClient) {
    return localStorage.getItem(key);
  }
  return null;
};

export const setItem = (key: string, value: string): void => {
  if (isClient) {
    localStorage.setItem(key, value);
  }
};

export const removeItem = (key: string): void => {
  if (isClient) {
    localStorage.removeItem(key);
  }
};

export const clear = (): void => {
  if (isClient) {
    localStorage.clear();
  }
};
