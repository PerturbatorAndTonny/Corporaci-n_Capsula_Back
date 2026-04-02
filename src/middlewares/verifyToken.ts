import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { jwtPayload } from '../utils/session.js'

const secret = process.env.JWT_SECRET as string

//mover esta modificacion al type Required a un achivo de tipados
declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  if (!token) {
    res.status(401).json({ error: "Token requerido" });
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
