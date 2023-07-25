import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/cart/cartSlice';
import bookSlice from './Features/Books/BooksSlice';
import { api } from './api/apiSlice';
import userReducer from './Features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

const persistConfiq = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfiq, reducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: bookSlice,
    reducer: persistedReducer,
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
