import { ZodError } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const verifyData = (schema: { parse: (arg: any) => void }) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      });
    }
    next(error);
  }
};