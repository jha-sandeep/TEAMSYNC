import { prisma } from "../db/prisma.js";
import type { CreateProjectInput } from "../validations/project.validation.js";

export async function createProject(data: CreateProjectInput, ownerId: string) {
  const project = await prisma.project.create({
    data: {
      ...data,
      ownerId,
    },
  });

  return project;
}

export async function updateProject(id: string, data: { name?: string; description?: string; }) {

  const existingProject = await prisma.project.findUnique({ where: { id } });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  const existingProject = await prisma.project.findUnique({ where: { id } });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({ where: { id } });
}

export async function getProjects(ownerId: string) {
  const projects = await prisma.project.findMany({ where: { ownerId }, orderBy: { createdAt: "desc" } })

  return projects;
}

export async function getProjectById(id: string) {

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    throw new Error("Project not found");
  }

  return project
}