export type Severidad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export const getSeveridad = (method: string): Severidad => {
  switch (method.toUpperCase()) {
    case "GET":
      return "BAJA";
    case "PATCH":
      return "MEDIA";
    case "POST":
      return "ALTA";
    case "PUT":
    case "DELETE":
      return "CRITICA";
    default:
      return "BAJA";
  }
};

export const buildDescripcion = (method: string, route: string): string => {
  return `Se ejecutó el metodo ${method.toUpperCase()} en la ruta ${route}`;
};