import { sql } from "../utils/conection.js";

export interface User {
    nombre: string;
    edad: number;
    biometria: string;
    ADN: string;
    contraseña: string;
}

export async function createUser(user: User) {
    const result = await sql`
        INSERT INTO usuario (nombre, edad, password, adn, biometria)
        VALUES (${user.nombre}, ${user.edad}, ${user.contraseña}, ${user.ADN}, ${user.biometria})
        RETURNING nombre, edad, password as contraseña, adn as ADN, biometria
    `;
    return result[0] as User;
}

export async function getUsers() {
    const result = await sql`
        SELECT nombre, edad, password as contraseña, adn as ADN, biometria
        FROM usuario
    `;
    return result as User[];
}


export async function updateUserByName(name: string, updates: Partial<User>) {
    const result = await sql`
        UPDATE usuario
        SET
            nombre = COALESCE(${updates.nombre}, nombre),
            edad = COALESCE(${updates.edad}, edad),
            password = COALESCE(${updates.contraseña}, password),
            adn = COALESCE(${updates.ADN}, adn),
            biometria = COALESCE(${updates.biometria}, biometria)
        WHERE nombre = ${name}
        RETURNING nombre, edad, password as contraseña, adn as ADN, biometria
    `;
    return result[0] as User;
}

export async function getUserByName(name: string) {
    const result = await sql`
        SELECT nombre, edad, password as contraseña, adn as ADN, biometria
        FROM usuario
        WHERE nombre = ${name}
    `;
    return result[0] as User | undefined;
}

export async function deleteUserByName(name: string) {
    const result = await sql`
        DELETE FROM usuario
        WHERE nombre = ${name}
        RETURNING nombre
    `;
    return result[0] ? true : false;
}

export async function userExist(id: number) {
    const result = await sql`SELECT * FROM usuario WHERE id_usuario = ${id}`;
    return result[0];
}

export async function modifyUserRol(id: number, newRol: number) {
    const query = await sql`UPDATE usuario SET id_rol = ${newRol} WHERE id_usuario = ${id} RETURNING nombre, id_rol`;
    return query[0];
}