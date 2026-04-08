import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema, patchArtifactSchema } from '../schemas/artifactSchema.js';


const router = Router();

router.post("/artifacts", verifyData(createArtifactSchema), createArtifact);
router.get("/artifacts", getArtifacts);
router.patch("/artifacts/:id", verifyData(patchArtifactSchema), patchArtifacts);

export default router;