import { sql } from "../utils/conection.js";
import { IncidentePayload } from "../types/incident.js"

export const registrarIncidente = async (payload: IncidentePayload): Promise<void> => {
  const query = `
    INSERT INTO incidenteseguridad
    (fecha, descripcion, severidad, estado, id_usuario)
    VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [
    payload.fecha,
    payload.descripcion,
    payload.severidad,
    payload.estado,
    payload.id_usuario
  ]

  await sql.query(query, values)
}