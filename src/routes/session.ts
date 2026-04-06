import { Router } from "express";
import { newSession } from "../controllers/session.js";
import { verifyData } from "../middlewares/verifyData.js"
import { authSchema } from "../schemas/auth.js";

const router: Router = Router();

router.post("/auth/login", verifyData(authSchema), newSession);

export default router;