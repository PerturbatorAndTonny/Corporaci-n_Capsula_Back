import { neon } from '@neondatabase/serverless'

const uriConector = process.env.NEON_URI as string

export const sql = neon(uriConector)