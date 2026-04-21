import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// RECIBIMOS las props para controlar la visibilidad
export const Cart = ({ isOpen, onClose, productos, setProductos }) => {
  
  // SI NO ESTÁ ABIERTO, NO RENDERIZA NADA
  if (!isOpen) return null;

  const eliminarLibro = (id) => {
    const nuevoCarrito = productos.filter(item => item.id !== id);
    setProductos(nuevoCarrito);
    localStorage.setItem('carrito_alquimia', JSON.stringify(nuevoCarrito));
    Swal.fire({ 
      title: 'Eliminado',
      text: 'El libro salió del carrito',
      icon: 'info',
      timer: 1000,
      showConfirmButton: false
      });
  };

  const calcularTotal = () => {
    return productos.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const finalizarCompra = () => {
    Swal.fire({
      title: '¡Transmutacion Exitosa!',
      text: 'Tus libros se han convertido en conocimiento. ¡Gracias por tu compra!',
      icon: 'success',
      confirmButtonColor: '#4F46E5',
      background: '#111827',
      color: '#fff'

    });
    
    setProductos([]);
    localStorage.removeItem('carrito_alquimia');
    onClose(); // Cerramos al terminar
  };

return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay: Fondo oscuro que se puede clickear para cerrar */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        {/* El panel que desliza */}
        <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out">
          <div className="flex h-full flex-col bg-white shadow-2xl">
            
            {/* Header del carrito */}
            <div className="flex items-center justify-between bg-indigo-900 p-6">
              <h2 className="text-xl font-bold text-white">Tu Carrito de libros :) ({productos.length})</h2>
              <button onClick={onClose} className="text-white hover:rotate-90 transition-transform text-2xl">✕</button>
            </div>

            {/* Lista de productos con scroll suave */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {productos.length === 0 ? (
                <div className="text-center mt-20 opacity-40">
                  <p className="text-4xl mb-4">📖</p>
                  <p>Aún no has descubierto ningún libro.</p>
                </div>
              ) : (
                productos.map((item) => (
                  <div key={item.id} className="group flex items-center gap-4 border-b pb-4 border-gray-100">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 p-2 w-16 h-20">
                       <img src={item.image} className="object-contain w-full h-full group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.title}</h4>
                      <p className="text-indigo-600 font-black">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => eliminarLibro(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer con el total */}
            {productos.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p className="text-2xl font-black text-indigo-700">${calcularTotal()}</p>
                </div>
                <button 
                  onClick={finalizarCompra}
                  className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Finalizar transaccion :))
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};