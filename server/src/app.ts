import express from "express";
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/projects", projectRoutes);

export default app;