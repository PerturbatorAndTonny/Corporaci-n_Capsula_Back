import { sql } from "../utils/conection.js";

export async function createVersion(data: {
  id_artefacto: number;
  numeroversion: string;
  cambiosrealizados: string;
  autor: string;
  fechacambio: string;
}) {
  const result = await sql`
    INSERT INTO version (
      id_artefacto,
      numeroversion,
      cambiosrealizados,
      autor,
      fechacambio
    )
    VALUES (
      ${data.id_artefacto},
      ${data.numeroversion},
      ${data.cambiosrealizados},
      ${data.autor},
      ${data.fechacambio}
    )
    RETURNING *;
  `;

  return result[0];
}

export async function getLastVersion(id_artefacto: number) {
  const result = await sql`
    SELECT numeroversion
    FROM version
    WHERE id_artefacto = ${id_artefacto}
    ORDER BY id_version DESC
    LIMIT 1;
  `;

  return result[0]?.numeroversion || null;
}