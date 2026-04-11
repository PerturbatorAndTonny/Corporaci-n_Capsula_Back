import { sql } from "../utils/conection.js";

export interface Artifact {
  id_artefacto: number;
  nivel_peligrosidad: number;
  nombre_artefacto: string;
  descripcion: string;
  id_categoria: number;
  id_tipo: number;
  origen: string;
  estado: boolean;
  fecha_creacion: string;
}


export async function getAllArtifacts(): Promise<Artifact[]> {
  const result = await sql`SELECT * FROM artefacto`;
  console.log(result) //verificar resultados
  return result as Artifact[];
}

export async function getOneArtifact(id: number): Promise<Artifact | null> {
  const result = await sql`
    SELECT * FROM artefacto WHERE id_artefacto = ${id}`;
    console.log("artifact: ", result)
  return (result[0] as Artifact) || null;
}

export async function createArtifact(data: Omit<Artifact, "id_artefacto" | "estado">) {
  const result = await sql`
    INSERT INTO artefacto (nivel_peligrosidad, nombre_artefacto, descripcion, id_categoria, id_tipo, origen, fecha_creacion)
    VALUES (
      ${data.nivel_peligrosidad},
      ${data.nombre_artefacto},
      ${data.descripcion},
      ${data.id_categoria},
      ${data.id_tipo},
      ${data.origen},
      ${data.fecha_creacion}
    )
    RETURNING id_artefacto, nombre_artefacto, estado, fecha_creacion;
  `;
  console.log("New data created!!!", result) //verificar creacion
  return result[0];
}

export async function updateArtifact(id: number, data: any) {
  const updates = [];

  if (data.nombre_artefacto !== undefined) {
    updates.push(sql`nombre_artefacto = ${data.nombre_artefacto}`);
  }

  if (data.descripcion !== undefined) {
    updates.push(sql`descripcion = ${data.descripcion}`);
  }

  if (data.id_categoria !== undefined) {
    updates.push(sql`id_categoria = ${data.id_categoria}`);
  }

  if (data.origen !== undefined) {
    updates.push(sql`origen = ${data.origen}`);
  }

  if (data.nivel_peligrosidad !== undefined) {
    updates.push(sql`nivel_peligrosidad = ${data.nivel_peligrosidad}`);
  }

  if (updates.length === 0) {
    throw new Error("No fields to update");
  }

  //Crear la consulta
  const result = await sql`
    UPDATE artefacto
    SET ${updates.reduce((prev, curr, i) => 
      i === 0 ? curr : sql`${prev}, ${curr}`
    )}
    WHERE id_artefacto = ${id}
    RETURNING *
  `;

  console.log("data updated", result)

  return result[0];
}

export async function deleteArtifact(id: number) {
  const result = await sql`
    UPDATE artefacto
    SET estado = ${false}
    WHERE id_artefacto = ${id}
    RETURNING id_artefacto, nombre_artefacto, estado, fecha_creacion;
  `;

  console.log("Data deleted", result)

  return result[0];
}
