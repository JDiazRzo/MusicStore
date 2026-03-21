import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Squares from "../components/Squares/Squares";

function Perfil() {
  const { usuario, token, logout } = useAuth();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchOrdenes() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ordenes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrdenes(data);
      setCargando(false);
    }

    fetchOrdenes();
  }, [token]);

  return (

    <div className="relative min-h-screen px-6">

        <div className="fixed inset-0 -z-10 bg-[#0f0f0f]">
            <Squares speed={0.3} squareSize={30} direction="diagonal" borderColor="#333" hoverFillColor="#222" />
        </div>

        <div className="px-6 py-28 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
            <p className="text-white/50 text-sm mb-10">{usuario?.email}</p>

            <h2 className="text-2xl font-semibold text-white mb-6">Historial de órdenes</h2>

            {cargando ? (
                <p className="text-white/50">Cargando...</p>
            ) : ordenes.length === 0 ? (
                <p className="text-white/50">No tienes órdenes aún.</p>
            ) : (
                <div className="flex flex-col gap-6">
                {ordenes.map((orden) => (
                    <div key={orden.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-white/50 text-sm">{new Date(orden.created_at).toLocaleDateString()}</p>
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                        {orden.estado}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        {orden.orden_items?.map((item) => (
                        <div key={item.orden_id} className="flex justify-between text-sm">
                            <p className="text-white">{item.productos?.nombre}</p>
                            <p className="text-white/50">{item.cantidad} x ${item.precio_unitario.toLocaleString()}</p>
                        </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <p className="text-white font-semibold">Total: ${orden.total.toLocaleString()}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default Perfil;