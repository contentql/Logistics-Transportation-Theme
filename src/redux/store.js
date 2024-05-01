import { combineReducers, configureStore } from "@reduxjs/toolkit";

import searchSlice from "./features/search-slice";
import wishlistSlice from "./features/wishlist-slice";
import cartSlice from "./features/cart-slice";
import productSlice from "./features/product-slice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve();
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["products"],
};

const rootReducer = combineReducers({
  products: productSlice,
  search: searchSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
