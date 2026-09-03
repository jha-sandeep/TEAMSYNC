import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { rtkApi } from "../api/rtkApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rtkApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;