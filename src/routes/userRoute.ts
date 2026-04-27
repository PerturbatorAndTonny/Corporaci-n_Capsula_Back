import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js';
import { schemaUserCreate, schemaUserUpdate } from '../schemas/userSchema.js';
import { verifyData } from '../middlewares/verifyData.js';
import { verifyRole, verifyToken } from "../middlewares/verifyToken.js"
import { incidenteMiddleware } from '../middlewares/incident.js';

const router = Router();

router.post('/user', verifyToken, verifyRole("Administrador"), verifyData(schemaUserCreate), incidenteMiddleware, createUser);
router.get('/user', verifyToken, verifyRole("Administrador"), incidenteMiddleware, getUsers);
router.get('/user/:id', verifyToken, verifyRole("Administrador"), incidenteMiddleware, getUserById);
router.patch('/user/:id', verifyToken, verifyRole("Administrador"),  verifyData(schemaUserUpdate), incidenteMiddleware, updateUserById);
router.delete('/user/:id',verifyToken, verifyRole("Administrador"), incidenteMiddleware, deleteUserById);

export default router;