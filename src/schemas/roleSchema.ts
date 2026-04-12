import z from 'zod'
export const rolSchema = z.strictObject({
  role: z.number(`
    solo los roles adminitos son:
    1 - Administrador, 
    2 - Directora de Innovacion,
    3 - Experto en tecnologia extraterrestre,
    4 - Especialista en seguridad,
    5 - Inventor/Tester,
    6 - Gestor de proyectos,
    7 - Usuario
    `).max(7, 'Los roles son solo valores entre 1 y 7').max(7, "Los roles son solo valores entre 1 y 7")
})

export type rolType = z.infer<typeof rolSchema>