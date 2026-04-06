import { jwtPayload } from './index.ts'

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}