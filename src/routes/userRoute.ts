import { Router } from 'express';
import { createUser, getUsers, getUserByName, updateUserByName, deleteUserByName } from '../controllers/userController.js';
import { schemaUserCreate, schemaUserUpdate } from '../schemas/userSchema.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/user', verifyData(schemaUserCreate), createUser);
router.get('/user', getUsers);
router.get('/user/:id', getUserByName);
router.patch('/user/:id', verifyData(schemaUserUpdate), updateUserByName);
router.delete('/user/:id', deleteUserByName);

export default router;