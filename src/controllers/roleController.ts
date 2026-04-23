import type { Request, Response } from "express";
import type { rolType } from "../schemas/roleSchema.js";

import { userExist, modifyUserRol } from "../models/userModel.js"
import { getAlluserByRol } from '../models/roleModel.js'

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

    const userRolUpdate = await modifyUserRol(Number(id), role)

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
