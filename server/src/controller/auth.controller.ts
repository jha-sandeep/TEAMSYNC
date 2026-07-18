import type { Request, Response } from "express";
import { register, login, getCurrentUser } from "../services/auth.service.js";

export async function registerHandler(req: Request, res: Response) {
  try {
    const user = await register(req.body);

    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const result = await login(req.body);

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


export async function getCurrentUserHandler(req: Request, res: Response) {
  try {
    const user = await getCurrentUser(req.user.userId);

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}