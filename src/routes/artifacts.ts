import { Router } from 'express';
import { createArtifact, getArtifacts, patchArtifacts } from '../controllers/artifacts.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema } from '../schemas/artifacts.js';
import { patchArtifactSchema } from '../schemas/patchArtifactSchema.js';

const router = Router();

router.post("/artifacts",verifyData(createArtifactSchema),createArtifact);
router.get("/artifacts", getArtifacts);
router.patch("/artifacts/:id", verifyData(patchArtifactSchema), patchArtifacts);

export default router;