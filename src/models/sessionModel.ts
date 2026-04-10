import { sql } from '../utils/conection.js'

interface userInfo {
  nombre_rol: string,
  nombre: string
}

export async function getUserCredentials(nameUser: string): Promise<{
  password: string
}> {
  const result = await sql`select u."password"  from usuario as u where u.nombre = ${nameUser}`
  return result[0] as { password: string }
}

export async function getUserRole(nameUser: string): Promise<userInfo> {
  const result = await sql`
  select rol.nombre_rol, usuario.nombre from rol inner join usuario on rol.id_rol = usuario.id_rol where usuario.nombre  = ${nameUser}
  `
  return result[0] as userInfo
}