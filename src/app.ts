import express from "express";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";

import routeOne from "../src/routes/routeOne.js";
import artifactRoutes from "./routes/artifacts.js";
import authRoute from "./routes/session.js"
import roleRoute from "./routes/role.js"

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", routeOne)
app.use('/api/v1', artifactRoutes);
app.use("/api/v1", authRoute)
app.use("/api/v1/", roleRoute)


app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;