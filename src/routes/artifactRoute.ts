import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts, getArtifactById, deleteArtifact } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema  } from '../schemas/artifactSchema.js';
import { verifyRole, verifyToken } from '../middlewares/verifyToken.js';


const router = Router();

router.post("/artifacts", verifyToken, verifyRole("Administrador"),verifyData(createArtifactSchema), createArtifact);
router.get("/artifacts", verifyToken, verifyRole("Administrador"), getArtifacts);
router.patch("/artifacts/:id", verifyToken, verifyRole("Administrador"), verifyData(patchArtifactSchema), patchArtifacts);
router.get("/artifacts/:id", verifyToken, verifyRole("Administrador"), getArtifactById);
router.delete("/artifacts/:id", verifyToken, verifyRole("Administrador"), deleteArtifact);
export default router;