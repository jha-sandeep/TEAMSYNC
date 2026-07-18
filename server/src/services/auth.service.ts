import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";
import jwt from "jsonwebtoken"

type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export async function register(data: RegisterInput) {
    if (!data.name || !data.email || !data.password) {
        throw new Error("Name, email and password are required");
    }
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}


type LoginInput = {
    email: string;
    password: string;
};

export async function login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id, role: user.role, }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return { token };
}

export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}