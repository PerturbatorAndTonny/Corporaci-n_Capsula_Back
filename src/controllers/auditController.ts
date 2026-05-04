import type { Request, Response } from "express";
import {
  getAllAuditLogs,
  getAuditLogsByTable,
  getAuditLogsByUser,
  getAuditLogsByAction,
  clearOldAuditLogs,
} from "../models/auditModel.js";

export const getAllLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await getAllAuditLogs();
    return res.status(200).json({
      status: 200,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error al obtener los registros de auditoría",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const getLogsByTable = async (req: Request, res: Response) => {
  try {
    const table = String(req.params.table);
    const logs = await getAuditLogsByTable(table);
    return res.status(200).json({
      status: 200,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error al obtener los registros por tabla",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const getLogsByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const logs = await getAuditLogsByUser(userId);
    return res.status(200).json({
      status: 200,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error al obtener los registros por usuario",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const getLogsByAction = async (req: Request, res: Response) => {
  try {
    const action = String(req.params.action).toUpperCase();
    const logs = await getAuditLogsByAction(action);
    return res.status(200).json({
      status: 200,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error al obtener los registros por acción",
      error: error instanceof Error ? error.message : error
    });
  }
};

export const clearOldLogs = async (req: Request, res: Response) => {
  try {
    const days = Number(req.params.days);
    await clearOldAuditLogs(days);
    return res.status(200).json({
      status: 200,
      message: `Registros de auditoría de más de ${days} días eliminados exitosamente`
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error al eliminar registros antiguos",
      error: error instanceof Error ? error.message : error
    });
  }
};