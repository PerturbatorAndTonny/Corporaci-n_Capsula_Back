
import { Request, Response } from 'express';
import { CreateArtifactInput, PatchArtifactInput } from '../schemas/artifacts.js';
import { artifactInventory, Artifact } from '../models/artifacts.js';

// oxlint-disable-next-line typescript/ban-types
export const createArtifact = (req: Request<{}, {}, CreateArtifactInput>, res: Response) => {
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

export const patchArtifacts = (req: Request<{ id: string }, {}, PatchArtifactInput>, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const artifactIndex = artifactInventory.findIndex(
    (artifact) => artifact.id === id
  );

  if (artifactIndex === -1) {
    return res.status(404).json({ message: 'Artifact not found' })
  }

  const currentArtifact = artifactInventory[artifactIndex];

  const updatedArtifact = { ...currentArtifact, ...updates };

  artifactInventory[artifactIndex] = updatedArtifact;

  return res.status(200).json({
    message: 'Artifact updated successfully',
    data: updatedArtifact
  });
}

export const deactivateArtifact = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const userRole = req.headers['x-role'];

    if (userRole !== 'ADMIN') {
      return res.status(403).json({
        status: 403,
        message: "Acceso denegado. Se requieren permisos de Administrador."
      });
    }

    const artifact = artifactInventory.find(a => a.id === id);

    if (!artifact) {
      return res.status(404).json({
        status: 404,
        message: "Artefacto no encontrado"
      });
    }


    if (artifact.state === 'Inactivo') {
      return res.status(400).json({
        status: 400,
        message: "El artefacto ya se encuentra en estado Inactivo"
      });
    }

    artifact.state = 'Inactivo';

    return res.status(200).json({
      status: 200,
      message: "Artefacto desactivado correctamente",
      data: artifact
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error interno al desactivar el artefacto"
    });
  }
};