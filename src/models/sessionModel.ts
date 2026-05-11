import { sql } from '../utils/conection.js'

interface userInfo {
  id_usuario: number,
  nombre_rol: string,
  nombre: string
}

type UserCredentials = {
  password: string;
  estado: boolean;
  biometria: string;
}

export async function getUserCredentials(nameUser: string): Promise<UserCredentials | null>{
  // Agregamos u."biometria" a la consulta SQL
  const result = await sql`select u."password", u."estado", u."biometria" from usuario as u where u.nombre = ${nameUser}`
  const row = result[0];
  if (!row) return null;
  return {
    password: row.password,
    estado: row.estado,
    biometria: row.biometria, // <-- LO DEVOLVEMOS AQUÍ
  }
}

export async function getUserRole(nameUser: string): Promise<userInfo> {
  const result = await sql`
  select rol.nombre_rol, usuario.nombre, usuario.id_usuario from rol inner join usuario on rol.id_rol = usuario.id_rol where usuario.nombre  = ${nameUser}
  `
  return result[0] as userInfo
}

// ============================================================================
// NUEVAS FUNCIONES PARA EL ISSUE: AUDITORÍA DE SESIONES
// ============================================================================

export async function createSession(idUsuario: number) {
    const result = await sql`
        INSERT INTO sesion (fecha_inicio, estado_sesion, id_usuario)
        VALUES (CURRENT_TIMESTAMP AT TIME ZONE 'America/Bogota', true, ${idUsuario})
        RETURNING id_sesion
    `;
    return result[0] as { id_sesion: number };
}

export async function closeSession(idSesion: number) {
    const result = await sql`
        UPDATE sesion
        SET fecha_fin = CURRENT_TIMESTAMP AT TIME ZONE 'America/Bogota', estado_sesion = false
        WHERE id_sesion = ${idSesion}
        RETURNING id_sesion, estado_sesion
    `;
    return result[0];
}
