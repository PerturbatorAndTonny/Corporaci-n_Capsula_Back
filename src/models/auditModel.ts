import { sql } from "../utils/conection.js";

export interface AuditLog {
  id_registro?: number;
  id_auditoria?: number;
  nombre_tabla: string;
  accion: string;
  id_usuario: number;
  id_artefacto: number | null;
  valor_anterior: string | null;
  valor_nuevo: string | null;
  fecha_operacion: Date;
}

export async function getAllAuditLogs(): Promise<AuditLog[]> {
  try {
    const result = await sql`
      SELECT *
      FROM auditoria
      ORDER BY fecha_operacion DESC
    `;
    console.log("📋 [AuditModel] Columnas recibidas:", result.length > 0 ? Object.keys(result[0]) : "sin datos");
    return result as AuditLog[];
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return [];
  }
}

export async function getAuditLogsByTable(tableName: string): Promise<AuditLog[]> {
  try {
    const result = await sql`
      SELECT *
      FROM auditoria
      WHERE nombre_tabla = ${tableName}
      ORDER BY fecha_operacion DESC
    `;
    return result as AuditLog[];
  } catch (error) {
    console.error("Error fetching audit logs by table:", error);
    return [];
  }
}

export async function getAuditLogsByUser(userId: number): Promise<AuditLog[]> {
  try {
    const result = await sql`
      SELECT *
      FROM auditoria
      WHERE id_usuario = ${userId}
      ORDER BY fecha_operacion DESC
    `;
    return result as AuditLog[];
  } catch (error) {
    console.error("Error fetching audit logs by user:", error);
    return [];
  }
}

export async function getAuditLogsByAction(action: string): Promise<AuditLog[]> {
  try {
    const result = await sql`
      SELECT *
      FROM auditoria
      WHERE accion = ${action}
      ORDER BY fecha_operacion DESC
    `;
    return result as AuditLog[];
  } catch (error) {
    console.error("Error fetching audit logs by action:", error);
    return [];
  }
}

export async function clearOldAuditLogs(days: number): Promise<void> {
  try {
    await sql`
      DELETE FROM auditoria
      WHERE fecha_operacion < NOW() - INTERVAL '${days} days'
    `;
  } catch (error) {
    console.error("Error clearing old audit logs:", error);
    throw error;
  }
}