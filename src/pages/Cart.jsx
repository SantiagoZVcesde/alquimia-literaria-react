import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { end_points } from '../services/api';

export const Cart = ({ isOpen, onClose, productos, setProductos }) => {
  const [loading, setLoading] = useState(false);
  const credentialsBase64 = btoa("admin:admin123");

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
    return productos.reduce((total, item) => total + (item.precio || 0), 0);
  };

  const finalizarCompra = async () => {
    // 1. Validar la sesión del cliente
    const sessionStr = localStorage.getItem("user_session");
    if (!sessionStr) {
      return Swal.fire("Error", "No se encontró sesión activa. Por favor inicia sesión.", "error");
    }

    const userSession = JSON.parse(sessionStr);
    const clienteId = userSession.id; // ID del usuario logueado en tu app

    setLoading(true);

    try {
      // 2. Mapeamos cada libro del carrito a una promesa de fetch POST
      const peticionesCompras = productos.map((libro) => {
        const bodyCompra = {
          cantidad: 1, // Cantidad estándar por ítem
          clienteId: Number(clienteId),
          libroId: Number(libro.id),
          monto: Number(libro.precio),
          proveedor: "Alquimia Literaria S.A.S"
        };

        // Apunta dinámicamente a tu endpoint de compras/purchases
        return fetch(end_points.purchases || `${end_points.users.replace('/clientes', '')}/compras`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${credentialsBase64}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyCompra)
        }).then(res => {
          if (!res.ok) throw new Error(`Fallo al registrar el libro: ${libro.titulo}`);
          return res.json();
        });
      });

      // 3. Ejecutamos todos los POST en bloque
      await Promise.all(peticionesCompras);
      setLoading(false);
      
      Swal.fire({
        title: '¡Transmutación Exitosa!',
        text: 'Tus libros se han registrado en el sistema. ¡Gracias por tu compra!',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        background: '#111827',
        color: '#fff'
      });
      
      // Limpieza de estados y storage
      setProductos([]);
      localStorage.removeItem('carrito_alquimia');
      onClose();

    } catch (error) {
      setLoading(false);
      console.error("Error procesando la compra:", error);
      Swal.fire("Error en Transacción", "No se pudo sincronizar la compra con el backend en Render.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out">
          <div className="flex h-full flex-col bg-white shadow-2xl">
            
            <div className="flex items-center justify-between bg-indigo-900 p-6">
              <h2 className="text-xl font-bold text-white">Tu Carrito de libros :) ({productos.length})</h2>
              <button onClick={onClose} className="text-white hover:rotate-90 transition-transform text-2xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {productos.length === 0 ? (
                <div className="text-center mt-20 opacity-40">
                  <p className="text-4xl mb-4">📖</p>
                  <p>Aún no has descubierto ningún libro.</p>
                </div>
              ) : (
                productos.map((item) => (
                  <div key={item.id} className="group flex items-center gap-4 border-b pb-4 border-gray-100">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 p-2 w-16 h-20 flex items-center justify-center">
                       <img 
                        src={item.imagenUrl || "https://via.placeholder.com/150?text=Sin+Portada"} 
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform" 
                       />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.titulo}</h4>
                      <p className="text-indigo-600 font-black">${item.precio ? item.precio.toLocaleString("es-CO") : "0"} COP</p>
                    </div>
                    <button 
                      onClick={() => eliminarLibro(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors text-lg"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {productos.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p className="text-2xl font-black text-indigo-700">${calcularTotal().toLocaleString("es-CO")} COP</p>
                </div>
                <button 
                  onClick={finalizarCompra}
                  disabled={loading}
                  className={`w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Registrando en la BD..." : "Finalizar transaccion :))"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};