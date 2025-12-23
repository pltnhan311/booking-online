// VietCinema localStorage helpers

export const STORAGE_KEYS = {
  USER: 'vietcinema_user',
  TOKEN: 'vietcinema_token',
  BOOKINGS: 'vietcinema_bookings',
  MOVIES_CUSTOM: 'vietcinema_movies_custom',
  SHOWTIMES_CUSTOM: 'vietcinema_showtimes_custom',
  CART: 'vietcinema_cart',
} as const;

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};
