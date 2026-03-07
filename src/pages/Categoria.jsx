import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar/NavbarGlass";
import Squares from "../components/Squares/Squares";
import { Link } from "react-router-dom";

function Categoria({ productos, cargando }) {
  const { nombre } = useParams();
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  const asideRef = useRef(null);
  const gridRef = useRef(null);


  const marcas = [
    ...new Set(
      productos
        .filter(p => p.categoria === nombre)
        .map(p => p.marca)
    )
  ];

  const toggleMarca = (marca) => {
    setMarcasSeleccionadas(prev =>
      prev.includes(marca)
        ? prev.filter(m => m !== marca)
        : [...prev, marca]
    );
  };

  const productosFiltrados = productos.filter(p => {
    const coincideCategoria = p.categoria === nombre;
    const coincideMarca =
      marcasSeleccionadas.length === 0 ||
      marcasSeleccionadas.includes(p.marca);
    return coincideCategoria && coincideMarca;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(asideRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.3 }
        );
      }
    });
    return () => ctx.revert();
  }, [nombre, productosFiltrados]);

  return (
    <div className="relative bg-[#0e0e0e] text-white min-h-screen overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Squares speed={0.3} squareSize={30} direction="diagonal" borderColor="#333" hoverFillColor="#222" />
      </div>

      <div className="relative z-10">
        <Navbar />
        {cargando ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/30 text-sm tracking-widest uppercase">Cargando</p>
            </div>
          </div>
        ) : (
          <main className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 p-10 max-w-[1400px] mx-auto pt-32">

          <aside ref={asideRef} className="relative rounded-2xl h-fit sticky top-8 overflow-hidden border border-white/10">
            <div className="bg-white/5 backdrop-blur-md p-6">
              <h1 className="text-2xl mb-6 capitalize font-semibold">{nombre}</h1>
              <h3 className="text-white/50 text-xs tracking-[0.3em] uppercase mb-5">Filtros</h3>
              <h4 className="text-sm uppercase tracking-widest text-white/40 mb-3">Marca</h4>
              <div className="flex flex-col gap-3">
                {marcas.map((marca) => (
                  <label key={marca} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" onChange={() => toggleMarca(marca)} className="cursor-pointer accent-white" />
                    <span className="text-white/60 group-hover:text-white transition-colors duration-200 text-sm">
                      {marca}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section style={{ position: "relative", overflow: "hidden" }}>
            <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-6">
              {productosFiltrados.map(prod => (
                <Link
                  key={prod.id}
                  to={`/producto/${prod.id}`}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                >
                  <img src={prod.imagen} alt={prod.nombre} className="w-full h-[200px] object-contain mb-4" />
                  <h3 className="text-base font-medium mb-2">{prod.nombre}</h3>
                  <p className="text-white/60 text-sm font-semibold">${prod.precio.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>

          </main>
        )}
      </div>
    </div>
  );
}

export default Categoria;