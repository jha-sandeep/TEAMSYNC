import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@prisma/client";

type JwtPayload = {
  userId: string;
  role: Role;
};

export async function authenticate(req: Request,res: Response,next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payload = jwt.verify(token,process.env.JWT_SECRET!)as JwtPayload;

    req.user = payload;

    next();
  } catch {
    return res.status(401).json({success: false,message: "Invalid or expired token"});
  }
}