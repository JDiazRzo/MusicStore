import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext/CartContext.jsx";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";
import gsap from "gsap";

function CartPanel() {
   const { carrito, carritoAbierto, setCarritoAbierto, quitarProducto, cambiarCantidad, total, setCarrito } = useCart();
  const { token } = useAuth();
  const panelRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (carritoAbierto) {
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
    } else {
      gsap.to(panelRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
    }
  }, [carritoAbierto]);

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes iniciar sesión para realizar una compra");
      return;
    }

    const res = await fetch("https://musicstore-ew9m.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: carrito }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error al procesar la orden: " + data.error);
      return;
    }

    setCarrito([]);
    setCarritoAbierto(false);
    alert("¡Compra realizada con éxito!");
  };

  

  return (
    <>
      
      <div
        ref={overlayRef}
        onClick={() => setCarritoAbierto(false)}
        className="fixed inset-0 bg-black/60 z-50"
        style={{ opacity: 0, pointerEvents: "none" }}
      />

      
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0e0e0e] border-l border-white/10 z-50 flex flex-col"
        style={{ transform: "translateX(100%)" }}
      >
       
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-white text-lg font-semibold tracking-wide">Carrito</h2>
          <button
            onClick={() => setCarritoAbierto(false)}
            className="text-white/40 hover:text-white transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

   
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {carrito.length === 0 ? (
            <p className="text-white/30 text-sm text-center mt-20">Tu carrito está vacío</p>
          ) : (
            carrito.map(prod => (
              <div key={prod.id} className="flex gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">

                
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="w-20 h-20 object-contain rounded-xl bg-white/5 p-2"
                />

                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-sm font-medium">{prod.nombre}</h3>
                    <p className="text-white/40 text-xs mt-1">
                      ${(prod.precio * prod.cantidad).toLocaleString()}
                    </p>
                  </div>

                 
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
                      <button
                        onClick={() => cambiarCantidad(prod.id, -1)}
                        className="text-white/60 hover:text-white transition-colors text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="text-white text-sm w-4 text-center">{prod.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(prod.id, 1)}
                        className="text-white/60 hover:text-white transition-colors text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => quitarProducto(prod.id)}
                      className="text-white/30 hover:text-white transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/50 text-sm uppercase tracking-widest">Total</span>
              <span className="text-white text-xl font-semibold">${total.toLocaleString()}</span>
            </div>
            <button className="w-full py-4 bg-white text-black font-semibold rounded-full text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
              onClick={handleCheckout}
            
            >
              Proceder al pago
            </button>
          </div>
        )}

      </div>
    </>
  );
}

export default CartPanel;