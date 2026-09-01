import { create } from 'zustand';
import { PRODUCTS } from '../data/catalog';

type CartLine = { productId: string; quantity: number };

type CartState = {
  lines: Record<string, CartLine>;
  lastAddedId: string | null;
  add: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clearLastAdded: () => void;
  clearCart: () => void;
  quantityOf: (productId: string) => number;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  lines: {},
  lastAddedId: null,
  add: (productId) =>
    set((s) => ({
      lastAddedId: productId,
      lines: {
        ...s.lines,
        [productId]: { productId, quantity: (s.lines[productId]?.quantity ?? 0) + 1 },
      },
    })),
  increment: (productId) => get().add(productId),
  decrement: (productId) =>
    set((s) => {
      const current = s.lines[productId]?.quantity ?? 0;
      if (current <= 1) {
        const next = { ...s.lines };
        delete next[productId];
        return { lines: next };
      }
      return {
        lines: { ...s.lines, [productId]: { productId, quantity: current - 1 } },
      };
    }),
  clearLastAdded: () => set({ lastAddedId: null }),
  clearCart: () => set({ lines: {}, lastAddedId: null }),
  quantityOf: (productId) => get().lines[productId]?.quantity ?? 0,
  itemCount: () => Object.values(get().lines).reduce((n, l) => n + l.quantity, 0),
  subtotal: () =>
    Object.values(get().lines).reduce((sum, l) => {
      const product = PRODUCTS.find((p) => p.id === l.productId);
      return sum + (product?.price ?? 0) * l.quantity;
    }, 0),
}));
