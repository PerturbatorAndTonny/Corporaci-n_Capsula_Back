import z from 'zod'

const roleEnum = z.enum([
  'Administrador',
  'Director de Innovacion',
  'Expreto en tecnologia extraterrestre',
  'especialista en seguridad',
  'Inventor/Tester',
  'Gestor de proyectos',
  'Usuario del Sistema'
], {
  error: 'Role must be one of: Administrador, Director de Innovacion, Expreto en tecnologia extraterrestre, especialista en seguridad, Inventor/Tester, Gestor de proyectos, Usuario del Sistema'
})

export const rolSchema = z.strictObject({
  role: roleEnum
})

export type rolType = z.infer<typeof rolSchema>