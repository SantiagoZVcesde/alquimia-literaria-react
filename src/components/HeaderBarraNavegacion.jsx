import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// RECIBIMOS las props globales para controlar la búsqueda de la librería
function HeaderBarraNavegacion({ isLoggedIn, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscar ejecutado para:", searchTerm);
  };

  // Función para borrar la sesión y devolverlo al Login
  const handleLogout = () => {
    localStorage.removeItem("user_session");
    Swal.fire({
      title: "Sesión Cerrada",
      text: "Vuelve pronto a Alquimia Literaria",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end"
    });
    navigate("/Login");
  };

  return (
    <nav className="bg-gradient-to-b from-[#0A1045] to-[#4B2E2A] text-[#fffef0] px-6 py-4 flex flex-col md:flex-row items-center justify-between w-full border-b-4 border-[#4B2E2A]">
      
      {/* Logo */}
      <Link to="/home" className="hover:text-[#ff3399] transition-colors">
        <h1 className="text-2xl font-bold tracking-tighter">
          Alquimia<span className="text-[#1e40ff]">.</span>literaria
        </h1>
      </Link>

      {/* Barra de búsqueda conectada con el estado de Library */}
      <form 
        onSubmit={handleSearch}
        className="flex items-center bg-[#1a1a2e] rounded-md overflow-hidden border border-[#4b2c85] my-4 md:my-0 focus-within:border-[#1e40ff] transition-all"
      >
        <input
          type="text"
          placeholder="Buscar libros..."
          // Usamos la prop que viene de la librería para leer el valor
          value={searchTerm || ""}
          // Cada que cambie, actualizamos el estado de la librería en tiempo real
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent px-4 py-2 outline-none text-[#fffef0] w-64 placeholder:text-gray-500"
        />
        <button 
          type="submit"
          className="bg-[#1e40ff] px-6 py-2 text-white font-semibold hover:bg-[#ff7700] transition-colors"
        >
          Buscar
        </button>
      </form>

      {/* Links Dinámicos */}
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
        <Link to="/Library" className="hover:text-[#ff3399] transition-colors font-medium">
          Librería
        </Link>
        
        {!isLoggedIn ? (
          /* SI NO ESTÁ LOGUEADO: Muestra ingresar y registro */
          <>
            <Link to="/Login" className="hover:text-[#ff7700] transition-colors font-medium">
              Iniciar sesión
            </Link>
            
            <Link 
              to="/Register" 
              className="border-2 border-[#ff3399] px-4 py-1 rounded-full text-[#ff3399] hover:bg-[#ff3399] hover:text-white transition-all shadow-[0_0_10px_rgba(255,51,153,0.3)]"
            >
              Registrarse
            </Link>
          </>
        ) : (
          /* SI SÍ ESTÁ LOGUEADO: Muestra únicamente el botón de salir */
          <button 
            onClick={handleLogout}
            className="border-2 border-red-500 px-4 py-1 rounded-full text-red-400 hover:bg-red-500 hover:text-white transition-all font-medium uppercase text-xs tracking-wider shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default HeaderBarraNavegacion;