import { Router } from "express";
import { newSession, closeSession } from "../controllers/sessionController.js";
import { verifyData } from "../middlewares/verifyData.js"
import { authSchema } from "../schemas/authSchema.js";
import { verifyToken, verifyRole } from "../middlewares/verifyToken.js"

const router: Router = Router();

router.post("/auth/login", verifyData(authSchema), newSession);
router.delete("/auth/logout", verifyToken, verifyRole(
  "Administrador",
  "Directora de Innovacion",
  "Experto en tecnologia extraterrestre",
  "Especialista en seguridad",
  "Inventor/Tester", "Gestor de proyectos",
  "Usuario"
), closeSession);

export default router;