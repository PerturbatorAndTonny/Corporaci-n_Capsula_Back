
import { Request, Response } from 'express';
import { CreateArtifactInput } from '../schemas/artifacts.js';
import { artifactInventory, Artifact } from '../models/artifacts.js';

// oxlint-disable-next-line typescript/ban-types
export const createArtifact = (req: Request<{}, {}, CreateArtifactInput>,res: Response) => {
  const artifactData = req.body;
  const existingArtifact = artifactInventory.find(
    (artifact) => artifact.code === artifactData.code
  )

  if (existingArtifact) {
   return res.status(400).json({
      message: 'Artifact code already exists'
    })
  }

  const newArtifact: Artifact = {
    id: crypto.randomUUID(),
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
