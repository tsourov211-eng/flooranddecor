'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  priceNumber: number;
  unit?: string;
  size?: string;
  image?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode: string;
  promoApplied: boolean;
  promoError: string | null;
  deliveryMethod: 'pickup' | 'freight';
  setDeliveryMethod: (method: 'pickup' | 'freight') => void;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, qty: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const defaultItems: CartItem[] = [
  {
    id: 1,
    name: 'Carrara White Polished Marble Tile 12x24 in.',
    price: '$1.19',
    priceNumber: 1.19,
    unit: 'sq. ft.',
    size: '12 x 24',
    image: 'https://images.pexels.com/photos/7587862/pexels-photo-7587862.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 20,
  },
  {
    id: 2,
    name: 'Villa Artisan Blanc Glazed Subway Ceramic Tile',
    price: '$2.19',
    priceNumber: 2.19,
    unit: 'sq. ft.',
    size: '3 x 12',
    image: 'https://images.pexels.com/photos/6394530/pexels-photo-6394530.jpeg?auto=compress&cs=tinysrgb&w=400',
    quantity: 12,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(defaultItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'freight'>('pickup');
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fnd_cart_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('fnd_cart_state', JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, hydrated]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = newItem.quantity && newItem.quantity > 0 ? newItem.quantity : 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + qtyToAdd } : i
        );
      } else {
        return [
          ...prev,
          {
            ...newItem,
            quantity: qtyToAdd,
            priceNumber:
              typeof newItem.priceNumber === 'number'
                ? newItem.priceNumber
                : parseFloat(String(newItem.price).replace(/[^0-9.]/g, '')) || 0,
          },
        ];
      }
    });
    showToast(`Added "${newItem.name}" (${qtyToAdd}) to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string | number) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        showToast(`Removed "${target.name}" from cart.`);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id: string | number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    showToast('Your shopping cart has been cleared.');
  };

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SAVE15' || clean === 'WELCOME15' || clean === 'NEW15') {
      setPromoCode(clean);
      setPromoApplied(true);
      setPromoError(null);
      showToast('Promo code applied: 15% Off Your Order!');
      return true;
    } else if (clean === 'FREESHIP') {
      setPromoCode(clean);
      setPromoApplied(true);
      setPromoError(null);
      showToast('Promo code applied: Free Freight Shipping!');
      return true;
    } else {
      setPromoError('Invalid promo code. Try "SAVE15" for 15% off.');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoError(null);
    showToast('Promo code removed.');
  };

  // Calculations
  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce(
    (acc, curr) => acc + curr.priceNumber * curr.quantity,
    0
  );

  let discount = 0;
  if (promoApplied) {
    if (promoCode === 'SAVE15' || promoCode === 'WELCOME15' || promoCode === 'NEW15') {
      discount = subtotal * 0.15;
    }
  }

  let deliveryFee = 0;
  if (deliveryMethod === 'freight') {
    deliveryFee = promoCode === 'FREESHIP' ? 0 : 49;
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.075; // 7.5% sales tax
  const total = taxableAmount + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        promoCode,
        promoApplied,
        promoError,
        deliveryMethod,
        setDeliveryMethod,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
