import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Cart } from './Cart'; // Importamos el carrito como componente
import { API_CONFIG } from '../services/api';
// Importamos tu fondo. Asegúrate de que el nombre coincida con tu archivo
import fondoImg from '/public/fondo-alquimia.jpg';

export const Library = () => {
  const [libros, setLibros] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`)
      .then(res => res.json())
      .then(data => setLibros(data))
      .catch(err => {
        console.error("Error API:", err);
        Swal.fire('Error', 'No se pudieron cargar los libros. Intenta de nuevo más tarde.', 'error'); //Muestra alerta si falla la API (si no hay internet, por ejemplo)
      });

    const guardado = localStorage.getItem('carrito_alquimia');
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  const agregarAlCarrito = (libro) => {
    const nuevoCarrito = [...carrito, libro];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito_alquimia', JSON.stringify(nuevoCarrito));
    Swal.fire({
      title: '¡Agregado!',
      text: `"${libro.title}" se añadió a tu carrito.`,
      icon: 'success',
      timer: 1000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${fondoImg})`, backgroundColor: '#000' }} // Agregamos bg-color por si la imagen tarda en cargar
    >
      <div className="min-h-screen bg-black bg-opacity-70">
        
        <nav className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-90 border-b border-indigo-500 sticky top-0 z-40">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-bold flex items-center gap-2 transition"
          >
            🛒 Ver Carrito <span className="bg-white text-indigo-900 rounded-full px-2 text-sm">{carrito.length}</span>
          </button>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500">
            ALQUIMIA LITERARIA
          </h1>
        </nav>

        <main className="container mx-auto py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {libros.map((libro) => (
              <div key={libro.id} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500 transition shadow-2xl">
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  <img src={libro.image} alt={libro.title} className="max-h-full object-contain" />
                </div>
                <div className="p-5 flex flex-col justify-between h-48">
                  <h3 className="text-white font-bold line-clamp-2">{libro.title}</h3>
                  <p className="text-indigo-400 font-bold text-xl">${libro.price}</p>
                  <button 
                    onClick={() => agregarAlCarrito(libro)}
                    className="w-full bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white font-bold py-2 rounded"
                  >
                    + Añadir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* COMPONENTE CARRITO - Asegúrate de que las props coincidan con el archivo Cart.jsx */}
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