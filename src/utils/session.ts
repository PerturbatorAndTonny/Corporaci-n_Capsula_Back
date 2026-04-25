import jwt from 'jsonwebtoken';
import type { jwtPayload } from '../types/index.js'

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

const blackList = new Set<string>()

export function addToBlacklist(token: string): void {
  blackList.add(token)
}

export function isBlacklisted(token: string): boolean {
  return blackList.has(token)
}

//Intentos sesion

interface AttemptInfo {
  attempts: number;
  blockedUntil: number | null;
}


const attemptsMap = new Map<string, AttemptInfo>();

const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 15 * 60 * 1000; // 15 min

export function getAttemptInfo(user: string): AttemptInfo {
  return attemptsMap.get(user) ?? { attempts: 0, blockedUntil: null };
}

export function isBlocked(user: string): { blocked: boolean; remaining: number } {
  const info = getAttemptInfo(user);

  if (!info.blockedUntil) {
    return { blocked: false, remaining: 0 };
  }

  const remaining = info.blockedUntil - Date.now();

  if (remaining <= 0) { //Al pasar 15 min el usuario tiene otras 5 oportunidades
    attemptsMap.delete(user);
    return { blocked: false, remaining: 0 };
  }

  return { blocked: true, remaining };
}

export function registerFailedAttempt(user: string): AttemptInfo {
  const current = getAttemptInfo(user);
  const attempts = current.attempts + 1;

  if (attempts >= MAX_ATTEMPTS) {
    const blockedUntil = Date.now() + BLOCK_TIME;

    const data: AttemptInfo = {
      attempts,
      blockedUntil
    };

    attemptsMap.set(user, data);
    return data;
  }

  const data: AttemptInfo = {
    attempts,
    blockedUntil: null
  };

  attemptsMap.set(user, data);
  return data;
}

export function resetAttempts(user: string): void {
  attemptsMap.delete(user);
}