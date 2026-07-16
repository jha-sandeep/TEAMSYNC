import type { Request, Response } from "express";
import { createProject, updateProject, deleteProject, getProjects,getProjectById } from "../services/project.service.js";

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

  }, ownerId,);

  res.status(201).json({
    success: true,
    data: project,
  });
}


type UpdateProjectParams = {
  id: string;
};

export async function updateProjectHandler(
  req: Request<UpdateProjectParams>,
  res: Response
) {
  try {
    const project = await updateProject(req.params.id, req.body);
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteProjectHandler(
  req: Request<UpdateProjectParams>,
  res: Response
) {
  try {
    const project = await deleteProject(req.params.id);
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getProjectsHandler(
  req: Request,
  res: Response
) {
  try {
    const project = await getProjects();
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getProjectByIdHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const project = await getProjectById(req.params.id);
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}