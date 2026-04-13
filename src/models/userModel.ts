import { sql } from "../utils/conection.js";

export interface User {
    nombre: string;
    edad: number;
    biometria: string;
    ADN: string;
    contraseña: string;
}

export async function createUser(user: User, idRol: number = 7) {  // Default to "Usuario" role (id=7)
    const result = await sql`
        INSERT INTO usuario (nombre, edad, password, adn, biometria)
        VALUES (${user.nombre}, ${user.edad}, ${user.contraseña}, ${user.ADN}, ${user.biometria}, ${idRol})
        RETURNING nombre, edad, password as contraseña, adn as ADN, biometria , id_rol
    `;
    return result[0] as User & { id_rol: number };
}

export async function getUsers() {
    const result = await sql`
        SELECT nombre, edad, password as contraseña, adn as ADN, biometria
        FROM usuario
    `;
    return result as User[];
}


export async function updateUserById(id: number, updates: Partial<User>) {
    const result = await sql`
        UPDATE usuario
        SET
            nombre = COALESCE(${updates.nombre}, nombre),
            edad = COALESCE(${updates.edad}, edad),
            password = COALESCE(${updates.contraseña}, password),
            adn = COALESCE(${updates.ADN}, adn),
            biometria = COALESCE(${updates.biometria}, biometria)
        WHERE id_usuario = ${id}
        RETURNING nombre, edad, password as contraseña, adn as ADN, biometria
    `;
    return result[0] as User;
}

export async function getUserById(id: number) {
    const result = await sql`
        SELECT nombre, edad, password as contraseña, adn as ADN, biometria
        FROM usuario
        WHERE id_usuario = ${id}
    `;
    return result[0] as User | undefined;
}

export async function deleteUserById(id: number) {
    const result = await sql`
        UPDATE usuario 
        SET estado = false 
        WHERE id_usuario = ${id} 
        RETURNING nombre, estado
    `;
    return result[0];
}

export async function userExist(id: number) {
    const result = await sql`SELECT * FROM usuario WHERE id_usuario = ${id}`;
    return result[0];
}

export async function modifyUserRol(id: number, newRol: number) {
    const query = await sql`UPDATE usuario SET id_rol = ${newRol} WHERE id_usuario = ${id} RETURNING nombre, id_rol`;
    return query[0];
}