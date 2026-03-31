import { Router } from 'express';
import { createUser } from '../controllers/controllerUser';
import { createUserSchema } from '../schemas/schemaUser';
import { validateSchema } from '../middlewares/verifyData';

const router = Router();

router.post('/', validateSchema(createUserSchema), createUser);

export default router;