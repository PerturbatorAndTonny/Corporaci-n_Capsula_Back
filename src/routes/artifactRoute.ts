import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts, getArtifactById, deleteArtifact } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema  } from '../schemas/artifactSchema.js';
import { verifyRole, verifyToken } from '../middlewares/verifyToken.js';


const router = Router();

router.post("/artifacts", verifyToken, verifyRole("Administrador"),verifyData(createArtifactSchema), createArtifact);
router.get("/artifacts", verifyToken, getArtifacts); // Allow all authenticated users to view
router.patch("/artifacts/:id", verifyToken, verifyRole("Administrador", "Gestor de proyectos", "Usuario"), verifyData(patchArtifactSchema), patchArtifacts); // Allow users, managers, and admins to edit
router.get("/artifacts/:id", verifyToken, getArtifactById); // Allow all authenticated users to view details
router.delete("/artifacts/:id", verifyToken, verifyRole("Administrador"), deleteArtifact); // Only admins can delete
export default router;