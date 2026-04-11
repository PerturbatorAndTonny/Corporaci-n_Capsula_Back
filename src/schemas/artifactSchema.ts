import { z } from 'zod';

export const categoryEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const originEnum = z.enum([
  'TERRICOLA',
  'SAIYAJIN',
  'NAMEKIANO'
]);

export const dangerLevelEnum = z.union([  
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
]);

export const confidentialityEnum = z.enum([
  'Public',
  'Restricted',
  'Confidential',
  'Ultra-confidential'
]);

export const createArtifactSchema = z.object({
  nombre_artefacto: z.string().min(1, 'Name is required'),
  descripcion: z.string().min(1, 'Description is required'),
  fecha_creacion: z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  "Formato debe ser YYYY-MM-DD").min(1, 'Date is required'),
  id_tipo: z.number().min(1, 'Artifact type is required'),
  id_categoria: categoryEnum,
  origen: originEnum,
  //id_usuario: z.string().min(1, 'Inventor is required'),
  nivel_peligrosidad: dangerLevelEnum,
  confidentialityLevel: confidentialityEnum.optional()
});

export type CreateArtifactInput = z.infer<typeof createArtifactSchema>;

export const patchArtifactSchema = createArtifactSchema
  .pick({
    nombre_artefacto: true,
    descripcion: true,
    id_categoria: true,
    origen: true,
    nivel_peligrosidad: true
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided'
  });

export type PatchArtifactInput = z.infer<typeof patchArtifactSchema>;