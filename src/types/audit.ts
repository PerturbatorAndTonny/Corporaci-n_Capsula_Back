export interface AuditoriaPayload {
  nombre_tabla: string;
  accion: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";
  id_usuario: number;
  id_artefacto?: number;
  valor_anterior: string | null;
  valor_nuevo: string | null;
}

export interface RegistroAuditoria {
  nombre_tabla: string;
  accion: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";
  id_usuario: number;
  id_artefacto?: number;
  valor_anterior: string | null;
  valor_nuevo: string | null;
  fecha_operacion: Date;
}