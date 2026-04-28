import type { Request, Response } from "express";
import { createSession, addToBlacklist, isBlocked, registerFailedAttempt, resetAttempts } from "../utils/session.js";
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

     const blockStatus = isBlocked(userName);

    if (blockStatus.blocked) {
      return res.status(423).json({
        messageError: `Cuenta bloqueada. Intenta en ${Math.ceil(
          blockStatus.remaining / 1000
        )} segundos`,
      })
    }

    const isUserExist = await getUserCredentials(userName)

    if (!isUserExist) {
      return res.status(404).json({
        messageError: "user not found"
      })
    }
      //Verificar cuenta activa
      if (!isUserExist.estado) {
      return res.status(403).json({
        messageError: "Cuenta inactiva, contacta al administrador",
      });
    }

      const isSame = await comparePass(password, isUserExist.password);

    if (!isSame) {
      const attempt = registerFailedAttempt(userName);

      if (attempt.blockedUntil) {
        return res.status(423).json({
          messageError: "Cuenta bloqueada por múltiples intentos fallidos",
        });
      }

      return res.status(401).json({
        messageError: "Invalid credentials, try again",
      });
    }

    resetAttempts(userName); //Si se inicia sesion de forma correcta, se reinician los intentos

    const credential = await getUserRole(userName)

    const token = await createSession({ role: credential.nombre_rol, id_usuario: credential.id_usuario })
    // 2. REGISTRAR LA AUDITORÍA EN LA BASE DE DATOS
    // Se crea la sesión en la tabla y obtenemos el id generado por PostgreSQL
    const sessionRecord = await dbCreateSession(credential.id_usuario);

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