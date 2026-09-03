import api from "./api";

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export async function registerUser(data: RegisterInput) {
    const response = await api.post("/auth/register", data);
    return response.data;
}