import { Router } from "express";
import { createProjectHandler,updateProjectHandler,deleteProjectHandler,getProjectsHandler,getProjectByIdHandler } from "../controller/project.controller.js";
import { validate } from "../middlewares/validate.js";
import { createProjectSchema } from "../validations/project.validation.js";

const router = Router();
router.get("/", getProjectsHandler);

router.get("/:id", getProjectByIdHandler);

router.post("/", validate(createProjectSchema), createProjectHandler);

router.put("/:id", updateProjectHandler);

router.delete("/:id", deleteProjectHandler);

export default router;