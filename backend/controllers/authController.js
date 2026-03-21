import { supabase } from "../supabaseClient.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registro = async (req, res) => {
  const { email, password, nombre, apellido } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  const { error: perfilError } = await supabase
    .from("perfiles")
    .insert({ id: data.user.id, nombre, apellido });

  if (perfilError) return res.status(400).json({ error: perfilError.message });

  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({ token, usuario: data.user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  const token = jwt.sign(
    { id: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({ token, usuario: data.user });
};

export const logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Sesión cerrada" });
};