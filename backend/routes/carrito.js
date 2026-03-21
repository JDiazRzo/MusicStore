import express from "express";
import { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito } from "../controllers/carritoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, obtenerCarrito);
router.post("/", verificarToken, agregarAlCarrito);
router.delete("/:producto_id", verificarToken, eliminarDelCarrito);
router.delete("/", verificarToken, limpiarCarrito);

export default router;