import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts, getArtifactById, deleteArtifact } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema  } from '../schemas/artifactSchema.js';
// import { verifyRole, verifyToken } from '../middlewares/verifyToken.js';


const router = Router();

router.post("/artifacts", verifyData(createArtifactSchema), createArtifact);
router.get("/artifacts", getArtifacts);
router.patch("/artifacts/:id", verifyData(patchArtifactSchema), patchArtifacts);
router.get("/artifacts/:id", getArtifactById);
router.delete("/artifacts/:id", deleteArtifact);
export default router;