import { CreateArtifactInput } from '../schemas/artifacts.js';
//Temporal, solo pruebas
export interface Artifact extends CreateArtifactInput {
  id: string;
  state: boolean;
}

export const artifactInventory: Artifact[] = [];