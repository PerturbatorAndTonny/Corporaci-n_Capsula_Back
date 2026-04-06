import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController.js';
import { schemaUserCreate } from '../schemas/schemaUser.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/user', verifyData(schemaUserCreate), createUser);
router.get('/user', getUsers);

export default router;