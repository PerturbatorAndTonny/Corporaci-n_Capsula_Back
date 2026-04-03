import type { Request, Response } from "express";
import type { rolType } from "../schemas/role.js";

import { usersDB } from "../models/modelUser.js"; 

export const updateUserRole = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body as rolType;

    const isUserExist = usersDB.find(
      (User) => User.id === Number(id)
    )

    if (!isUserExist) {
      return res.status(404).json({
        messageError: "user not found"
      })
    }

    isUserExist.idrol = role;

    return res.status(200).json({
      message: `User with id ${id} has been updated to role ${role}`
    })  
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}