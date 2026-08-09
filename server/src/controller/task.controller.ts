import { Request, Response } from "express";
import { createTask, getTasks, updateTask, deleteTask, assignTask } from "../services/task.service.js";

export async function createTaskHandler(req: Request, res: Response) {
    try {
        const task = await createTask({ ...req.body, userId: req.user.userId });

        return res.status(201).json({ success: true, data: task });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTasksHandler(req: Request, res: Response) {
    try {
        const projectId = String(req.query.projectId || "");

        const tasks = await getTasks(req.user.userId, projectId);

        return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function updateTaskHandler(req: Request, res: Response) {
    try {
        const taskId = String(req.params.taskId);
        const task = await updateTask(
            taskId,
            req.user.userId,
            req.body
        );

        return res.status(200).json({ success: true, data: task });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export async function deleteTaskHandler(req: Request, res: Response) {
    try {
        const taskId = String(req.params.taskId);

        await deleteTask(taskId, req.user.userId);

        return res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export async function assignTaskHandler(req: Request, res: Response) {
    try {
        const taskId = String(req.params.taskId);

        const task = await assignTask({
            taskId,
            assignedToId: req.body.assignedToId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: task,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}