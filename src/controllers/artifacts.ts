import { Request, Response } from 'express';
import { CreateArtifactInput } from '../schemas/artifacts.js';
import { artifactInventory, Artifact } from '../models/artifacts.js';


export const createArtifact = async (req: Request<{}, {}, CreateArtifactInput>,res: Response): Promise<void> => {
  const artifactData = req.body;
  const existingArtifact = artifactInventory.find(
    (artifact) => artifact.code === artifactData.code
  )

  if (existingArtifact) {
    res.status(400).json({
      message: 'Artifact code already exists'
    })
    return;
  }

  const newArtifact: Artifact = {
    id: crypto.randomUUID(),
    ...artifactData
  }

  artifactInventory.push(newArtifact);

  res.status(201).json({
    message: 'Artifact created successfully',
    data: newArtifact
  })

  
}