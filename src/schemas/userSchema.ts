import { z } from 'zod';



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

export const schemaUserUpdate = z.object({
    nombre: z.string().min(1, "El nombre no puede estar vacío").optional(),
    edad: z.number().int("La edad debe ser un número entero").positive("La edad debe ser un número positivo").optional(),
    contraseña: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").optional(),
    ADN: z.string({error: "El ADN es requerido",}).optional(),
    biometria: z.string({error: "La biometria es requerida",}).optional(),
});

export type UserUpdate = z.infer<typeof schemaUserUpdate>;