
import { Link } from "react-router-dom";
import {useState} from "react"

function HeaderBarraNavegacion() {
const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscar:", search);
    // aquí luego puedes filtrar libros o redirigir
  };
          
        

  return (
    <nav className=" bg-(--color-primario) text-(--color-secundario) px-6 py-4 flex items-center justify-between">
      {/* Logo */}
       <Link to="/home" className="hover:text-cyan-800">
         <h1 className="text-xl font-bold">Alquimia.literaria</h1>
       </Link>
      

      {/* Barra de búsqueda */}
      <form 
        onSubmit={handleSearch}
        className="flex items-center bg-gray-800 rounded overflow-hidden"
      >
        <input
          type="text"
          placeholder="Buscar libros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent px-4 py-2 outline-none text-white w-64"
        />
        <button className="bg-(--color-primario) border border-(--color-secundario) px-4 py-2 hover:bg-(--color-secundario)">
          Buscar
        </button>
      </form>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/Home" className="hover:text-cyan-400">inicio</Link>
        <Link to="/Library" className="hover:text-cyan-400 ">Libreria</Link>
      </div>
    </nav>
  );
}

export default HeaderBarraNavegacion;