import { Router } from 'express';
import { createUser, getUsers } from '../controllers/controllerUser.js';
import { schemaUserCreate } from '../schemas/schemaUser.js';
import { verifyData } from '../middlewares/verifyData.js';
import { deactivateArtifact } from '../controllers/artifacts.js';
const router = Router();

router.post('/user', verifyData(schemaUserCreate), createUser);
router.get('/user', getUsers);
router.patch('/:id/deactivate', deactivateArtifact);
export default router;