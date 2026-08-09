import { Router } from "express";
import { createProjectHandler,updateProjectHandler,deleteProjectHandler,getProjectsHandler,getProjectByIdHandler } from "../controller/project.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", getProjectsHandler);

router.get("/:id", getProjectByIdHandler);

router.post("/", createProjectHandler);

router.put("/:id", updateProjectHandler);

router.delete("/:id", deleteProjectHandler);

export default router;