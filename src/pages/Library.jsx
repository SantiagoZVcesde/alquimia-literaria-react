import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Cart } from "../pages/Cart.jsx";
import { end_points } from "../services/api"; 
import "../pages/PagesCss/Library.css";

import HeaderBarraNavegacion from "../components/HeaderBarraNavegacion.jsx"; 
import Footer from "../components/Footer"; 

// Listado real de tus categorías para los botones de filtrado
const CATEGORIAS_LISTA = [
  { id: "TODOS", nombre: "Todos" },
  { id: 1, nombre: "Ficción" },
  { id: 2, nombre: "Ciencia ficción" },
  { id: 3, nombre: "Terror" },
  { id: 4, nombre: "Comedia" },
  { id: 5, nombre: "Romance" },
  { id: 6, nombre: "Fantasía" },
  { id: 7, nombre: "Drama" },
  { id: 8, nombre: "Filosofía" }
];

// Mapeo rápido de portadas reales para solucionar los enlaces rotos de la imagen image_ae2998.png
const PORTADAS_PREDEFINIDAS = {
  // --- CATEGORÍA 1: FICCIÓN ---
  "el aleph": "https://www.buscalibre.com.co/libro-el-aleph-el-libro-de-bolsillo-bibliotecas-de-autor-biblioteca-borges/9788420633114/p/978264",
  "cien años de soledad": "https://www.buscalibre.com.co/libro-cien-anos-de-soledad/9788497592208/p/2713624",
  "meridiano de sangre": "https://www.penguinlibros.com/co/tematicas/19927-ebook-meridiano-de-sangre-9788439724902?srsltid=AfmBOor3BPBRJ-CJJAOgJ3j8jksoVrAQbSR2JCZo8YW2aIkEz87QbQPw",
  "el gran gatsby": "https://www.planetadelibros.com.co/libro-el-gran-gatsby/409070",
  "crónica de una muerte anunciada": "https://www.planetadelibros.com.co/libro-crónica-de-una-muerte-anunciada/409071",
  "pedro páramo": "https://www.planetadelibros.com.co/libro-pedro-páramo/409072",

  // --- CATEGORÍA 2: CIENCIA FICCIÓN ---
  "1984": "https://www.buscalibre.com.co/libro-1984/9789875669284/p/34494617",
  "un mundo feliz": "https://www.buscalibre.com.co/libro-un-mundo-feliz/9788497592208/p/2713624",
  "fahrenheit 451": "https://www.buscalibre.com.co/libro-fahrenheit-451/9788497592208/p/2713624",
  "dune": "https://www.buscalibre.com.co/libro-dune/9788497592208/p/2713624",

  // --- CATEGORÍA 3: TERROR ---
  "drácula": "https://www.buscalibre.com.co/libro-dracula/9788415618836/p/50197980",
  "el resplandor": "https://www.buscalibre.com.co/libro-el-resplandor/9788439724902/p/50197980",
  "frankenstein": "https://www.buscalibre.com.co/libro-frankenstein/9788439724902/p/50197980",
  "it": "https://www.buscalibre.com.co/libro-it/9788439724902/p/50197980",

  // --- CATEGORÍA 4: COMEDIA ---
  "sin noticias de gurb": "https://m.media-amazon.com/images/I/71u969HwFpL._SL1500_.jpg",
  "la importancia de llamarse ernesto": "https://m.media-amazon.com/images/I/71yLzSOnVWL._SL1500_.jpg",
  "guía del autoestopista galáctico": "https://m.media-amazon.com/images/I/81XmCFr7LwL._SL1500_.jpg",

  // --- CATEGORÍA 5: ROMANCE ---
  "orgullo y prejuicio": "https://m.media-amazon.com/images/I/81wL0-r0IOL._SL1500_.jpg",
  "bajo la misma estrella": "https://m.media-amazon.com/images/I/817vK4rZlhL._SL1500_.jpg",
  "yo antes de ti": "https://m.media-amazon.com/images/I/81bS8eC8xGL._SL1500_.jpg",
  "cumbres borrascosas": "https://m.media-amazon.com/images/I/818Z47v36FL._SL1500_.jpg",

  // --- CATEGORÍA 6: FANTASÍA ---
  "el señor de los anillos": "https://m.media-amazon.com/images/I/81Z0Yn2H+AL._SL1500_.jpg",
  "harry potter y la piedra filosofal": "https://m.media-amazon.com/images/I/81YOuOGFCJL._SL1500_.jpg",
  "el hobbit": "https://m.media-amazon.com/images/I/710vvXG96vL._SL1500_.jpg",
  "el nombre del viento": "https://m.media-amazon.com/images/I/918u8FvInSL._SL1500_.jpg",

  // --- CATEGORÍA 7: DRAMA ---
  "la casa de bernarda alba": "https://m.media-amazon.com/images/I/81L8E7XpYvL._SL1500_.jpg",
  "crimen y castigo": "https://m.media-amazon.com/images/I/716vX0y9SXL._SL1500_.jpg",
  "el retrato de dorian gray": "https://m.media-amazon.com/images/I/8186P+oV-vL._SL1500_.jpg",
  "la metamorfosis": "https://m.media-amazon.com/images/I/718tCInXvML._SL1500_.jpg",

  // --- CATEGORÍA 8: FILOSOFÍA ---
  "meditaciones": "https://m.media-amazon.com/images/I/71pX7K6GZYL._SL1500_.jpg",
  "así habló zaratustra": "https://m.media-amazon.com/images/I/81-N5bZ68yL._SL1500_.jpg",
  "el mito de sísifo": "https://m.media-amazon.com/images/I/71eS1W6XpNL._SL1500_.jpg",
  "el anticristo": "https://m.media-amazon.com/images/I/71u96V2y64L._SL1500_.jpg"
};

