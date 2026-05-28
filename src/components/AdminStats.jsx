import React, { useState, useEffect } from "react";
import { end_points } from "../services/api";

const AdminStats = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const credentialsBase64 = btoa("admin:admin123");

useEffect(() => {
  // 1. Fetch de Libros
  fetch(end_points.books, {
    method: "GET",
    headers: { "Authorization": `Basic ${credentialsBase64}` }
  })
    .then((res) => res.json())
    .then((data) => setTotalBooks(data.length || 0))
    .catch((err) => console.error("Error cargando métricas de libros:", err));

  // 2. Fetch de Usuarios
  fetch(end_points.users, {
    method: "GET",
    headers: { "Authorization": `Basic ${credentialsBase64}` }
  })
    .then((res) => res.json())
    .then((data) => setTotalUsers(data.length || 0))
    .catch((err) => console.error("Error cargando métricas de usuarios:", err));
    
}, [credentialsBase64]); // <-- Agregada la dependencia aquí

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Estadísticas de la Plataforma</h3>
        <p className="text-slate-400 text-sm">Resumen global de los datos de la Alquimia Literaria</p>
      </div>

      {/* FILA DE TARJETAS INDICADORAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tarjeta 1: Total Libros */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between shadow-xl">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Volumen de Catálogo</p>
            <h4 className="text-4xl font-extrabold text-white tracking-tight">{totalBooks}</h4>
            <p className="text-blue-400/60 text-xs mt-2">Libros cargados en base de datos</p>
          </div>
          <div className="text-4xl bg-blue-600/10 p-4 rounded-xl text-blue-500 border border-blue-500/10">📚</div>
        </div>

        {/* Tarjeta 2: Total Usuarios */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between shadow-xl">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Usuarios Registrados</p>
            <h4 className="text-4xl font-extrabold text-white tracking-tight">{totalUsers}</h4>
            <p className="text-indigo-400/60 text-xs mt-2">Clientes y administradores activos</p>
          </div>
          <div className="text-4xl bg-indigo-600/10 p-4 rounded-xl text-indigo-500 border border-indigo-500/10">👥</div>
        </div>

      </div>

      {/* CAJA EN BLANCO PRO - ACCIÓN FUTURA */}
      <div className="bg-slate-950/20 border border-dashed border-slate-800 p-10 rounded-2xl text-center">
        <p className="text-slate-500 text-sm italic">
          💡 Tip de Expansión: Cuando crees tu endpoint de transacciones, aquí mapearemos las gráficas lineales de ingresos mensuales y los libros más alquilados utilizando Chart.js.
        </p>
      </div>
    </div>
  );
};

export default AdminStats;