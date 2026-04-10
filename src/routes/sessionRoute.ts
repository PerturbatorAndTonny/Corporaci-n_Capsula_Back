import { Router } from "express";
import { newSession, closeSession } from "../controllers/sessionController.js";
import { verifyData } from "../middlewares/verifyData.js"
import { verifyToken } from '../middlewares/verifyToken.js'
import { authSchema } from "../schemas/authSchema.js";

const router: Router = Router();

router.post("/auth/login", verifyData(authSchema), newSession);
router.delete("/auth/logout", verifyToken, closeSession);

export default router;