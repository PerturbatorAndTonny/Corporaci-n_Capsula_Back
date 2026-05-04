import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { jwtPayload } from '../types/index.js'
import { isBlacklisted } from '../utils/session.js'

const secret = process.env.JWT_SECRET as string

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization as string;
  const token = authHeader?.split(" ")[1];

  if (!authHeader) {
    res.status(401).json({ error: "Token requerido" });
    return;
  }

  if (isBlacklisted(token)) {
    res.status(401).json({ error: "Token inválido o expirado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as jwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const verifyRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "No autenticado" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "No tenés permiso para este recurso" });
      return;
    }

    next();
  };
};
