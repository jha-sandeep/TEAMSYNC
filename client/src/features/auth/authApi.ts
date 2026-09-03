import { rtkApi } from "../../api/rtkApi";

interface RegisterPayload {
    name: string,
    email: string,
    password: string
}

interface RegisterResponse {
    success: boolean,
    data: {
        id: string,
        name: string,
        email: string,
        role: string,
        createdAt: string
    }
}

interface LoginPayload {
    email: string,
    password: string
}

interface LoginResponse {
    success: boolean
}

interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface CurrentUserResponse {
    success: boolean;
    data: CurrentUser;
}

interface LogoutResponse {
    success: boolean;
    message: string;
}

export const authApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterPayload>({
            query: (payload) => ({
                url: "/auth/register",
                method: "POST",
                data: payload,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                data: payload,
            }),
        }),
        getCurrentUser: builder.query<CurrentUserResponse, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery, useLogoutMutation } = authApi;