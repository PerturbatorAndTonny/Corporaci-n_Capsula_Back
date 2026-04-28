import { sql } from "./conection.js";
import type { AuditoriaPayload, RegistroAuditoria } from "../types/audit.js"


function buildRegistroAuditoria(payload: AuditoriaPayload): RegistroAuditoria {
  return {
    ...payload,
    fecha_operacion: new Date(),
  };

}

export async function registrarAuditoria (payload: AuditoriaPayload): Promise<void> {
  const registry = buildRegistroAuditoria(payload);
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
      ${registry.id_artefacto},
      ${registry.valor_anterior},
      ${registry.valor_nuevo},
      ${registry.fecha_operacion}
    )
  `
}


