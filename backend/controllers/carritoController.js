import { supabase } from "../supabaseClient.js";

export const obtenerCarrito = async (req, res) => {
  const { id } = req.usuario;

  const { data, error } = await supabase
    .from("carritos")
    .select("*, productos(*)")
    .eq("usuario_id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};

export const agregarAlCarrito = async (req, res) => {
  const { id } = req.usuario;
  const { producto_id, cantidad } = req.body;

  const { data: existente } = await supabase
    .from("carritos")
    .select("*")
    .eq("usuario_id", id)
    .eq("producto_id", producto_id)
    .single();

  if (existente) {
    const { data, error } = await supabase
      .from("carritos")
      .update({ cantidad: existente.cantidad + cantidad })
      .eq("id", existente.id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  const { data, error } = await supabase
    .from("carritos")
    .insert({ usuario_id: id, producto_id, cantidad })
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
};

export const eliminarDelCarrito = async (req, res) => {
  const { id } = req.usuario;
  const { producto_id } = req.params;

  const { error } = await supabase
    .from("carritos")
    .delete()
    .eq("usuario_id", id)
    .eq("producto_id", producto_id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Producto eliminado del carrito" });
};

export const limpiarCarrito = async (req, res) => {
  const { id } = req.usuario;

  const { error } = await supabase
    .from("carritos")
    .delete()
    .eq("usuario_id", id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: "Carrito limpiado" });
};