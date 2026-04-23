import type { Request, Response } from "express";
// Le ponemos Alias a las funciones de utilidades para no confundirlas
import { createSession as generateJWT, addToBlacklist } from "../utils/session.js"; 
import type { AuthInput } from "../schemas/authSchema.js";

// Importamos las nuevas funciones de base de datos con Alias
import { 
  getUserCredentials, 
  getUserRole, 
  createSession as dbCreateSession, 
  closeSession as dbCloseSession 
} from '../models/sessionModel.js';

import { comparePass } from "../utils/pass.js";

export const newSession = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body as AuthInput;

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

    // 1. Obtenemos los datos del usuario (ahora incluye el id_usuario)
    const credential = await getUserRole(userName)

    // 2. REGISTRAR LA AUDITORÍA EN LA BASE DE DATOS
    // Se crea la sesión en la tabla y obtenemos el id generado por PostgreSQL
    const sessionRecord = await dbCreateSession(credential.id_usuario);

    // 3. GENERAR EL TOKEN (Incluyendo el nuevo id_session en el payload)
    const token = await generateJWT({ 
        role: credential.nombre_rol,
        id_session: sessionRecord.id_sesion 
    })

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

// Convertimos la función a async para poder interactuar con la DB
export const closeSession = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies

    // 1. Extraemos el id_session que el middleware decodificó previamente
    // (Aprovechamos el tipado global que tus compañeros hicieron en global.ts)
    const id_session = req.user?.id_session;

    // 2. ACTUALIZAR LA BASE DE DATOS (Marcar salida y estado = false)
    if (id_session) {
        await dbCloseSession(id_session);
    }

    // 3. Proceso estándar de cierre
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