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

export const dangerLevelEnum = z.enum(['High', 'Mid', 'Low']);

export const stateEnum = z.enum(['Activo', 'Inactivo']);

export const confidentialityEnum = z.enum([
  'Public',
  'Restricted',
  'Confidential',
  'Ultra-confidential'
]);

export const createArtifactSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  createdAt: z.string().min(1, 'Creation date is required'),
  artifactType: z.string().min(1, 'Artifact type is required'),
  category: categoryEnum,
  origin: originEnum,
  inventor: z.string().min(1, 'Inventor is required'),
  dangerLevel: dangerLevelEnum,
  confidentialityLevel: confidentialityEnum,
  state: stateEnum
});

export type CreateArtifactInput = z.infer<typeof createArtifactSchema>;