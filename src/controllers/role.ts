import type { Request, Response } from "express";
import type { rolType } from "../schemas/role.js";

export const updateUserRole = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body as rolType;
    /* Aquí iría la lógica para actualizar el rol del usuario en la base de datos
    -
    -
    -
    -
    -
    -
    */
    return res.status(200).json({
      message: `User with id ${id} has been updated to role ${role}`
    })  
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}