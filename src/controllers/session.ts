import type { Request, Response } from "express";
import { createSession } from "../utils/session.js";
import type { AuthInput } from "../schemas/auth.js";
import { usersDB } from "../models/modelUser.js";

import { comparePass } from "../utils/pass.js";

export const newSession = async (req: Request, res: Response) => {
  try {
    // oxlint-disable-next-line no-unused-vars
    const { userId, password, authHash } = req.body as AuthInput;

    const isUserExist = usersDB.find(
      (User) => User.id === Number(userId)
    )

    if (!isUserExist) {
      return res.status(404).json({
        messageError: "user not found"
      })
    }

    const isSame = await comparePass(password, isUserExist.pass)

    if (!isSame) {
      isUserExist.failed_attempts++
      return res.status(401).json({
        messageError: "Invalid credentials, try again"
      })
    }

    const token = await createSession({ role: isUserExist.idrol })

    return res.status(200).cookie("token", token).json({
      message: "Session created successfully",
      data: isUserExist.idrol,
      session: token
    })

  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}