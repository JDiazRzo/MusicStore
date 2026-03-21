import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext/CartContext.jsx";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";
import gsap from "gsap";

function NavbarGlass() {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito, setCarritoAbierto } = useCart();
  const { usuario, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const totalItems = carrito.reduce((acumulado, p) => acumulado + p.cantidad, 0);

  const isTop = location.pathname.startsWith("/categoria") || 
                location.pathname.startsWith("/producto") ||
                location.pathname.startsWith("/login") ||
                location.pathname.startsWith("/registro") ||
                location.pathname.startsWith("/perfil");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: isTop ? -40 : 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [location.pathname]);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { method: "POST" });
    logout();
    navigate("/");
  };

  return (
    <header className={`fixed ${isTop ? "top-6" : "bottom-6"} left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto`}>
      <nav ref={navRef} className="text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg">
        
        {/* Fila principal */}
        <div className="flex gap-3 md:gap-5 px-4 md:px-6 py-3 items-center justify-center text-xs md:text-sm">
          
          {/* Hamburguesa solo en móvil */}
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden hover:text-white/70 transition-colors">
            <i className={`bi ${menuAbierto ? "bi-x-lg" : "bi-list"} text-xl`}></i>
          </button>

          {/* Links solo en desktop */}
          <Link to="/" className="hidden md:block hover:text-white/70 transition-colors">Inicio</Link>
          <Link to="/categoria/guitarra" className="hidden md:block hover:text-white/70 transition-colors">Guitarras</Link>
          <Link to="/categoria/piano" className="hidden md:block hover:text-white/70 transition-colors">Pianos</Link>
          <Link to="/categoria/bateria" className="hidden md:block hover:text-white/70 transition-colors">Baterías</Link>
          <Link to="/categoria/bajo" className="hidden md:block hover:text-white/70 transition-colors">Bajos</Link>

          <button onClick={() => setCarritoAbierto(true)} className="relative hover:text-white/70 transition-colors">
            <i className="bi bi-cart-fill text-lg md:text-xl"></i>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {usuario ? (
            <>
              <Link to="/perfil" className="hover:text-white/70 transition-colors">
                <i className="bi bi-person-circle text-lg md:text-xl"></i>
              </Link>
              <button onClick={handleLogout} className="hover:text-white/70 transition-colors">
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-white/70 transition-colors">
              <i className="bi bi-person-circle text-lg md:text-xl"></i>
            </Link>
          )}
        </div>

        {/* Menú desplegable móvil */}
        {menuAbierto && (
          <div className="md:hidden flex flex-col border-t border-white/10 px-4 py-3 gap-3 text-sm">
            <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
            <Link to="/categoria/guitarra" onClick={() => setMenuAbierto(false)}>Guitarras</Link>
            <Link to="/categoria/piano" onClick={() => setMenuAbierto(false)}>Pianos</Link>
            <Link to="/categoria/bateria" onClick={() => setMenuAbierto(false)}>Baterías</Link>
            <Link to="/categoria/bajo" onClick={() => setMenuAbierto(false)}>Bajos</Link>
          </div>
        )}

      </nav>
    </header>
  );
}

export default NavbarGlass;