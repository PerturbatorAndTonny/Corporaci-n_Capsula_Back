import { CreateArtifactInput } from '../schemas/artifactsSchema.js';
//Temporal, solo pruebas
export interface Artifact extends CreateArtifactInput {
  id: string;
}

export const artifactInventory: Artifact[] = [];