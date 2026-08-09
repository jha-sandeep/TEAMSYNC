import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createTaskHandler,getTasksHandler,updateTaskHandler,deleteTaskHandler,assignTaskHandler } from "../controller/task.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", createTaskHandler);

router.get("/", getTasksHandler);

router.patch("/:taskId", updateTaskHandler);

router.delete("/:taskId", deleteTaskHandler);

router.patch("/:taskId/assign",assignTaskHandler);

export default router;