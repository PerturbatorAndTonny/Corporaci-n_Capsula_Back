import { Router } from 'express';
import { createArtifact, deactivateArtifact, getArtifacts, patchArtifacts } from '../controllers/artifacts.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema  } from '../schemas/artifacts.js';
import { verifyRole, verifyToken } from '../middlewares/verifyToken.js';


const router = Router();

router.post("/artifacts", verifyData(createArtifactSchema), createArtifact);
router.get("/artifacts", getArtifacts);
router.patch("/artifacts/:id", verifyData(patchArtifactSchema), patchArtifacts);
router.patch(":id/deactivate", verifyToken, verifyRole("Administrador"), deactivateArtifact);
export default router;