import { z } from 'zod';

export const AuthTypeEnum = z.enum(["FACIAL", "DNA_HUMAN"], {
    error: "El tipo de auth debe ser FACIAL o DNA_HUMAN"
});

export const schemaUserCreate = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
    }).min(1, "El nombre no puede estar vacío"),

    age: z.number({
        required_error: "La edad es requerida",
        invalid_type_error: "La edad debe ser un número",
    }).int("La edad debe ser un número entero").positive("La edad debe ser un número positivo"),

    idrol: z.string({
        required_error: "El idrol es requerido",
    }),

    pass: z.string({
        required_error: "La contraseña es requerida",
    }).min(8, "La contraseña debe tener al menos 8 caracteres"),

    authType: AuthTypeEnum
});

export type UserCreate = z.infer<typeof schemaUserCreate>;