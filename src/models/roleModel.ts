import { sql } from '../utils/conection.js'

interface userByRol {
  id_usuario: number,
  nombre: string,
  id_rol: number,
  nombre_rol: string,
  nivel_seguridad: string
}

export async function getAlluserByRol(): Promise<userByRol[]>{
  const result = await sql`
  SELECT u.id_usuario, u.nombre, r.id_rol as rol, r.nombre_rol, r.nivel_seguridad 
  FROM usuario u 
  INNER JOIN rol r on u.id_rol = r.id_rol 
  ORDER BY u.id_rol ASC`
  return result as userByRol[]
}