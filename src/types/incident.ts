export type Severidad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export interface IncidentePayload {
  fecha: Date;
  descripcion: string;
  severidad: Severidad;
  estado: boolean;
  id_usuario: number;
}