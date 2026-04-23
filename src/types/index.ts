//mover el type jwtPayload a un achivo de tipados
export type jwtPayload = {
  role: string;
  id_session: number; // <- El nuevo campo que pide el Issue
}