import { Router } from 'express';
import { createUser, getUsers } from '../controllers/controllerUser.js';
import { schemaUserCreate } from '../schemas/schemaUser.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/', verifyData(schemaUserCreate), createUser);
router.get('/', getUsers);

export default router;