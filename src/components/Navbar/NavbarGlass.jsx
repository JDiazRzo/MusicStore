import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext/CartContext.jsx";
import gsap from "gsap";

function NavbarGlass() {
  const navRef = useRef(null);
  const location = useLocation();
  const { carrito, setCarritoAbierto } = useCart();
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const isTop = location.pathname.startsWith("/categoria") || 
                location.pathname.startsWith("/producto");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: isTop ? -40 : 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <header className={`fixed ${isTop ? "top-6" : "bottom-6"} left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto`}>
      <nav ref={navRef} className="flex gap-3 md:gap-6 text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 md:px-6 py-3 shadow-lg text-sm md:text-base justify-center">
        <Link to="/">Inicio</Link>
        <Link to="/categoria/guitarra">Guitarras</Link>
        <Link to="/categoria/piano">Pianos</Link>
        <Link to="/categoria/bateria">Baterías</Link>
        <Link to="/categoria/bajo">Bajos</Link>
        <button onClick={() => setCarritoAbierto(true)} className="relative">
          Carrito
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

export default NavbarGlass;