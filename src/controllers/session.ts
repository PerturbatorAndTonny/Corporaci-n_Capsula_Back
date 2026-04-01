import type { Request, Response } from "express";
import { createSession } from "../utils/session.js";
// import type { AuthInput } from "../schemas/auth.js";

export const newSession = (req: Request, res: Response) => {
  try {
    /*
    Aquí iría la lógica para verificar las credenciales del usuario
    const { userId, password, authHash } = req.body as AuthInput;
    -
    -
    -
    -
    -
    -

    */

    const token = createSession("Administrador")

    return res.status(200).json({
      message: "Session created successfully",
      data: "Administrador",
      session: token
    })

  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}