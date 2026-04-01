import jwt from 'jsonwebtoken';

//mover el type jwtPayload a un achivo de tipados
export type jwtPayload = {
  role:string
}

export  function createSession(userRole: string): string {
  const payload: jwtPayload = {
    role: userRole,
  }
  const token = jwt.sign(payload, "secretHere", {
    expiresIn: '1h',
  });
  return token;
}