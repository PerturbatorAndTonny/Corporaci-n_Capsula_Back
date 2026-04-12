import { sql } from "../utils/conection.js";

export interface User {

    nombre: string;
    edad: number;
    ADN: string;
    contraseña: string;
    biometria: string;

}

export const usersDB: User[] = [];

export async function userExist(id: number) {
    const result = await sql`SELECT * FROM usuario WHERE id_usuario = ${id}`;
    return result[0]
}

export async function modifyUserRol(id: number, newRol: number) {
    const query = await sql`UPDATE usuario SET id_rol = ${newRol} WHERE id_usuario = ${id} RETURNING nombre, id_rol`;
    return query[0]
}