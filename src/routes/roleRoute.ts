import { Router } from "express"
import { updateUserRole } from "../controllers/roleController.js";
import { verifyData } from '../middlewares/verifyData.js'
import { rolSchema } from '../schemas/role.js'
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js"

const router: Router = Router();

router.patch("/users/:id/role", verifyToken, verifyRole("Administrador"), verifyData(rolSchema), updateUserRole)

export default router; 