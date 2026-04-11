import { z } from 'zod';
import { roleEnum } from './roleSchema.js';


export const schemaUserCreate = z.object({
    nombre: z.string({
        error: "El nombre es requerido",
    }).min(1, "El nombre no puede estar vacío"),

    edad: z.number({
        error: "La edad es requerida",
    }).int("La edad debe ser un número entero").positive("La edad debe ser un número positivo"),


    contraseña: z.string({
        error: "La contraseña es requerida",
    }).min(8, "La contraseña debe tener al menos 8 caracteres"),

});

export type UserCreate = z.infer<typeof schemaUserCreate>;