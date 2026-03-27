import express from "express";
import morgan from "morgan";

import routeOne from "./routes/routeOne.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", routeOne)


app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;