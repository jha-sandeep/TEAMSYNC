import { prisma } from "../db/prisma.js";
import { Prisma, ProjectStatus, ProjectRole } from "@prisma/client";

export async function createProject(data: { name: string; description: string }, userId: string) {
  if (!data.name || !data.description) {
    throw new Error("Name, description are required");
  }
  return await prisma.$transaction(async (tx) => {

    const project = await tx.project.create({
      data: {
        ...data,
      },
    });

    await tx.projectMember.create({
      data: {
        projectId: project.id,
        userId,
        role: ProjectRole.OWNER,
      },
    });

    return project;
  });
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

export async function getProjects(userId: string, page: number, limit: number, search: string, status?: ProjectStatus) {
  const skip = (page - 1) * limit;
  const where: Prisma.ProjectWhereInput = {
    members: {
      some: {
        userId,
      },
    },
  };
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }
  if (status) {
    where.status = status;
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.project.count({ where })
  ]);

  return { projects, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProjectById(id: string) {

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    throw new Error("Project not found");
  }

  return project
}

export async function requireProjectRole(projectId: string, userId: string, allowedRoles: ProjectRole[]) {
  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
    include: {
      project: true,
    },
  });

  if (!membership) {
    throw new Error("Project not found or access denied");
  }

  if (!allowedRoles.includes(membership.role)) {
    throw new Error("You do not have permission to perform this action");
  }

  return membership.project;
}