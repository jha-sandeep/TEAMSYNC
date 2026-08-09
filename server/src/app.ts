import express from "express";
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import collaborationRoutes from "./routes/collaboration.routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/projects", projectRoutes);

app.use("/tasks", taskRoutes);

app.use("/api/collaboration", collaborationRoutes);


// MUST be last
// app.use(errorHandler);
export default app;