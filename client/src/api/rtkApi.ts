import { createApi } from "@reduxjs/toolkit/query/react";
import api from "./api";

const axiosBaseQuery = () => async ({ url, method, data, params }: { url: string; method: string; data?: unknown; params?: Record<string, unknown>; }) => {
    try {
        const result = await api({ url, method, data, params })
        return {
            data: result.data,
        };
    } catch (error: any) {
        return {
            error: {
                status: error.response?.status,
                data: error.response?.data || error.message,
            },
        };
    }
};

export const rtkApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
});