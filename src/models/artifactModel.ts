import { CreateArtifactInput } from '../schemas/artifactSchema.js';
//Temporal, solo pruebas
export interface Artifact extends CreateArtifactInput {
  id: string;
  state: boolean;
}

export const artifactInventory: Artifact[] = [];