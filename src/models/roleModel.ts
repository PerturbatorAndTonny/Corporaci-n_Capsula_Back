import { sql } from '../utils/conection.js'

export async function getAlluserByRol(){
  const result = await sql`
  SELECT u.id_usuario, u.nombre, r.id_rol as rol, r.nombre_rol, r.nivel_seguridad 
  FROM usuario u 
  INNER JOIN rol r on u.id_rol = r.id_rol 
  ORDER BY u.id_rol ASC`
  return result
}