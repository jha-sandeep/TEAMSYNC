import { prisma } from "../db/prisma.js";

type CreateProjectInput = {
  name: string;
  description?: string;
  ownerId: string;
};

export async function createProject(data: CreateProjectInput) {
  const project = await prisma.project.create({
    data,
  });

  return project;
}