import React from 'react';
import { Link } from 'react-router-dom';

const ComunidadSplit = () => {
  return (
    <section className="w-full min-h-screen relative z-10 overflow-hidden bg-[#1a0f0a] flex items-stretch border-none  ">
      
      {/* 
        FONDO GENERAL DE LA SECCIÓN: Dividido en 2 con CSS puro para que encaje con tu boceto.
        - De 0% a 50%: Es completamente Azul Sólido (#0A1045).
        - De 50% a 100%: Es transparente para que se vean los cafés individuales abajo.
      */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0A1045] 50%, transparent 50%] z-10 pointer-events-none"></div>

      {/* CONTENEDOR DE LAS DOS COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full relative z-20">
        
        {/* COLUMNA IZQUIERDA: Formulario */}
        {/* 
          Usamos un degradado interno de fondo: 
          Arriba (0% a 50%) es transparente para dejar ver el azul global.
          Abajo (50% a 100%) se pinta con tu color café oscuro original (#160c08).
        */}
        <div className="p-12 md:p-20 flex flex-col justify-center space-y-8 relative pt-32 lg:pt-20 bg-gradient-to-b from-transparent 50%, #160c08 50%]">
          <div className="space-y-4">
            <span className="text-[#00C2D1] text-xs font-bold tracking-[0.2em] uppercase block">
              El club de las almas lectoras
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Únete a la <br />
              <span className="text-[#ED33B9]">Comunidad</span>
            </h2>
            <p className="text-white/70 font-light text-sm md:text-base max-w-md">
              Registra tu cuenta en nuestra bitácora para guardar tu progreso, solicitar préstamos activos y debatir con otros alquimistas.
            </p>
          </div>

          <div className="w-full max-w-md space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-[#ED33B9] text-white text-center px-10 py-4 rounded-xl font-black text-base hover:bg-[#c22495] transition-all duration-300 w-full sm:w-auto shadow-lg">
                Crear Cuenta
              </Link>
              <Link to="/library" className="border border-white/20 text-white text-center px-10 py-4 rounded-xl font-black text-base hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
                Explorar Primero
              </Link>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Reseñas */}
        {/* 
          Igual que el izquierdo:
          Arriba (0% a 50%) transparente para que se vea el azul.
          Abajo (50% a 100%) se pinta con tu café medio original (#21120c).
        */}
        <div className="relative hidden lg:flex flex-col justify-center p-16 overflow-hidden border-l border-white/5 pt-32 lg:pt-20 bg-gradient-to-b from-transparent 50%, #21120c 50%]">
          {/* Resplandor decorativo sutil en el fondo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,51,185,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          
          <div className="space-y-6 max-w-md relative z-10 mx-auto w-full">
            <div className="bg-[#1a0f0a]/90 p-6 rounded-2xl border border-white/5 shadow-2xl transition-transform duration-300 hover:-translate-y-1">
              <p className="text-white/80 italic text-sm font-light">"El catálogo de terror es una joya absoluta. Terminé de leer mi segundo libro esta semana de manera impecable."</p>
              <span className="text-[#00C2D1] text-xs font-semibold block mt-3 tracking-wider">@lector_alquimista</span>
            </div>
            <div className="bg-[#1a0f0a]/90 p-6 rounded-2xl border border-white/5 shadow-2xl translate-x-6 transition-transform duration-300 hover:-translate-y-1">
              <p className="text-white/80 italic text-sm font-light">"La interfaz te sumerge por completo en la lectura. La mejor biblioteca digital que he usado."</p>
              <span className="text-[#ED33B9] text-xs font-semibold block mt-3 tracking-wider">@sofia_books</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComunidadSplit;