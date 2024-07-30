// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialProductsState = [];
const initialCartState = [];

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const findProduct = state.find((p) => p.id === action.payload.id);
      if (findProduct) {
        findProduct.quantity += action.payload.quantity;
      } else {
        const productClone = { ...action.payload };
        state.push(productClone);
      }
    },
    removeFromCart: (state, action) => state.filter(product => product.id !== action.payload),
    clearCart: (state) => {
      return [];
    }
  },
});

// Combine reducers
const rootReducer = {
  products: productsSlice.reducer,
  cart: cartSlice.reducer,
};

// Configure store
const store = configureStore({
  reducer: rootReducer,
});

export const { setProducts } = productsSlice.actions;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default store;