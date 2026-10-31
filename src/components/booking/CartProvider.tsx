"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AddonDef } from "@/lib/booking/addons";

export type CartAddon = { id: string; label: string; price: number };

export type CartItem = {
  /** Client-generated id, used as the React key and for removal — distinct
   *  from any server-side booking id, which doesn't exist until checkout. */
  cartId: string;
  yachtSlug: string;
  yachtName: string;
  bookingDate: string; // YYYY-MM-DD
  slotId: string;
  slotLabel: string;
  basePrice: number;
  slotPrice: number;
  addons: CartAddon[];
  comment: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId" | "addons" | "comment">) => void;
  removeItem: (cartId: string) => void;
  setAddons: (cartId: string, addons: AddonDef[]) => void;
  setComment: (cartId: string, comment: string) => void;
  clear: () => void;
  itemTotal: (item: CartItem) => number;
  grandTotal: number;
  depositTotal: number;
  balanceTotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sd_cart";
const DEPOSIT_RATE = 0.5;

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing / storage disabled — the cart just won't persist
      // across reloads, which is fine as a fallback.
    }
  }, [items, loaded]);

  const itemTotal = (item: CartItem) =>
    item.slotPrice + item.addons.reduce((sum, a) => sum + a.price, 0);

  const grandTotal = useMemo(() => items.reduce((sum, i) => sum + itemTotal(i), 0), [items]);
  const depositTotal = Math.round(grandTotal * DEPOSIT_RATE);
  const balanceTotal = grandTotal - depositTotal;

  const value: CartContextValue = {
    items,
    addItem: (item) =>
      setItems((prev) => [
        ...prev,
        { ...item, cartId: crypto.randomUUID(), addons: [], comment: "" },
      ]),
    removeItem: (cartId) => setItems((prev) => prev.filter((i) => i.cartId !== cartId)),
    setAddons: (cartId, addons) =>
      setItems((prev) =>
        prev.map((i) => (i.cartId === cartId ? { ...i, addons: addons.map((a) => ({ id: a.id, label: a.label, price: a.price })) } : i))
      ),
    setComment: (cartId, comment) =>
      setItems((prev) => prev.map((i) => (i.cartId === cartId ? { ...i, comment } : i))),
    clear: () => setItems([]),
    itemTotal,
    grandTotal,
    depositTotal,
    balanceTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
