import express from "express";
import { crearOrden, obtenerOrdenes } from "../controllers/ordenesController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verificarToken, crearOrden);
router.get("/", verificarToken, obtenerOrdenes);

export default router;