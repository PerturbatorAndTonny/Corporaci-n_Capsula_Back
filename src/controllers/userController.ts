// oxlint-disable typescript/ban-types
// oxlint-disable no-unused-vars
import { Request, Response } from 'express';
import { UserCreate } from '../schemas/schemaUser.js';
import { usersDB } from '../models/modelUser.js';
import { hashPass } from '../utils/pass.js';

export const createUser = async (req: Request<{}, {}, UserCreate>, res: Response) => {
    try {
        const { name, age, idrol, pass, authType } = req.body;

        const newUser = {
            id: usersDB.length + 1,
            name,
            age,
            idrol: idrol,
            authType,
            state: true,
            failed_attempts: 0,
            createdAt: new Date().toISOString(),
            pass: await hashPass(pass)
        };
        usersDB.push(newUser);

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

export const getUsers = (req: Request, res: Response) => {
    try {

        return res.status(200).json({
            status: 200,
            data: usersDB
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error al obtener los usuarios"
        });
    }
};
