import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User }>
        ) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
        },

        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const { setCredentials, setAuthLoading, logout } = authSlice.actions;

export default authSlice.reducer;