import { PatchArtifactInput } from "../schemas/artifactSchema.js";
import { Artifact } from "../models/artifactModel.js";
//Helper para obtener los cambios y realizar el insert de forma mas sencilla

export interface FieldChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export function getChangedFields(
  oldData: Artifact,
  newData: PatchArtifactInput
):  FieldChange[] {
  const changes: FieldChange[] = [];

  const keys = Object.keys(newData) as (keyof PatchArtifactInput)[];

  keys.forEach((key) => {
    if (oldData[key as keyof Artifact] !== newData[key]) {
      changes.push({
        field: key,
        oldValue: oldData[key as keyof Artifact],
        newValue: newData[key],
      });
    }
  });

  return changes;
}

//Para generar versiones, de 1.0 -> 1.9 y se cambia 1.9 -> 2.0
export function generateNextVersion(lastVersion: string | null): string {
  if (!lastVersion) return "1.0";

let [major, minor] = lastVersion.split(".").map(Number);

  minor++;

  if (minor > 9) {
    major++;
    minor = 0;
  }

  return `${major}.${minor}`;
}