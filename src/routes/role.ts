import { Router } from "express"
import { updateUserRole } from "../controllers/role.js";

const router: Router = Router();

router.patch("/users/:id/role", updateUserRole)

export default router; 