import type { Request, Response } from "express";
import { createProject } from "../services/project.service.js";

export async function createProjectHandler(
  req: Request,
  res: Response,
) {
  const { name, description } = req.body;

  // Temporary ownerId until authentication is implemented
  const ownerId = 'cmrksbqx20000tzwcvdb48xf6';

  const project = await createProject({
    name,
    description,
    ownerId,
  });

  res.status(201).json({
    success: true,
    data: project,
  });
}