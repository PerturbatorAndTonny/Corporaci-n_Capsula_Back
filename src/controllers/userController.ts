// oxlint-disable typescript/ban-types
// oxlint-disable no-unused-vars
import { Request, Response } from 'express';
import { UserCreate, UserUpdate } from '../schemas/userSchema.js';
import * as userModel from '../models/userModel.js';
import { hashPass } from '../utils/pass.js';

const generateADN = () => Math.random().toString(36).slice(2, 10).toUpperCase();
const generateBiometria = () => Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join('');

export const createUser = async (req: Request<{}, {}, UserCreate>, res: Response) => {
    try {
        const { nombre, edad, contraseña, rol } = req.body;
        const ADN = generateADN();
        const biometria = generateBiometria();

        const newUser = await userModel.createUser({
            nombre,
            edad,
            ADN,
            contraseña: await hashPass(contraseña),
            biometria
    }, rol || 7);

        res.status(201).json({
            status: 201,
            message: "Usuario creado exitosamente",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error al crear el usuario"
        });
    }
};

// Diccionario para traducir el texto de la URL al ID de tu base de datos
const ROLE_MAP: Record<string, number> = {
    'ADMIN': 1,
    'DIRECTOR_INNOVACION': 2,
    'EXPERTO_EXTRATERRESTRE': 3,
    'ESPECIALISTA_SEGURIDAD': 4,
    'INVENTOR_TESTER': 5,
    'GESTOR_PROYECTOS': 6,
    'USUARIO': 7
};

// Se añade el tipado estricto en el Request para leer el query param "role"
export const getUsers = async (req: Request<{}, {}, {}, { role?: string }>, res: Response) => {
    try {
        const { role } = req.query;
        let roleId: number | undefined;

        // Validar si enviaron un rol por la URL
        if (role) {
            const roleUpper = role.toUpperCase(); // Para evitar errores si escriben en minúscula
            roleId = ROLE_MAP[roleUpper];

            // Si el rol no existe en nuestro diccionario, devolvemos error 400 (Criterio de aceptación)
            if (!roleId) {
                return res.status(400).json({
                    status: 400,
                    message: "Rol inválido. Roles permitidos: ADMIN, DIRECTOR_INNOVACION, EXPERTO_EXTRATERRESTRE, ESPECIALISTA_SEGURIDAD, INVENTOR_TESTER, GESTOR_PROYECTOS, USUARIO"
                });
            }
        }

        // Llamamos al modelo pasando el ID numérico (o undefined si no enviaron nada)
        const users = await userModel.getUsers(roleId);
        
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
