import express from "express";
import { registro, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/registro", registro);
router.post("/login", login);
router.post("/logout", logout);

export default router;