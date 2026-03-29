import { Router } from "express";
import { verifyData } from "../middlewares/verifyData.js";
import { schemaOne } from "../schemas/schemaOne.js";
import { controllerOne, controllerTwo, controllerThree } from "../controllers/controllerOne.js"

const router = Router();

router.get("/ping", controllerOne);
router.get("/ping/:id", controllerTwo);

router.post("/ping", verifyData(schemaOne), controllerThree);

export default router;