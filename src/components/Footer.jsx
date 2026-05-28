import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#160c08] via-[#0A1045]/90 to-[#050826] px-6 md:px-16 lg:px-28 py-14 border-t border-[#ED33B9]/30 shadow-[0_-15px_40px_rgba(237,51,185,0.15)] overflow-hidden">
      
      {/* Efecto de luz ambiental de fondo */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00C2D1]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#ED33B9]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        
        {/* Bloque 1: Branding / Sobre Nosotros (Toma 5 columnas) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-wider text-white uppercase">
              ALQUIMIA <span className="text-[#00C2D1]">LITERARIA</span>
            </span>
          </div>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light max-w-sm">
            Somos una plataforma diseñada para conectar mentes curiosas con historias extraordinarias, transformando la lectura digital en una experiencia mística.
          </p>
        </div>

        {/* Bloque 2: Enlaces Rápidos (Toma 3 columnas) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00C2D1]">
            Enlaces rápidos
          </h4>
          <ul className="space-y-2.5 text-sm md:text-base">
            <li>
              <Link to="/Home" className="text-white/70 hover:text-[#ED33B9] transition-all duration-300 flex items-center group">
                <span className="h-[1px] w-0 bg-[#ED33B9] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/Library" className="text-white/70 hover:text-[#ED33B9] transition-all duration-300 flex items-center group">
                <span className="h-[1px] w-0 bg-[#ED33B9] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                Librería
              </Link>
            </li>
          </ul>
        </div>

        {/* Bloque 3: Redes Sociales (Toma 4 columnas) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED33B9]">
            Redes de la Comunidad
          </h4>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <a 
              href="https://www.facebook.com/josue.restrepo.790" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-3 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/40 p-3 rounded-xl transition-all duration-300 group"
            >
              <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <FaFacebookF size={14} />
              </div>
              <span className="text-xs font-medium text-white/80 group-hover:text-white">Facebook</span>
            </a>

            <a 
              href="https://x.com/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-3 bg-white/5 hover:bg-neutral-800/60 border border-white/5 hover:border-white/30 p-3 rounded-xl transition-all duration-300 group"
            >
              <div className="bg-white/10 p-2 rounded-lg text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
                <FaTwitter size={14} />
              </div>
              <span className="text-xs font-medium text-white/80 group-hover:text-white">Twitter</span>
            </a>

            <a 
              href="https://www.instagram.com/josue.restrepo/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-3 bg-white/5 hover:bg-pink-600/20 border border-white/5 hover:border-pink-500/40 p-3 rounded-xl transition-all duration-300 group"
            >
              <div className="bg-pink-500/10 p-2 rounded-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                <FaInstagram size={14} />
              </div>
              <span className="text-xs font-medium text-white/80 group-hover:text-white">Instagram</span>
            </a>

            <a 
              href="https://www.tiktok.com/@josuerestrepo1" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-3 rounded-xl transition-all duration-300 group"
            >
              <div className="bg-white/5 p-2 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <FaTiktok size={14} />
              </div>
              <span className="text-xs font-medium text-white/80 group-hover:text-white">TikTok</span>
            </a>
          </div>
        </div>

      </div>

      {/* Línea inferior de Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-white/40 text-xs md:text-sm flex flex-col sm:flex-row justify-between items-center mt-12 gap-4 relative z-10">
        <p>© 2026 Alquimia Literaria. Todos los derechos reservados.</p>
        <p className="font-light text-[11px] tracking-widest text-white/20 uppercase">
          Hecho por Josué y sus tres Santiagos
        </p>
      </div>
    </footer>
  );
}

export default Footer;