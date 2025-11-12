import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const CART_STORAGE_KEY = 'fluxoStore_cart';

const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0, itemCount: 0 };
  }
  return { items: [], total: 0, itemCount: 0 };
};

const saveCartToLocalStorage = (cart: CartState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }

      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      saveCartToLocalStorage(state);
    },

    removeAllFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      saveCartToLocalStorage(state);
    },

    updateCart: (state, action: PayloadAction<{id: number; quantity: number}>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        state.total = calculateTotal(state.items);
        state.itemCount = calculateItemCount(state.items);
        saveCartToLocalStorage(state);
      }
    },
    
    loadCart: (state) => {
      const savedCart = loadCartFromLocalStorage();
      state.items = savedCart.items;
      state.total = savedCart.total;
      state.itemCount = savedCart.itemCount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
  updateCart,
  loadCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.itemCount;

export default cartSlice.reducer;
