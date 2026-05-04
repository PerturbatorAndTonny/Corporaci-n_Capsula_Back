import { Router } from "express";
import {
  getAllLogs,
  getLogsByTable,
  getLogsByUser,
  getLogsByAction,
  clearOldLogs
} from "../controllers/auditController.js";
import { verifyToken, verifyRole } from "../middlewares/verifyToken.js";

const router: Router = Router();

router.get("/audit-logs", verifyToken, getAllLogs);
router.get("/audit-logs/table/:table", verifyToken, getLogsByTable);
router.get("/audit-logs/user/:userId", verifyToken, getLogsByUser);
router.get("/audit-logs/action/:action", verifyToken, getLogsByAction);

router.delete("/audit-logs/clear/:days", verifyToken, verifyRole("Administrador"), clearOldLogs);

export default router;