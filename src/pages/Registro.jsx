import { useState } from "react";
import { useAuth } from "../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Squares from "../components/Squares/Squares";

function Registro() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", nombre: "", apellido: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    login(data);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">

      <div className="fixed inset-0 -z-10 bg-[#0f0f0f]">
        <Squares speed={0.3} squareSize={30} direction="diagonal" borderColor="#333" hoverFillColor="#222" />
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Registro</h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-1">Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#4C8CF5] transition-colors duration-200" />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-1">Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Tu apellido"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#4C8CF5] transition-colors duration-200" />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-white text-sm mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#4C8CF5] transition-colors duration-200" />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-white text-sm mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••"
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-[#4C8CF5] transition-colors duration-200" />
        </div>

        <button onClick={handleSubmit}
          className="w-full bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl py-3 border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200">
          Registrarse
        </button>

        <p className="text-white/50 text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/login")} className="text-white cursor-pointer hover:underline">
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

export default Registro;