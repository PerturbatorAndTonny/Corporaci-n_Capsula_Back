import { sql } from '../utils/conection.js'

async function getAllArtifacts() {
    const result = await sql`SELECT * FROM artefacto`
    console.log(result)
}

async function createArtifact() {
    const result = await sql`
    INSERT INTO artefacto (nivel_peligrosidad, nombre_artefacto, descripcion, id_categoria, id_tipo, origen)
    VALUES (${5}, ${'Maquina del tiempo'}, ${'Nave diseñada para viajar al pasado/presente/futuro'}, ${2}, ${2}, ${'Terrestre(Cápsula)'})
    RETURNING id_artefacto, nombre_artefacto, estado, fecha_creacion;
    `
    console.log("New data created!!!", result)
}


async function updateArtifact() {
    const result = await sql`
    UPDATE artefacto
    SET fecha_creacion = ${"2026-03-09"}
    WHERE id_artefacto = ${6}
    RETURNING *
    `
    console.log("data updated", result)
}

async function deleteArtifacts() {
    const result = await sql`
    UPDATE artefacto
    SET estado = ${false}
    WHERE id_artefacto = ${6}
    RETURNING id_artefacto, nombre_artefacto, estado, fecha_creacion;
    `

    console.log("Data deleted", result)
}

async function getOneArtifact() {
    const result = await sql`SELECT * FROM artefacto WHERE id_artefacto = ${3}`

    console.log("data selected:", result[0])
}


// getAllArtifacts()
// createArtifact()
// updateArtifact()
// deleteArtifacts()
// getOneArtifact()