import jwt from 'jsonwebtoken';

export  function createSession(userRole: string): string {
  const payload = {
    role: userRole,
  }
  const token = jwt.sign(payload, "secretHere", {
    expiresIn: '1h',
  });
  return token;
}