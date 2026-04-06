import { Router } from 'express';
import { createArtifact, getArtifacts } from '../controllers/artifactController.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema } from '../schemas/artifacts.js';

const router = Router();

router.post("/artifacts",verifyData(createArtifactSchema),createArtifact);
router.get("/artifacts", getArtifacts);

export default router;