import { sql } from "../utils/conection.js";
import {Severidad} from "../utils/securityInc.js"

export const registrarIncidente = async (data: {
  fecha: Date;
  descripcion: string;
  severidad: Severidad;
  estado: boolean;
  id_usuario: number;
}): Promise<void> => {
  const query = `
    INSERT INTO incidenteseguridad
    (fecha, descripcion, severidad, estado, id_usuario)
    VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [
    data.fecha,
    data.descripcion,
    data.severidad,
    data.estado,
    data.id_usuario,
  ];

  await sql.query(query, values)
};