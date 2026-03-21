import { useEffect, useState } from "react";
import { supabase } from "./backend/supabaseClient.js";
import Categoria from "./pages/Categoria";
import ProductoDetalle from "./components/productos/ProductosDetalle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import CartPanel from "./components/CartPanel/CartPanel.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Perfil from "./pages/Perfil";

function App() {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from("productos").select("*");
      if (error) console.error("Error al traer productos:", error);
      else setProductos(data);
      setCargando(false);
    }
    fetchProductos();
  }, []);

  return (
    <>
      {cargando && <Loader onComplete={() => setCargando(false)} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categoria/:nombre" element={<Categoria productos={productos} cargando={cargando}/>} />
          <Route path="/producto/:id" element={<ProductoDetalle productos={productos} cargando={cargando}/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/perfil" element={<Perfil/>} />
        </Routes>
        <CartPanel/>
      </BrowserRouter>
    </>
  );
}

export default App;