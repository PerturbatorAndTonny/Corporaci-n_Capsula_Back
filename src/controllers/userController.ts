// oxlint-disable typescript/ban-types
// oxlint-disable no-unused-vars
import { Request, Response } from 'express';
import { UserCreate, UserUpdate } from '../schemas/userSchema.js';
import * as userModel from '../models/userModel.js';
import { hashPass } from '../utils/pass.js';

const generateADN = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const generateBiometria = () => Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('');

// Se añade { authType?: string } al tipado estricto para evitar usar "any"
export const createUser = async (req: Request<{}, {}, UserCreate & { authType?: string }>, res: Response) => {
    try {
        // 1. Extraemos los datos enviados por el frontend, incluyendo el nuevo authType
        const { nombre, edad, contraseña, rol, authType } = req.body;

        // 2. VALIDACIÓN DE NOMBRE ÚNICO (Regla de negocio)
        const existingUser = await userModel.getUserByName(nombre);
        
        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: "Conflicto: Ya existe un usuario registrado con este nombre."
            });
        }

        // 3. IDENTIFICACIÓN AUTOMÁTICA DE ESPECIE
        // Usamos un operador ternario para asignar la especie
        const especieAsignada = authType === 'DNA_SAIYAN' ? 'Saiyajin' : 'Humano';

        // Mantenemos la generación de biometría que ya tenías
        const biometria = generateBiometria();

        // 4. CREACIÓN DEL USUARIO
        const newUser = await userModel.createUser({
            nombre,
            edad,
            ADN: especieAsignada, // Aquí guardamos "Humano" o "Saiyajin"
            contraseña: await hashPass(contraseña),
            biometria
        }, rol || 7);

        return res.status(201).json({
            status: 201,
            message: "Usuario creado exitosamente",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al crear el usuario"
        });
    }
};
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getUsers();
        return res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al obtener los usuarios"
        });
    }
};

export const getUserById= async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userModel.getUserById(Number(id));
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).json({
            status: 200,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al obtener el usuario"
        });
    }
};

export const updateUserById = async (req: Request<{ id: string }, {}, UserUpdate>, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.contraseña) {
            updates.contraseña = await hashPass(updates.contraseña);
        }

        const updatedUser = await userModel.updateUserById(Number(id), updates);
        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Usuario actualizado exitosamente",
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al actualizar el usuario"
        });
    }
};

export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await userModel.deleteUserById(Number(id));
        if (!deleted) {
            return res.status(404).json({
                status: 404,
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al eliminar el usuario"
        });
    }
};
