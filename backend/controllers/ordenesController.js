import { supabase } from "../supabaseClient.js";

export const crearOrden = async (req, res) => {
  const { id } = req.usuario;
  const { items } = req.body;

  console.log("items recibidos:", items);
  console.log("usuario:", id);


  if (!items || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  // Calcular total
  const total = items.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);

  // Crear orden
  const { data: orden, error: ordenError } = await supabase
    .from("ordenes")
    .insert({ usuario_id: id, total })
    .select()
    .single();

  if (ordenError) return res.status(400).json({ error: ordenError.message });

  // Crear orden_items
  const ordenItems = items.map((item) => ({
    orden_id: orden.id,
    producto_id: item.id,
    cantidad: item.cantidad,
    precio_unitario: item.precio,
  }));

  const { error: itemsError } = await supabase
    .from("orden_items")
    .insert(ordenItems);

  if (itemsError) return res.status(400).json({ error: itemsError.message });

  res.status(201).json({ orden, items: ordenItems });
};

export const obtenerOrdenes = async (req, res) => {
  const { id } = req.usuario;

  const { data, error } = await supabase
    .from("ordenes")
    .select("*, orden_items(*, productos(*))")
    .eq("usuario_id", id)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
};