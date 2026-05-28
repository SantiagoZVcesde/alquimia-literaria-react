import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectAlert } from "../helpers/alerts";

// IMPORTACIÓN DE TUS SUBCOMPONENTES RECIÉN CREADOS
import AdminStats from "../components/Admin/AdminStats";
import BookManager from "../components/Admin/BookManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("stats"); // Controla qué pestaña renderizar
  const navigate = useNavigate();

  // 1. MEJORA: Inicializamos el estado leyendo el localStorage de una vez.
  // Así el componente nace con el nombre listo y evitamos el renderizado en cascada.
  const [adminName] = useState(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.nombre || "Admin";
    }
    return "";
  });

  // --- CONTROL DE SEGURIDAD INTERNO (Protección de Front) ---
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("user_session"));
    
    // Si la sesión no existe, o el rol no es ADMIN, lo saca soplado de acá
    if (!session || session.role !== "ADMIN" && session.rol !== "ADMIN") {
      redirectAlert("Acceso Restringido", "No cuentas con credenciales de Administrador.", "/Login", "error");
      navigate("/Library");
    }
  }, [navigate]); // Ya no depende de setAdminName, limpia el efecto por completo

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0604] to-[#04061a] text-white flex overflow-hidden">
      
      {/* SIDEBAR MENÚ */}
      <div className="w-64 bg-slate-950 p-6 flex flex-col justify-between border-r border-white/5 shadow-2xl z-20">
        <div>
          <div className="mb-8">
            <h2 className="text-lg font-black tracking-widest text-blue-500 uppercase">Alquimia Admin</h2>
            <div className="h-0.5 w-12 bg-blue-500 mt-1 rounded-full"></div>
          </div>
          
          <p className="text-xs text-slate-500 mb-6 font-medium">
            Operador: <span className="text-slate-200 font-bold">{adminName}</span>
          </p>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("stats")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "stats" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              📊 Estadísticas
            </button>
            <button 
              onClick={() => setActiveTab("books")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === "books" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              📚 CRUD de Libros
            </button>
          </nav>
        </div>

        {/* BOTÓN SALIDA */}
        <button 
          onClick={() => navigate("/Library")}
          className="w-full bg-slate-900/60 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800/80 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all"
        >
          Volver a Librería
        </button>
      </div>

      {/* CONTENEDOR DE CONTENIDO PRINCIPAL RE-RENDERIZABLE */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative z-10">
        {activeTab === "stats" ? (
          <AdminStats />
        ) : (
          <BookManager />
        )}
      </main>

    </div>
  );
};

export default AdminDashboard;