// Generador de portadas de respaldo elegantes en SVG si el título no coincide
const obtenerImagenLibro = (libro) => {
  if (libro.imagenUrl) return libro.imagenUrl;
  
  const tituloClean = libro.titulo?.toLowerCase().trim();
  if (PORTADAS_PREDEFINIDAS[tituloClean]) {
    return PORTADAS_PREDEFINIDAS[tituloClean];
  }
  
  // Si no tiene portada, se genera un SVG estilizado dinámico en vez de un placeholder feo
  const colores = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#ef4444"];
  const colorFondo = colores[(libro.categoriaId || 1) % colores.length];
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"><rect width="200" height="300" fill="${encodeURIComponent(colorFondo)}"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="white">${encodeURIComponent(libro.titulo?.substring(0, 20) || "Libro")}</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23ddd" font-style="italic">${encodeURIComponent(libro.autor || "Alquimia")}</text></svg>`;
};

export const Library = () => {
  const [libros, setLibros] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODOS"); // Filtro de categoría
  const [currentPage, setCurrentPage] = useState(1); // Control de paginación
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const librosPorPagina = 10;
  const credentialsBase64 = btoa("admin:admin123");

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito_alquimia");
    return guardado ? JSON.parse(guardado) : [];
  });

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

  // Cada que se busque o cambie la categoría, reiniciamos a la página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoriaSeleccionada]);

  const agregarAlCarrito = (libro) => {
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

    const yaExiste = carrito.find(item => item.id === libro.id);
    if (yaExiste) {
      return Swal.fire({
        title: "Ya en el carrito",
        text: "Este libro ya fue seleccionado.",
        icon: "info",
        toast: true,
        position: "top-end",
        timer: 1500,
        showConfirmButton: false
      });
    }

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

  // --- FILTRADO COMBINADO (Buscador + Categoría) ---
  const librosFiltrados = libros.filter((libro) => {
    const coincideTitulo = libro.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === "TODOS" || libro.categoriaId === Number(categoriaSeleccionada);
    return coincideTitulo && coincideCategoria;
  });

  // --- LÓGICA DE PAGINACIÓN (10 en 10) ---
  const indiceUltimoLibro = currentPage * librosPorPagina;
  const indicePrimerLibro = indiceUltimoLibro - librosPorPagina;
  const librosPaginaActual = librosFiltrados.slice(indicePrimerLibro, indiceUltimoLibro);
  const totalPaginas = Math.ceil(librosFiltrados.length / librosPorPagina);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        
        <HeaderBarraNavegacion 
          isLoggedIn={!!localStorage.getItem("user_session")} 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Botón flotante del carrito */}
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
          
          {/* BARRA DE FILTRADO POR CATEGORÍAS */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIAS_LISTA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-5 py-2 rounded-full font-semibold transition-all shadow-md text-sm border ${
                  categoriaSeleccionada === cat.id
                    ? "bg-[#ff3399] text-white border-[#ff3399] scale-105 shadow-[0_0_12px_rgba(255,51,153,0.5)]"
                    : "bg-gray-900/80 text-gray-300 border-gray-700 hover:border-indigo-400 hover:text-white"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* GRID DE LIBROS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {librosPaginaActual.map((libro) => (
              <div
                key={libro.id}
                className="bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition shadow-2xl flex flex-col justify-between"
              >
                {/* Contenedor de la Imagen con fix de imagen rota */}
                <div className="bg-white p-4 h-64 flex items-center justify-center overflow-hidden">
                  <img
                    src={obtenerImagenLibro(libro)} 
                    alt={libro.titulo}
                    className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // Fallback inmediato si la url externa falla
                      e.target.src = "https://via.placeholder.com/150?text=Alquimia+Literaria";
                    }}
                  />
                </div>

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

          {/* MENSAJE DE ESPERA SI ESTÁ VACÍO */}
          {librosFiltrados.length === 0 && (
            <div className="text-center text-gray-400 mt-12 text-lg bg-gray-900/40 py-8 rounded-xl border border-gray-800">
              No se encontraron libros en esta categoría o con ese nombre.
            </div>
          )}

          {/* SECCIÓN DE PAGINACIÓN COMPLETA (Solo renderiza si hay más de 1 página) */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 bg-gray-900/50 w-fit mx-auto px-4 py-2 rounded-full border border-gray-800">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm bg-transparent font-bold text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                ⬅️ Anterior
              </button>

              <span className="text-white text-sm font-medium">
                Página <span className="text-[#ff3399] font-bold">{currentPage}</span> de {totalPaginas}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPaginas))}
                disabled={currentPage === totalPaginas}
                className="px-4 py-2 text-sm bg-transparent font-bold text-indigo-400 hover:text-indigo-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente ➡️
              </button>
            </div>
          )}
        </main>

        <Footer />

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