import { Link } from "react-router-dom";
import { useState } from "react";

function HeaderBarraNavegacion() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscar:", search);
  };

  return (
    /* Fondo: Negro profundo 
       Texto: Blanco crema para evitar fatiga visual
    */
<nav className="bg-gradient-to-b  from-[#0A1045] to-[#4B2E2A] text-[#fffef0] px-6 py-4 flex flex-col md:flex-row items-center justify-between w-full border-b-4 border-[#4B2E2A]">
  
  {/* Logo */}
  <Link to="/home" className="hover:text-[#ff3399] transition-colors">
    <h1 className="text-2xl font-bold tracking-tighter">
      Alquimia<span className="text-[#1e40ff]">.</span>literaria
    </h1>
  </Link>

  {/* Barra de búsqueda */}
  <form 
    onSubmit={handleSearch}
    className="flex items-center bg-[#1a1a2e] rounded-md overflow-hidden border border-[#4b2c85] my-4 md:my-0 focus-within:border-[#1e40ff] transition-all"
  >
    <input
      type="text"
      placeholder="Buscar libros..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-transparent px-4 py-2 outline-none text-[#fffef0] w-64 placeholder:text-gray-500"
    />
    <button className="bg-[#1e40ff] px-6 py-2 text-white font-semibold hover:bg-[#ff7700] transition-colors">
      Buscar
    </button>
  </form>

  {/* Links */}
  <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
    <Link to="/Library" className="hover:text-[#ff3399] transition-colors font-medium">
      Librería
    </Link>
    
    <Link to="/Login" className="hover:text-[#ff7700] transition-colors font-medium">
      Iniciar sesión
    </Link>
    
    <Link 
      to="/Register" 
      className="border-2 border-[#ff3399] px-4 py-1 rounded-full text-[#ff3399] hover:bg-[#ff3399] hover:text-white transition-all shadow-[0_0_10px_rgba(255,51,153,0.3)]"
    >
      Registrarse
    </Link>
  </div>
</nav>
  );
}

export default HeaderBarraNavegacion;