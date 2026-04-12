import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js';
import { schemaUserCreate, schemaUserUpdate } from '../schemas/userSchema.js';
import { verifyData } from '../middlewares/verifyData.js';
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js"

const router = Router();

router.post('/user', verifyToken, verifyRole("Administrador"), verifyData(schemaUserCreate), createUser);
router.get('/user', verifyToken, verifyRole("Administrador"), getUsers);
router.get('/user/:id', verifyToken, verifyRole("Administrador"), getUserById);
router.patch('/user/:id', verifyToken, verifyRole("Administrador"), verifyData(schemaUserUpdate), updateUserById);
router.delete('/user/:id',verifyToken, verifyRole("Administrador"), deleteUserById);

export default router;