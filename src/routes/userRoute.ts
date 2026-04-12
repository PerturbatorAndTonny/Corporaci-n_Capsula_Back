import { Router } from 'express';
import { createUser, getUsers, getUserByName, updateUserByName, deleteUserByName } from '../controllers/userController.js';
import { schemaUserCreate, schemaUserUpdate } from '../schemas/userSchema.js';
import { verifyData } from '../middlewares/verifyData.js';

const router = Router();

router.post('/user', verifyData(schemaUserCreate), createUser);
router.get('/user', getUsers);
router.get('/user/:nombre', getUserByName);
router.put('/user/:nombre', verifyData(schemaUserUpdate), updateUserByName);
router.delete('/user/:nombre', deleteUserByName);

export default router;