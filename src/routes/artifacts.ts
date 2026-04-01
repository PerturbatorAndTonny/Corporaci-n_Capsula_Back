import { Router } from 'express';
import { createArtifact } from '../controllers/artifacts.js';
import { verifyData } from '../middlewares/verifyData.js';
import { createArtifactSchema } from '../schemas/artifacts.js';

const router = Router();

router.post("/artifacts",verifyData(createArtifactSchema),createArtifact);

export default router;