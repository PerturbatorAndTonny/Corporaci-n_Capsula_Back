import { Request, Response } from 'express';
import { CreateArtifactInput, PatchArtifactInput } from '../schemas/artifactSchema.js';
import * as ArtifactModel from "../models/artifactModel.js";

// oxlint-disable-next-line typescript/ban-types
export const createArtifact = async (req: Request<{}, {}, CreateArtifactInput>,res: Response) => {
  try {
    const newArtifact = await ArtifactModel.createArtifact(req.body);

    return res.status(201).json({
      message: "Artifact created successfully",
      data: newArtifact,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : error});
  }
};

export const getArtifacts = async (req: Request, res: Response) => {
  try {
    const artifacts = await ArtifactModel.getAllArtifacts();

    return res.status(200).json(artifacts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : error });
  }
};

export const getArtifactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artifact = await ArtifactModel.getOneArtifact(Number(id));

    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    return res.status(200).json(artifact);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : error });
  }
};

export const patchArtifacts = async (req: Request<{ id: string }, {}, PatchArtifactInput>, res: Response) => {
  try {
    const { id } = req.params;

    const updatedArtifact = await ArtifactModel.updateArtifact(
      Number(id),
      req.body
    );

    if (!updatedArtifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    return res.status(200).json({
      message: "Artifact updated successfully",
      data: updatedArtifact,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : error });
  }
};

export const deleteArtifact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artifact = await ArtifactModel.deleteArtifact(Number(id));

    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
 
    return res.status(200).json({ message: "Artifact deleted succesfully", data: artifact});
    
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : error });
  }
};