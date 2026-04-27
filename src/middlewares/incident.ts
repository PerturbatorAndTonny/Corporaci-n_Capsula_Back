import { Request, Response, NextFunction } from "express";
import { registrarIncidente } from "../models/incidentModel.js";
import { getSeveridad, buildDescripcion } from "../utils/incident.js";
import { IncidentePayload } from "../types/incident.js";

export const incidenteMiddleware = async (req: Request, res : Response, next: NextFunction) => {
  if (!req.user) return next();

  try {
    const payload: IncidentePayload = {
      fecha: new Date(),
      descripcion: buildDescripcion(req.method, req.originalUrl),
      severidad: getSeveridad(req.method),
      estado: true,
      id_usuario: req.user.id_usuario,
    };

    await registrarIncidente(payload);
  } catch (error) {
    console.error(error);
  }

  next();
};