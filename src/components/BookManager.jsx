import React, { useState, useEffect, useCallback } from "react";
import { end_points } from "../services/api";
import Swal from "sweetalert2";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estado para capturar los campos del formulario del libro
  const [currentBook, setCurrentBook] = useState({
    id: null,
    titulo: "",
    autor: "",
    precio: "",
    imagenUrl: "",
    sinopsis: ""
  });

  const credentialsBase64 = btoa("admin:admin123");

  // --- 1. DEFINICIÓN DE FETCHBOOKS (Protegida con useCallback) ---
  const fetchBooks = useCallback(() => {
    fetch(end_points.books, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${credentialsBase64}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer catálogo");
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error cargando libros admin:", err));
  }, [credentialsBase64]); // Solo se recrea si las credenciales cambian

  // --- 2. HOOK USEEFFECT (Con todas sus dependencias felices) ---
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // --- 3. ELIMINAR (DELETE) UN LIBRO ---
  const handleDelete = (id, titulo) => {
    Swal.fire({
      title: `¿Eliminar "${titulo}"?`,
      text: "Esta acción no se puede deshacer en la base de datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#374151",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${end_points.books}/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Basic ${credentialsBase64}` }
        })
          .then((res) => {
            if (!res.ok) throw new Error();
            Swal.fire("¡Borrado!", "El libro ha sido eliminado.", "success");
            fetchBooks(); // Recargar tabla
          })
          .catch(() => Swal.fire("Error", "No se pudo eliminar el libro.", "error"));
      }
    });
  };

  // --- 4. PREPARAR FORMULARIO PARA EDITAR O CREAR ---
  const openModal = (libro = null) => {
    if (libro) {
      setIsEditing(true);
      setCurrentBook(libro); // Carga los datos del libro a editar
    } else {
      setIsEditing(false);
      setCurrentBook({ id: null, titulo: "", autor: "", precio: "", imagenUrl: "", sinopsis: "" });
    }
    setIsModalOpen(true);
  };

  // --- 5. GUARDAR (POST / PUT) EN BACKEND ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!currentBook.titulo || !currentBook.autor || !currentBook.precio) {
      return Swal.fire("Campos vacíos", "Título, Autor y Precio son requeridos", "warning");
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${end_points.books}/${currentBook.id}` : end_points.books;

    fetch(url, {
      method: method,
      headers: {
        "Authorization": `Basic ${credentialsBase64}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentBook)
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        Swal.fire("¡Éxito!", `Libro ${isEditing ? "actualizado" : "creado"} correctamente.`, "success");
        setIsModalOpen(false);
        fetchBooks(); // Refrescar la lista de la tabla
      })
      .catch(() => Swal.fire("Error", "Hubo un fallo al procesar la solicitud.", "error"));
  };

  return (
    <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Catálogo de Libros</h3>
          <p className="text-slate-400 text-sm">Gestiona las existencias en tiempo real</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all shadow-lg shadow-blue-500/20"
        >
          + Agregar Nuevo Libro
        </button>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left border-collapse bg-slate-950/60">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Portada</th>
              <th className="p-4">Título</th>
              <th className="p-4">Autor</th>
              <th className="p-4">Precio</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
            {books.map((libro) => (
              <tr key={libro.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4">
                  <img
                    src={libro.imagenUrl || "https://via.placeholder.com/50?text=No+Cover"}
                    alt={libro.titulo}
                    className="w-10 h-14 object-contain bg-white rounded"
                  />
                </td>
                <td className="p-4 font-semibold text-white max-w-xs truncate">{libro.titulo}</td>
                <td className="p-4 text-slate-400">{libro.autor}</td>
                <td className="p-4 text-blue-400 font-medium">${Number(libro.precio).toLocaleString("es-CO")} COP</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => openModal(libro)}
                    className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-amber-500 hover:text-black transition-all"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(libro.id, libro.titulo)}
                    className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-400 hover:text-white transition-all"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL PARA CREAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <h4 className="text-xl font-bold text-white mb-4">
              {isEditing ? "📝 Editar Detalles del Libro" : "📚 Registrar Nuevo Libro"}
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Título del Libro *</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-blue-500 transition-all text-sm"
                  value={currentBook.titulo}
                  onChange={(e) => setCurrentBook({ ...currentBook, titulo: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1">Autor *</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-blue-500 transition-all text-sm"
                    value={currentBook.autor}
                    onChange={(e) => setCurrentBook({ ...currentBook, autor: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1">Precio (COP) *</label>
                  <input
                    type="number"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-blue-500 transition-all text-sm"
                    value={currentBook.precio}
                    onChange={(e) => setCurrentBook({ ...currentBook, precio: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">URL de la Imagen de Portada</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-blue-500 transition-all text-sm"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={currentBook.imagenUrl}
                  onChange={(e) => setCurrentBook({ ...currentBook, imagenUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1">Sinopsis / Descripción</label>
                <textarea
                  rows="3"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white outline-none focus:border-blue-500 transition-all text-sm resize-none"
                  value={currentBook.sinopsis}
                  onChange={(e) => setCurrentBook({ ...currentBook, sinopsis: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition-all shadow-lg"
                >
                  {isEditing ? "Guardar Cambios" : "Crear Libro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManager;