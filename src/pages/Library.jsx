import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Cart } from "../pages/Cart.jsx";
import { end_points } from "../services/api"; // Usamos tu archivo centralizado de rutas de API
import "../pages/PagesCss/Library.css";

// IMPORTA TUS COMPONENTES
import Navbar from "../components/HeaderBarraNavegacion.jsx"; 
import Footer from "../components/Footer"; 

export const Library = () => {
  const [libros, setLibros] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Credenciales administrativas para saltar el Spring Security básico
  const credentialsBase64 = btoa("admin:admin123");

  // Inicializar carrito desde el localStorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_alquimia");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 1. CARGAR LIBROS DESDE TU BACKEND (Con Basic Auth)
  useEffect(() => {
    fetch(end_points.books || end_points.products, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${credentialsBase64}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al intentar obtener los libros del servidor.");
        return res.json();
      })
      .then((data) => setLibros(data))
      .catch((err) => {
        console.error("Error API:", err);
        Swal.fire({
          title: "Error de Conexión",
          text: "No se pudieron cargar los libros desde el servidor de Render.",
          icon: "error",
          confirmButtonColor: "#4f46e5"
        });
      });
  }, [credentialsBase64]);

  // 2. LOGICA DE CONTROL DE COMPRA Y AGREGADO
  const agregarAlCarrito = (libro) => {
    // Verificar si el usuario inició sesión antes de dejarlo meter cosas al carro
    const session = localStorage.getItem("user_session");
    
    if (!session) {
      Swal.fire({
        title: "¡Inicia Sesión!",
        text: "Necesitas tener una cuenta activa para poder comprar libros en la Alquimia.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Ir al Login",
        cancelButtonText: "Seguir mirando",
        confirmButtonColor: "#4f46e5",
        cancelButtonColor: "#374151"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Login");
        }
      });
      return;
    }

    // Si está logueado, procede a guardar en el carrito
    const nuevoCarrito = [...carrito, libro];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito_alquimia", JSON.stringify(nuevoCarrito));
    
    Swal.fire({
      title: "¡Agregado!",
      text: `"${libro.titulo}" se añadió a tu carrito.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] overflow-x-hidden">

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        
        {/* NAVBAR SUPERIOR */}
        <Navbar />

        {/* BOTÓN FLOTANTE DEL CARRITO */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full font-bold flex items-center gap-2 shadow-2xl transition-all active:scale-90 hover:scale-110"
        >
          <span className="text-2xl">🛒</span>
          <span className="bg-white text-indigo-900 rounded-full px-2 py-0.5 text-sm shadow-inner">
            {carrito.length}
          </span>
        </button>

        {/* CONTENEDOR DE TARJETAS (Mapeado con los atributos de tu BD de Java) */}
        <main className="container mx-auto py-10 px-4 flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {libros.map((libro) => (
              <div
                key={libro.id}
                className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition shadow-2xl flex flex-col justify-between"
              >
                {/* Contenedor de la Imagen del Libro */}
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  <img
                    src={libro.imagenUrl || "https://via.placeholder.com/150?text=Sin+Portada"} // Fallback por si no tiene URL de imagen
                    alt={libro.titulo}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Detalles del Libro */}
                <div className="p-5 flex flex-col justify-between flex-grow h-48">
                  <div>
                    <h3 className="text-white font-bold line-clamp-2 text-base">
                      {libro.titulo}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 italic">
                      {libro.autor || "Autor Desconocido"}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-indigo-400 font-bold text-xl mb-3">
                      ${libro.precio ? libro.precio.toLocaleString("es-CO") : "0"} COP
                    </p>
                    <button
                      onClick={() => agregarAlCarrito(libro)}
                      className="w-full bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-bold py-2 rounded transition-colors uppercase tracking-wider text-xs"
                    >
                      + Añadir
                    </button>
                  </div>
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