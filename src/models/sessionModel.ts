import { sql } from '../utils/conection.js'

interface userInfo {
  id_usuario: number, // <- ¡Agregamos esto que es vital!
  nombre_rol: string,
  nombre: string
}

export async function getUserCredentials(nameUser: string): Promise<{
  password: string
}> {
  const result = await sql`select u."password" from usuario as u where u.nombre = ${nameUser}`
  return result[0] as { password: string }
}

export async function getUserRole(nameUser: string): Promise<userInfo> {
  const result = await sql`
  select usuario.id_usuario, rol.nombre_rol, usuario.nombre 
  from rol inner join usuario on rol.id_rol = usuario.id_rol 
  where usuario.nombre = ${nameUser}
  `
  return result[0] as userInfo
}

// ============================================================================
// NUEVAS FUNCIONES PARA EL ISSUE: AUDITORÍA DE SESIONES
// ============================================================================

export async function createSession(idUsuario: number) {
    const result = await sql`
        INSERT INTO sesion (fecha_inicio, estado_sesion, id_usuario)
        VALUES (CURRENT_TIMESTAMP, true, ${idUsuario})
        RETURNING id_sesion
    `;
    return result[0] as { id_sesion: number };
}

export async function closeSession(idSesion: number) {
    const result = await sql`
        UPDATE sesion
        SET fecha_fin = CURRENT_TIMESTAMP, estado_sesion = false
        WHERE id_sesion = ${idSesion}
        RETURNING id_sesion, estado_sesion
    `;
    return result[0];
}