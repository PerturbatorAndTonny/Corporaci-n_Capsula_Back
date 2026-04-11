import { z } from 'zod';

export const categoryEnum = z.enum([
  'DEFENSE',
  'TRANSPORT',
  'DOMESTIC',
  'ENERGY'
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
  nombre_Artefacto: z.string().min(1, 'Name is required'),
  descripcion: z.string().min(1, 'Description is required'),
  fecha_creacion: z.string().regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "Formato debe ser dd/mm/yyyy").min(1, 'Creation date is required'),
  id_tipo: z.string().min(1, 'Artifact type is required'),
  id_categoria: categoryEnum,
  origen: originEnum,
  id_usuario: z.string().min(1, 'Inventor is required'),
  nivel_peligrosidad: dangerLevelEnum,
  confidentialityLevel: confidentialityEnum
});

export type CreateArtifactInput = z.infer<typeof createArtifactSchema>;

export const patchArtifactSchema = createArtifactSchema
  .pick({
    nombre_Artefacto: true,
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