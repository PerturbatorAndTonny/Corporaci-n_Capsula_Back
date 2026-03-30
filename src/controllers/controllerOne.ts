import { hashPass } from "../utils/pass.js"
import type { Request, Response } from "express";

export const controllerOne = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Pong!, but is a controller :D"
  })
}

export const controllerTwo = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Pong!, but is a controller :D and the id is ${id}`
  })
}

export const controllerThree = async (req: Request, res: Response) => {
  const { name, mail, pass } = req.body;
  const securePass = await hashPass(pass);
  res.status(201).json({
    message: `User created with name: ${name}, mail: ${mail} and pass: ${securePass}`
  })
}
