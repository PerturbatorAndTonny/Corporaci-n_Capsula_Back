import { Router } from "express"
import { getUsersByRol, updateUserRole } from "../controllers/roleController.js";
import { verifyData } from '../middlewares/verifyData.js'
import { rolSchema } from '../schemas/roleSchema.js'
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js"

const router: Router = Router();

router.get("/users/roles", verifyToken, verifyRole("Administrador"), getUsersByRol)
router.patch("/users/:id/role", verifyToken, verifyRole("Administrador"), verifyData(rolSchema), updateUserRole);

export default router; 