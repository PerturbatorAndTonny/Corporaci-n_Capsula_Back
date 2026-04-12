import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js';
import { schemaUserCreate, schemaUserUpdate } from '../schemas/userSchema.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/user', verifyData(schemaUserCreate), createUser);
router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.patch('/user/:id', verifyData(schemaUserUpdate), updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;