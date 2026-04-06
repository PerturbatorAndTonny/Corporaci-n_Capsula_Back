import { Router } from "express";
import { newSession } from "../controllers/sessionController.js";
import { verifyData } from "../middlewares/verifyData.js"
import { authSchema } from "../schemas/authSchema.js";

const router: Router = Router();

router.post("/auth/login", verifyData(authSchema), newSession);

export default router;