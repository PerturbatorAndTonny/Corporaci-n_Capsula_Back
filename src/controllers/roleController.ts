import type { Request, Response } from "express";
import type { rolType } from "../schemas/roleSchema.js";

import { userExist, modifyUserRol } from "../models/userModel.js"
import { getAlluserByRol } from '../models/roleModel.js'

import { registrarAuditoria } from "../utils/audit.js"

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body as rolType;

    const isUserExist = await userExist(Number(id));

    if (!isUserExist) {
      return res.status(404).json({
        message: "user not found"
      })
    }

if (Number(req.user?.id_usuario) === Number(id)) {
  return res.status(400).json({
    message: "No puedes modificar tu propio rol"
  })
}

    if (isUserExist.id_rol === role) {
      return res.status(400).json({
        message: "El usuario ya tiene asignado ese rol"
      })
    }

    const userRolUpdate = await modifyUserRol(Number(id), role)

    await registrarAuditoria({
      nombre_tabla: "usuario",
      accion: 'UPDATE',
      id_usuario: Number(req.user?.id_usuario),
      valor_anterior: JSON.stringify({ id_rol: isUserExist.id_rol }),
      valor_nuevo: JSON.stringify({ id_rol: role }),
    })

    return res.status(200).json({
      message: `user updated`,
      data: userRolUpdate
    })

  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}

export const getUsersByRol = async (req: Request, res: Response) => {
  try {
    const users = await getAlluserByRol();
    return res.status(200).json({
      message: 'List of users by rol',
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}
