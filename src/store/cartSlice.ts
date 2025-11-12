import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('fluxoStore_cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0, itemCount: 0 };
  }
  return { items: [], total: 0, itemCount: 0 };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const { id, name, price, image } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price, image, quantity: 1 });
      }
      
      state.itemCount += 1;
      state.total = parseFloat((state.total + price).toFixed(2));
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('fluxoStore_cart', JSON.stringify(state));
      }
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.itemCount -= 1;
          state.total = parseFloat((state.total - existingItem.price).toFixed(2));
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
          state.itemCount -= 1;
          state.total = parseFloat((state.total - existingItem.price).toFixed(2));
        }
        
        // Salvar no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('fluxoStore_cart', JSON.stringify(state));
        }
      }
    },
    
    removeAllFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        state.itemCount -= existingItem.quantity;
        state.total = parseFloat((state.total - (existingItem.price * existingItem.quantity)).toFixed(2));
        state.items = state.items.filter(item => item.id !== itemId);
        
        // Salvar no localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('fluxoStore_cart', JSON.stringify(state));
        }
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      
      // Limpar localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fluxoStore_cart');
      }
    },
    
    // Ação para carregar o carrinho do localStorage
    loadCart: (state) => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('fluxoStore_cart');
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      }
      return state;
    }
  },
});

export const { addToCart, removeFromCart, removeAllFromCart, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
