import { Request, Response } from 'express';
import { UserCreate } from '../schemas/schemaUser.js';

const users_role = ['ADMIN', 'CIENTIFICO', 'GUERRERO'];

const usersDB: any[] = [];

export const createUser = (req: Request<{}, {}, UserCreate>, res: Response) => {
    try {
      const { name, age, idrol, pass, authType } = req.body;
      const roleExits = users_role.includes(idrol.toUpperCase());

        if (!roleExits) {
        return res.status(400).json({
            status: 400,
            message: `El rol ${idrol} no es válido. Los roles válidos son: ${users_role.join(', ')}` 
            });
        }

        const newUser = {  
            id: usersDB.length + 1,
            name,
            age,
            idrol: idrol.toUpperCase(),
            authType,
            createdAt: new Date().toISOString(),
        };
        usersDB.push(newUser, pass);

        res.status(201).json({
            status: 201,
            message: "Usuario creado exitosamente",
            user: newUser
        });

    }catch (error) {
        res.status(500).json({ 
            status: 500,
            message: "Error al crear el usuario"
    });
  }
};