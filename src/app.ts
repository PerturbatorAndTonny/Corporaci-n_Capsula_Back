import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import routeOne from "../src/routes/routeOne.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", routeOne)
app.use("/users", userRoutes)


app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;