import { sql } from "./conection.js";
import type { AuditoriaPayload, RegistroAuditoria } from "../types/audit.js"


function buildRegistroAuditoria(payload: AuditoriaPayload): RegistroAuditoria {
  return {
    nombre_tabla: payload.nombre_tabla,
    accion: payload.accion,
    id_usuario: payload.id_usuario,
    id_artefacto: payload.id_artefacto,
    valor_anterior: payload.valor_anterior,
    valor_nuevo: payload.valor_nuevo,
    fecha_operacion: new Date(),
  };

}

export async function registrarAuditoria(payload: AuditoriaPayload): Promise<void> {
  const registry = buildRegistroAuditoria(payload);
  console.log("📝 [Auditoría] Registrando:", registry);
  await sql`
  INSERT INTO auditoria (
      nombre_tabla,
      accion,
      id_usuario,
      id_artefacto,
      valor_anterior,
      valor_nuevo,
      fecha_operacion
    ) VALUES (
        ${registry.nombre_tabla},
        ${registry.accion},
        ${registry.id_usuario},
        ${registry.id_artefacto || null},  // CAMBIADO: manejo de null
        ${registry.valor_anterior || null},  // CAMBIADO: manejo de null
        ${registry.valor_nuevo || null},  // CAMBIADO: manejo de null
        ${registry.fecha_operacion}
    )
  `
}


