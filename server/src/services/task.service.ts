import { PrismaClient, TaskPriority, TaskStatus, ProjectRole } from "@prisma/client";
import { requireProjectRole } from "./project.service.js";
const prisma = new PrismaClient();

type CreateTaskInput = {
    title: string;
    description?: string;
    priority?: TaskPriority;
    projectId: string;
    userId: string;
};
type AssignTaskInput = {
    taskId: string;
    assignedToId: string;
    userId: string;
};

export async function createTask(data: CreateTaskInput) {
    if (!data.title || !data.projectId) {
        throw new Error("title and Project Id is required");
    }
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER, ProjectRole.MAINTAINER, ProjectRole.CONTRIBUTOR]);
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            projectId: data.projectId,
        },
    });
}

export async function getTasks(userId: string, projectId: string) {
    await requireProjectRole(projectId, userId, [ProjectRole.OWNER, ProjectRole.MAINTAINER, ProjectRole.CONTRIBUTOR]);

    return prisma.task.findMany({
        where: {
            projectId,
        },
        include: {
            assignedTo: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

async function requireTaskAccess(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    await requireProjectRole(
        task.projectId,
        userId,
        [
            ProjectRole.OWNER,
            ProjectRole.MAINTAINER,
            ProjectRole.CONTRIBUTOR,
        ]
    );

    return task;
}

type UpdateTaskInput = {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
};

export async function updateTask(taskId: string, userId: string, data: UpdateTaskInput) {
    await requireTaskAccess(taskId, userId);
    return prisma.task.update({ where: { id: taskId }, data })
}


export async function deleteTask(taskId: string, userId: string) {
    await requireTaskAccess(taskId, userId);
    return prisma.task.delete({ where: { id: taskId } })
}


export async function assignTask(data: AssignTaskInput) {
    const task = await requireTaskAccess(data.taskId, data.userId);

    const member = await prisma.projectMember.findUnique({
        where: {
            projectId_userId: {
                projectId: task.projectId,
                userId: data.assignedToId,
            },
        },
    });

    if (!member) {
        throw new Error("User is not a member of this project");
    }

    return prisma.task.update({
        where: { id: data.taskId },
        data: {
            assignedTo: {
                connect: {
                    id: data.assignedToId,
                },
            },
        },
        include: {
            assignedTo: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}