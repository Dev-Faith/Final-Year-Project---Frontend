import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './authSlice';
import { wakatechApi } from './apiSlice';
import bleReducer from './bleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ble: bleReducer,
    [wakatechApi.reducerPath]: wakatechApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wakatechApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);