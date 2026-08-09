import type { Request, Response } from "express";
import { createProject, updateProject, deleteProject, getProjects, getProjectById } from "../services/project.service.js";
import { ProjectStatus } from "@prisma/client";

type createProjectInput = {
  name: string;
  description: string;
};


export async function createProjectHandler(
  req: Request<createProjectInput>,
  res: Response,
) {

  const userId = req.user.userId;

  const project = await createProject(req.body, userId,);

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");
    const status = req.query.status as ProjectStatus || undefined;

    const project = await getProjects(req.user.userId, page, limit,search,status);
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