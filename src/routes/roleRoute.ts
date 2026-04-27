import { Router } from "express"
import { getUsersByRol, updateUserRole } from "../controllers/roleController.js";
import { verifyData } from '../middlewares/verifyData.js'
import { rolSchema } from '../schemas/roleSchema.js'
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js"
import { incidenteMiddleware } from "../middlewares/incident.js";

const router: Router = Router();

router.patch("/users/:id/role", verifyToken, verifyRole("Administrador"), verifyData(rolSchema), incidenteMiddleware, updateUserRole)

export default router; 