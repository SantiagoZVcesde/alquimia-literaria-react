import React from 'react';
import { Link } from 'react-router-dom';

const LibroSemana = () => {
  return (
    <section className="w-full min-h-screen py-24 px-6 md:px-12 bg-gradient-to-b from-[#050826] to-[#0A1045] text-white relative z-10 overflow-hidden flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Lado Izquierdo: Portada Flotante */}
        <div className="flex justify-center order-2 md:order-1">
          <div className="relative group max-w-[280px] md:max-w-[320px] animate-float-book">
            <img 
              src="/img/libros/Dracula.jpg" 
              alt="Libro de la semana" 
              className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Lado Derecho: Información */}
        <div className="flex flex-col space-y-6 order-1 md:order-2 text-center md:text-left">
          <div className="inline-block self-center md:self-start bg-[#ED33B9]/10 text-[#ED33B9] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#ED33B9]/20">
            Recomendado de la semana
          </div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Drácula <span className="text-[#00C2D1]">Edición Premium</span>
          </h3>
          <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
            Adéntrate en las sombras de Transilvania a través de esta obra maestra del terror gótico. Descubre las crónicas malditas del conde más famoso de la literatura en una experiencia completamente digitalizada y optimizada para la comunidad.
          </p>
          <div className="pt-4">
            <Link to="/library" className="inline-block bg-white text-[#0A1045] font-black px-10 py-4 rounded-xl shadow-lg hover:bg-[#00C2D1] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
              Comenzar Lectura Express
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LibroSemana;