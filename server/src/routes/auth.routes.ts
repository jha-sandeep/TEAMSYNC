import { Router } from "express";
import { registerHandler,loginHandler,getCurrentUserHandler, } from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/me", authenticate, getCurrentUserHandler);

export default router;