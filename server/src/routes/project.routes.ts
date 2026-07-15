import { Router } from "express";
import { createProjectHandler } from "../controller/project.controller.js";

const router = Router();

router.post("/", createProjectHandler);

export default router;