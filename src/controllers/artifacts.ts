
import { Request, Response } from 'express';
import { CreateArtifactInput, PatchArtifactInput } from '../schemas/artifacts.js';
import { artifactInventory, Artifact } from '../models/artifacts.js';


// oxlint-disable-next-line typescript/ban-types
export const createArtifact = (req: Request<{}, {}, CreateArtifactInput>,res: Response) => {
  const artifactData = req.body;
  const existingArtifact = null

  if (existingArtifact) {
    return res.status(400).json({
      message: 'Artifact code already exists'
    })
  }

  const newArtifact: Artifact = {
    id: crypto.randomUUID(),
    state: true,
    ...artifactData
  }

  artifactInventory.push(newArtifact);

 return res.status(201).json({
    message: 'Artifact created successfully',
    data: newArtifact
  })

  
}

export const getArtifacts = (req: Request, res: Response) => {
  return res.status(200).json(artifactInventory);
}

export const patchArtifacts = (  req: Request<{ id: string }, {}, PatchArtifactInput>,res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const artifactIndex = artifactInventory.findIndex(
    (artifact) => artifact.id === id
  );

  if (artifactIndex == -1){
    return res.status(404).json({message: 'Artifact not found'})
  }

  const currentArtifact = artifactInventory[artifactIndex];

    const updatedArtifact = {...currentArtifact, ...updates};

  artifactInventory[artifactIndex] = updatedArtifact;

  return res.status(200).json({
    message: 'Artifact updated successfully',
    data: updatedArtifact
  });
}
