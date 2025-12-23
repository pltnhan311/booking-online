import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '@/lib/localStorage';
import { Booking } from '@/data/mockData';

interface CartItem {
  movieId: string;
  theaterId: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
}

interface BookingContextType {
  cart: CartItem | null;
  bookings: Booking[];
  timeRemaining: number;
  setCart: (cart: CartItem | null) => void;
  addSeat: (seatId: string) => void;
  removeSeat: (seatId: string) => void;
  clearCart: () => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  refreshBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const SEAT_HOLD_TIME = 5 * 60; // 5 minutes in seconds

export function BookingProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartItem | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(SEAT_HOLD_TIME);
  const [timerStart, setTimerStart] = useState<number | null>(null);

  // Load bookings from localStorage
  useEffect(() => {
    const storedBookings = storage.get<Booking[]>(STORAGE_KEYS.BOOKINGS) || [];
    setBookings(storedBookings);
  }, []);

  // Timer for seat holding
  useEffect(() => {
    if (!cart || !timerStart) {
      setTimeRemaining(SEAT_HOLD_TIME);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - timerStart) / 1000);
      const remaining = Math.max(0, SEAT_HOLD_TIME - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        // Clear cart when time runs out
        clearCart();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cart, timerStart]);

  const setCart = useCallback((newCart: CartItem | null) => {
    setCartState(newCart);
    if (newCart && newCart.seats.length > 0) {
      setTimerStart(Date.now());
    } else {
      setTimerStart(null);
    }
    storage.set(STORAGE_KEYS.CART, newCart);
  }, []);

  const addSeat = useCallback((seatId: string) => {
    setCartState(prev => {
      if (!prev) return prev;
      if (prev.seats.includes(seatId)) return prev;
      if (prev.seats.length >= 8) return prev;
      
      const newCart = { ...prev, seats: [...prev.seats, seatId] };
      storage.set(STORAGE_KEYS.CART, newCart);
      return newCart;
    });
  }, []);

  const removeSeat = useCallback((seatId: string) => {
    setCartState(prev => {
      if (!prev) return prev;
      const newCart = { ...prev, seats: prev.seats.filter(s => s !== seatId) };
      storage.set(STORAGE_KEYS.CART, newCart);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartState(null);
    setTimerStart(null);
    storage.remove(STORAGE_KEYS.CART);
  }, []);

  const addBooking = useCallback((booking: Booking) => {
    setBookings(prev => {
      const updated = [booking, ...prev];
      storage.set(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
  }, []);

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings(prev => {
      const updated = prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      storage.set(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
  }, []);

  const refreshBookings = useCallback(() => {
    const storedBookings = storage.get<Booking[]>(STORAGE_KEYS.BOOKINGS) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <BookingContext.Provider value={{
      cart,
      bookings,
      timeRemaining,
      setCart,
      addSeat,
      removeSeat,
      clearCart,
      addBooking,
      cancelBooking,
      refreshBookings,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
