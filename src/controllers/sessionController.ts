import type { Request, Response } from "express";
import { createSession, addToBlacklist } from "../utils/session.js";
import type { AuthInput } from "../schemas/authSchema.js";
//import { usersDB } from "../models/userModel.js";

import { getUserCredentials, getUserRole } from '../models/sessionModel.js'

import { comparePass } from "../utils/pass.js";

export const newSession = async (req: Request, res: Response) => {
  try {
    // oxlint-disable-next-line no-unused-vars
    const { userName, password } = req.body as AuthInput;
    // userId es cambiable por email (no afecta el flujo)
    // authHash depende del metodo de autheticacion que tenga el user
    // al implementarlo, sigue la logica del password

    const isUserExist = await getUserCredentials(userName)

    if (!isUserExist) {
      return res.status(404).json({
        messageError: "user not found"
      })
    }

    const isSame = await comparePass(password, isUserExist.password)

    if (!isSame) {
      return res.status(401).json({
        messageError: "Invalid credentials, try again"
      })
    }

    const credential = await getUserRole(userName)

    const token = await createSession({ role: credential.nombre_rol })

    return res.status(200).cookie("token", token).json({
      message: "Session created successfully",
      data: credential.nombre_rol,
      session: token
    })

  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}

export const closeSession = (req: Request, res: Response) => {
  try {

    const { token } = req.cookies

    addToBlacklist(token)
    
    res.clearCookie("token").json({
      message: "Session closed successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}
