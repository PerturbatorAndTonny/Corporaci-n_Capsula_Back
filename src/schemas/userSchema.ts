import { z } from 'zod';
import { roleEnum } from './roleSchema.js';

export const AuthTypeEnum = z.enum(["FACIAL", "DNA_HUMAN"], {
    error: "El tipo de auth debe ser FACIAL o DNA_HUMAN"
});

export const schemaUserCreate = z.object({
    name: z.string({
        error: "El nombre es requerido",
    }).min(1, "El nombre no puede estar vacío"),

    age: z.number({
        error: "La edad es requerida",
    }).int("La edad debe ser un número entero").positive("La edad debe ser un número positivo"),

    idrol: roleEnum,

    pass: z.string({
        error: "La contraseña es requerida",
    }).min(8, "La contraseña debe tener al menos 8 caracteres"),

    authType: AuthTypeEnum
});

export type UserCreate = z.infer<typeof schemaUserCreate>;