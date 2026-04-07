import { createArtifactSchema } from './artifacts.js';
import { z } from 'zod';

export const patchArtifactSchema = createArtifactSchema
  .pick({
    name: true,
    description: true,
    category: true,
    origin: true,
    dangerLevel: true
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided'
  });

export type PatchArtifactInput = z.infer<typeof patchArtifactSchema>;