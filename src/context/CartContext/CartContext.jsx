import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setCarritoAbierto(true); 
  };

  const quitarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, cantidad: Math.max(1, p.cantidad + delta) }
          : p
      )
    );
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CartContext.Provider value={{
      carrito,
      carritoAbierto,
      setCarritoAbierto,
      agregarProducto,
      quitarProducto,
      cambiarCantidad,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}