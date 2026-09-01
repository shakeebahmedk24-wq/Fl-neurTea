import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, CartItem, BookingRequest, BookingConfirmation } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface BookingContextType {
  isBookingModalOpen: boolean;
  openBookingModal: (initialTab?: 'book-table' | 'pre-order', preselectedItem?: MenuItem) => void;
  closeBookingModal: () => void;
  activeBookingTab: 'book-table' | 'pre-order';
  setActiveBookingTab: (tab: 'book-table' | 'pre-order') => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  lastConfirmation: BookingConfirmation | null;
  setLastConfirmation: (conf: BookingConfirmation | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeBookingTab, setActiveBookingTab] = useState<'book-table' | 'pre-order'>('book-table');
  const [cart, setCart] = useState<CartItem[]>([
    // Seed initial cart item for instant demo preview
    { menuItem: MENU_ITEMS[0], quantity: 1 },
    { menuItem: MENU_ITEMS[8], quantity: 1 },
  ]);
  const [lastConfirmation, setLastConfirmation] = useState<BookingConfirmation | null>(null);

  const openBookingModal = (initialTab: 'book-table' | 'pre-order' = 'book-table', preselectedItem?: MenuItem) => {
    setActiveBookingTab(initialTab);
    if (preselectedItem) {
      addToCart(preselectedItem, 1);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const addToCart = (item: MenuItem, quantity: number = 1, specialInstructions?: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.menuItem.id === item.id
            ? { ...c, quantity: c.quantity + quantity, specialInstructions: specialInstructions || c.specialInstructions }
            : c
        );
      }
      return [...prev, { menuItem: item, quantity, specialInstructions }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((c) => {
          if (c.menuItem.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BookingContext.Provider
      value={{
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        activeBookingTab,
        setActiveBookingTab,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        lastConfirmation,
        setLastConfirmation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
