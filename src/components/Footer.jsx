import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0A1045] to-[#4B2E2A] px-6 md:px-16 lg:px-28 py-10 border-t-4 border-[rgba(255,0,221,0.6)]">
      {/* Contenedor principal en cuadrícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Sobre nosotros */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[--color-gris]">Sobre nosotros</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Somos una plataforma que conecta lectores con historias.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[--color-gris]">Enlaces rápidos</h2>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              <Link to="/Library" className="transition-colors text-[--color-secundario] hover:text-cyan-400 hover:underline">
                Librería
              </Link>
            </li>
            <li>
              <Link to="/Home" className="transition-colors text-[--color-secundario] hover:text-cyan-400 hover:underline">
                Inicio
              </Link>
            </li>
          </ul>
        </div>

        {/* Síguenos */}
        <div className="space-y-3 sm:col-span-2 md:col-span-1">
          <h2 className="text-lg font-bold text-[--color-gris]">Síguenos</h2>
          {/* Se vuelve cuadrícula de 2 columnas en móviles y fila en pantallas medianas */}
          <ul className="grid grid-cols-2 gap-4 sm:flex sm:space-x-6 sm:gap-0 text-sm md:text-base">
            <li>
              <a className="flex items-center space-x-2 text-[--color-secundario] hover:text-cyan-400 transition-colors" href="https://www.facebook.com/josue.restrepo.790" target="_blank" rel="noreferrer">
                <FaFacebookF className="text-blue-500 shrink-0" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 text-[--color-secundario] hover:text-cyan-400 transition-colors" href="https://x.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="text-gray-400 shrink-0" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 text-[--color-secundario] hover:text-cyan-400 transition-colors" href="https://www.instagram.com/josue.restrepo/" target="_blank" rel="noreferrer">
                <FaInstagram className="text-pink-500 shrink-0" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a className="flex items-center space-x-2 text-[--color-secundario] hover:text-cyan-400 transition-colors" href="https://www.tiktok.com/@josuerestrepo1" target="_blank" rel="noreferrer">
                <FaTiktok className="text-white shrink-0" />
                <span>TikTok</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-600/50 pt-6 text-gray-400 text-xs md:text-sm text-center mt-10">
        <p>© 2026 Josue y sus tres santiagos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;