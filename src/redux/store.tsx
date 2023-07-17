import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/cart/cartSlice';
import productSlice from './Features/Products/ProductsSlice';
import { api } from './api/apiSlice';
import userReducer from './Features/user/userSlice';
// import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productSlice,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  //   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
