import { Router } from 'express';
import { createUser } from '../controllers/controllerUser.js';
import { schemaUserCreate } from '../schemas/schemaUser.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/', verifyData(schemaUserCreate), createUser);

export default router;