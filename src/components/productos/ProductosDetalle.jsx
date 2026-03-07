import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext/CartContext.jsx"
import gsap from "gsap";
import NavbarGlass from "../Navbar/NavbarGlass";
import Squares from "../Squares/Squares";

function ProductoDetalle({ productos }) {
  
  const { id } = useParams();
  const { agregarProducto } = useCart();
  const producto = productos.find(p => p.id === Number(id));
  const imgRef = useRef(null);
  const infoRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (!producto) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(imgRef.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 }
        )
        .fromTo(infoRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2 },
          "-=1"
        )
        .fromTo(descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, [id, producto]);

  if (!producto) return (
    <div className="relative bg-[#0e0e0e] text-white min-h-screen flex items-center justify-center">
      <h2 className="text-2xl text-white/50">Producto no encontrado</h2>
    </div>
  );

  return (
    <div className="relative bg-[#0e0e0e] text-white min-h-screen overflow-hidden">

     
      <div className="absolute inset-0 z-0">
        <Squares speed={0.3} squareSize={30} direction="diagonal" borderColor="#333" hoverFillColor="#222" />
      </div>

      <div className="relative z-10">
        <NavbarGlass />

        <div className="max-w-6xl mx-auto py-24 px-6">

          <div className="grid md:grid-cols-2 gap-10 items-center">

           
            <div ref={imgRef} className="bg-white/5 backdrop-blur-md rounded-2xl p-10 flex justify-center items-center border border-white/10">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="max-w-full max-h-[350px] object-contain"
              />
            </div>

          
            <div ref={infoRef} className="md:text-left text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
                {producto.marca}
              </p>
              <h1 className="text-4xl font-bold mb-4">
                {producto.nombre}
              </h1>
              <p className="text-3xl font-semibold mb-8 text-white">
                ${producto.precio.toLocaleString()}
              </p>

              <button
                onClick={() => agregarProducto(producto)}
                className="px-8 py-3 bg-white text-black font-semibold rounded-full text-sm tracking-widest uppercase hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] mb-8"
              >
                Agregar al carrito
              </button>

              <ul className="space-y-2 text-white/40 text-sm">
                <li> Calidad profesional</li>
                <li> Envíos a todo el país</li>
                <li> Garantía 12 meses</li>
              </ul>
            </div>

          </div>

          <div ref={descRef} className="mt-12 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            <h2 className="mb-4 text-white text-xl font-semibold tracking-wide uppercase text-sm">
              Descripción
            </h2>
            <p className="text-white/50 leading-relaxed">
              {producto.descripcion || "Instrumento profesional ideal para músicos exigentes."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;