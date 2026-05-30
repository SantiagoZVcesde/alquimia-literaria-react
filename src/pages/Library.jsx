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
  "el aleph": "https://images.cdn3.buscalibre.com/fit-in/360x360/ab/b1/abb1e18f6c89a6dd0f021a63514759a9.jpg",
  "cien años de soledad": "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
  "meridiano de sangre": "https://images.cdn3.buscalibre.com/fit-in/360x360/77/89/778972fb44bf8d43d43971402050f1b6.jpg",
  "el gran gatsby": "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
  "crónica de una muerte anunciada": "https://www.bibliotecanacional.gov.co/es-co/colecciones/biblioteca-digital/gaboteca/Imagenes/DOC092515-09252015123109_P%C3%A1gina_5.jpg",
  "pedro páramo": "https://images.cdn1.buscalibre.com/fit-in/360x360/1a/d7/1ad769b304eb759a61880340921bc82d.jpg",

  // --- CATEGORÍA 2: CIENCIA FICCIÓN ---
  "1984": "https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg",
  "un mundo feliz": "https://images.cdn3.buscalibre.com/fit-in/360x360/7b/ff/7bff931f0d397d6d3138cd6f398e1305.jpg",
  "fahrenheit 451": "https://images.cdn2.buscalibre.com/fit-in/360x360/9e/39/9e3949c949c4abc1f69e2cce613532b1.jpg",
  "dune": "https://images.cdn3.buscalibre.com/fit-in/360x360/f4/65/f465a84545d7a6f4109ae2922be1befa.jpg",

  // --- CATEGORÍA 3: TERROR ---
  "drácula": "https://images.cdn3.buscalibre.com/fit-in/360x360/76/dc/76dc4380329a0f6f3d38ae712e5407ac.jpg",
  "el resplandor": "https://images.cdn3.buscalibre.com/fit-in/360x360/ca/73/ca7388689e9fdfe664d56c6ff39d439b.jpg",
  "frankenstein": "https://images.cdn1.buscalibre.com/fit-in/360x360/15/54/1554d01d226679a6e8402fad007b31a6.jpg",
  "it": "https://m.media-amazon.com/images/I/41utxPy1SkL._SY445_SX342_ML2_.jpg",

  // --- CATEGORÍA 4: COMEDIA ---
  "sin noticias de gurb": "https://pdlibroscol.cdnstatics2.com/usuaris/libros/thumbs/7ac8b94a-48a9-4c4c-bb63-453cf9ce7ba8/d_1200_1200/156797_portada_sin-noticias-de-gurb_eduardo-mendoza_201612011800.webp",
  "la importancia de llamarse ernesto": "https://m.media-amazon.com/images/I/41OJGgCNTOL._SY445_SX342_FMwebp_.jpg",
  "guía del autoestopista galáctico": "https://images.cdn1.buscalibre.com/fit-in/360x360/0a/92/0a92b86262098e5f21ee84c81bba6572.jpg",
  "el principito": "https://images.cdn1.buscalibre.com/fit-in/360x360/ea/1f/ea1fc691874fa49ce341d876a981e2c.jpg",

// --- CATEGORÍA 5: ROMANCE ---
  "orgullo y prejuicio": "https://images.cdn3.buscalibre.com/fit-in/360x360/49/6c/496cc2d26070c4f19d7f8e93a09274ac.jpg",
  "bajo la misma estrella": "https://images.cdn3.buscalibre.com/fit-in/360x360/15/f4/15f40f6f57bebd15941e38932203f904.jpg",
  "yo antes de ti": "https://images.cdn2.buscalibre.com/fit-in/360x360/9d/b3/9db3c74116f5f8c7e2841438c72ef1f6.jpg",
  "cumbres borrascosas": "https://images.cdn1.buscalibre.com/fit-in/360x360/85/16/8516d825f44f192528d673955df2bc99.jpg",

  // --- CATEGORÍA 6: FANTASÍA ---
  "el señor de los anillos": "https://images.cdn3.buscalibre.com/fit-in/360x360/db/09/db099c3235b90492cd39b8c59f32a7b5.jpg",
  "harry potter y la piedra filosofal": "https://m.media-amazon.com/images/I/81YOuOGFCJL._SL1500_.jpg",
  "el hobbit": "https://images.cdn3.buscalibre.com/fit-in/360x360/56/cf/56cfab9ef05de6b1f648fb388acfde61.jpg",
  "el nombre del viento": "https://images.cdn3.buscalibre.com/fit-in/360x360/a7/90/a790dff70defe5c61b66fd73716b6e30.jpg",

  // --- CATEGORÍA 7: DRAMA ---
  "la casa de bernarda alba": "https://images.cdn1.buscalibre.com/fit-in/360x360/b3/57/b3571946b92e30494dbfb8a5d70d7e9b.jpg",
  "crimen y castigo": "https://ima1.jpg",
  "el retrato de dorian gray": "https://images.cdn2.buscalibre.com/fit-in/360x360/91/18/9118645bef1e527a3e1f14e7187ac89e.jpg",
  "la metamorfosis": "https://images.cdn1.buscalibre.com/fit-in/360x360/fb/6e/fb6e8ba8d86c40b01299f17e294ef509.jpg",

  // --- CATEGORÍA 8: FILOSOFÍA ---
  "meditaciones": "https://pdlibroscol.cdnstatics2.com/usuaris/libros/thumbs/9e089630-5263-4d0c-9abd-4907442b41ad/d_1200_1200/429925_portada_meditaciones_marco-aurelio_202604200229.webp",
  "así habló zaratustra": "https://images.cdn3.buscalibre.com/fit-in/360x360/00/f2/00f24a15ea0912393f9c8fab7d5d81ac.jpg",
  "el mito de sísifo": "https://images.cdn2.buscalibre.com/fit-in/360x360/6b/b5/6bb542cf8655b23f2303124ea895ab7d.jpg",
  "el anticristo": "https://images.cdn1.buscalibre.com/fit-in/360x360/3d/88/3d8841782acc38dcf6bae7b4ae3639f6.jpg"
};

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