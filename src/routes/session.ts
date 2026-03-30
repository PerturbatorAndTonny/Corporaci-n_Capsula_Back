import { Router } from "express";
import { newSession } from "../controllers/session.js";

const router: Router = Router();

router.post("/auth/login", newSession);

export default router;