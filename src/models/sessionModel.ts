import { sql } from '../utils/conection.js'

interface userInfo {
  id_usuario: number,
  nombre_rol: string,
  nombre: string
}

type UserCredentials = {
  password: string;
  estado: boolean;
}

export async function getUserCredentials(nameUser: string): Promise<UserCredentials | null>{
  const result = await sql`select u."password", u."estado" from usuario as u where u.nombre = ${nameUser}`
  const row = result[0];
  if (!row) return null;
  return {
    password: row.password,
    estado: row.estado,
  }
}

export async function getUserRole(nameUser: string): Promise<userInfo> {
  const result = await sql`
  select rol.nombre_rol, usuario.nombre, usuario.id_usuario from rol inner join usuario on rol.id_rol = usuario.id_rol where usuario.nombre  = ${nameUser}
  `
  return result[0] as userInfo
}