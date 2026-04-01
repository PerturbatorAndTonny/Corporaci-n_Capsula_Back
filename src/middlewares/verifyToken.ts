import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { jwtPayload } from '../utils/session.js'

//mover esta modificacion al type Required a un achivo de tipados
declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { session } = req.body

  if (!session) {
    res.status(401).json({ error: "Token requerido" });
    return;
  }

  try {
    const decoded = jwt.verify(session, 'secretHere') as jwtPayload;
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
