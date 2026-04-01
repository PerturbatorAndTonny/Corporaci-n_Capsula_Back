import { Router } from "express"
import { updateUserRole } from "../controllers/role.js";
import { verifyData } from '../middlewares/verifyData.js'
import { rolSchema } from '../schemas/role.js'

const router: Router = Router();

router.patch("/users/:id/role", verifyData(rolSchema), updateUserRole)

export default router; 