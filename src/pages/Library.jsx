import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Cart } from "../pages/Cart.jsx";
import { API_CONFIG } from "../services/api";
import "../pages/PagesCss/Library.css";

// IMPORTA TUS COMPONENTES
import  Navbar  from "../components/HeaderBarraNavegacion.jsx"; 
import  Footer  from "../components/Footer"; 

export const Library = () => {
  const [libros, setLibros] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_alquimia");
    return guardado ? JSON.parse(guardado) : [];
  });

  const characters = "アアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ마미ムメモヤユヨラリルレロワヲン".split("");
  const matrixContent = Array(200).fill(characters).flat().slice(0, 700);

  useEffect(() => {
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`)
      .then((res) => res.json())
      .then((data) => setLibros(data))
      .catch((err) => {
        console.error("Error API:", err);
        Swal.fire("Error", "No se pudieron cargar los libros.", "error");
      });
  }, []);

  const agregarAlCarrito = (libro) => {
    const nuevoCarrito = [...carrito, libro];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito_alquimia", JSON.stringify(nuevoCarrito));
    Swal.fire({
      title: "¡Agregado!",
      text: `"${libro.title}" se añadió a tu carrito.`,
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* FONDO MATRIX */}
      <div className="matrix-bg">
        {matrixContent.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        
        {/* NAVBAR SUPERIOR */}
        <Navbar />

        {/* BOTÓN FLOTANTE DEL CARRITO (Recuperado y mejorado) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full font-bold flex items-center gap-2 shadow-2xl transition-all active:scale-90 hover:scale-110"
        >
          <span className="text-2xl">🛒</span>
          <span className="bg-white text-indigo-900 rounded-full px-2 py-0.5 text-sm shadow-inner">
            {carrito.length}
          </span>
        </button>

        <main className="container mx-auto py-10 px-4 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {libros.map((libro) => (
              <div
                key={libro.id}
                className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition shadow-2xl"
              >
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  <img
                    src={libro.image}
                    alt={libro.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between h-48">
                  <h3 className="text-white font-bold line-clamp-2">
                    {libro.title}
                  </h3>
                  <p className="text-indigo-400 font-bold text-xl">
                    ${libro.price}
                  </p>
                  <button
                    onClick={() => agregarAlCarrito(libro)}
                    className="w-full bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-bold py-2 rounded transition-colors"
                  >
                    + Añadir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* FOOTER AL FINAL */}
        <Footer />

        {/* COMPONENTE CARRITO (Panel lateral) */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          productos={carrito}
          setProductos={setCarrito}
        />
      </div>
    </div>
  );
};