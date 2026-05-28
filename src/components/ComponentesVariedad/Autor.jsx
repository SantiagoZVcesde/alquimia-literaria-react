import React, { useState } from 'react';
import { createPortal } from 'react-dom'; // 👈 Importamos la herramienta para teletransportar el modal
import './Autor.css';

function Autor({ nombre, cover, descripcion, biografia, fechas, generos }) {
  // Estado para controlar si la biografía flotante está abierta
  const [isOpen, setIsOpen] = useState(false);

  // 1. EL MODAL IMPRESIONANTE AISLADO
  const modalHTML = isOpen && (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999, /* Fuerza superior absoluta sobre toda la web */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(3, 2, 10, 0.85)', /* Fondo oscuro místico uniforme */
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="animate-fadeIn"
      onClick={() => setIsOpen(false)} // Cierra al hacer clic en cualquier parte del fondo
    >
      {/* Tarjeta de Biografía Expandida */}
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-br from-[#0f0a1c] via-[#0A1045]/95 to-[#050826] border border-[#ED33B9]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(237,51,185,0.25)] flex flex-col md:flex-row transform scale-100 transition-transform duration-300 max-h-[90vh] md:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro de la info
      >
        
        {/* Botón de Cierre */}
        <button 
          className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED33B9] text-white flex items-center justify-center transition-all duration-300 text-sm font-bold border border-white/10 shadow-lg cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Columna Izquierda: Retrato */}
        <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden bg-[#1a0f0a] shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          <img 
            src={cover} 
            alt={nombre} 
            className="w-full h-full object-cover object-top filter contrast-115 brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f0a1c]/80 via-transparent to-transparent"></div>
        </div>

        {/* Columna Derecha: Contenido */}
        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto scrollbar-none">
          
          <div className="space-y-4">
            {/* Meta datos */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest text-[#00C2D1] uppercase">
              <span>{fechas || "Época Incierta"}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
              <span className="text-[#ED33B9]">{generos || "Literatura universal"}</span>
            </div>

            {/* Nombre Principal */}
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-wide uppercase font-sans">
              {nombre}
            </h2>

            {/* Separador */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#ED33B9] to-[#00C2D1]"></div>

            {/* Biografía con scroll interno bloqueado */}
            <div className="text-white/80 text-sm md:text-base leading-relaxed font-light font-sans max-h-[30vh] md:max-h-[42vh] overflow-y-auto pr-2 scrollbar-none">
              <p>
                {biografia || "La historia mística de este autor está siendo desvelada en los grimorios de Alquimia Literaria. Pronto podrás explorar todas sus transmutaciones textuales e hitos históricos."}
              </p>
            </div>
          </div>

          {/* Pie del modal */}
          <div className="border-t border-white/10 pt-4 mt-6 flex gap-4 items-center justify-between text-xs text-white/50">
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#ED33B9] tracking-wider">Estilo Clave</span>
              <p className="text-white/70 italic font-serif mt-0.5">{descripcion}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 rounded-full font-mono uppercase text-[#00C2D1]">
                Alquimista verificado
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

  return (
    <>
      {/* 2. LA TARJETA DEL CARRUSEL (Mantiene tus hovers perfectos) */}
      <div className="card" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        <img 
          src={cover} 
          alt={`Retrato de ${nombre}`} 
          className="card__image" 
        />
        <div className="card__content">
          <h3 className="card__title">{nombre}</h3>
          <p className="card__description">{descripcion}</p>
          <span className="text-[10px] uppercase tracking-widest text-[#110d18] font-bold block mt-2  animate-pulse">
            Ver Biografia →
          </span>
        </div>
      </div>

      {/* 3. TELETRANSPORTACIÓN: Inyectamos el modal directamente en el cuerpo del documento HTML */}
      {isOpen && createPortal(modalHTML, document.body)}
    </>
  );
}

export default Autor;