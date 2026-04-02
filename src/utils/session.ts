import jwt from 'jsonwebtoken';

//mover el type jwtPayload a un achivo de tipados
export type jwtPayload = {
  role:string
}

const secret = process.env.JWT_SECRET as string

// oxlint-disable-next-line require-await
export async function createSession (payload: jwtPayload): Promise<unknown> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret , (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })
} 