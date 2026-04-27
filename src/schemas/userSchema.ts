import { z } from 'zod';

export const schemaUserCreate = z.strictObject({
    nombre: z.string({
        error: "El nombre es requerido",
    }).min(1, "El nombre no puede estar vacío"),

    edad: z.number({
        error: "La edad es requerida",
    }).int("La edad debe ser un número entero").positive("La edad debe ser un número positivo"),


    contraseña: z.string({
        error: "La contraseña es requerida",
    }).min(8, "La contraseña debe tener al menos 8 caracteres"),

    rol: z.number(`
        solo los roles adminitos son:
        1 - Administrador, 
        2 - Directora de Innovacion,
        3 - Experto en tecnologia extraterrestre,
        4 - Especialista en seguridad,
        5 - Inventor/Tester,
        6 - Gestor de proyectos,
        7 - Usuario
        `).max(7, 'Los roles son solo valores entre 1 y 7').max(7, "Los roles son solo valores entre 1 y 7"),
    authType: z.enum(['DNA_SAIYAN', 'DNA_HUMAN'])
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