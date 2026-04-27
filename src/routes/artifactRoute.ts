import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts, getArtifactById, deleteArtifact } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema  } from '../schemas/artifactSchema.js';
import { verifyRole, verifyToken } from '../middlewares/verifyToken.js';
import { incidenteMiddleware } from '../middlewares/incident.js';


const router = Router();

router.post("/artifacts", verifyToken, verifyRole("Administrador"),verifyData(createArtifactSchema), incidenteMiddleware, createArtifact);
router.get("/artifacts", verifyToken, incidenteMiddleware, getArtifacts);
router.patch("/artifacts/:id", verifyToken, verifyRole("Administrador", "Gestor de proyectos", "Usuario"), verifyData(patchArtifactSchema), incidenteMiddleware, patchArtifacts);
router.get("/artifacts/:id", verifyToken, incidenteMiddleware, getArtifactById); 
router.delete("/artifacts/:id", verifyToken, verifyRole("Administrador"), incidenteMiddleware, deleteArtifact);
export default router;
