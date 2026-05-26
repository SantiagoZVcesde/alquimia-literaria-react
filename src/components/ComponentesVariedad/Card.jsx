import React from 'react';

const Card = ({ category, cover, hoverCover }) => {
  return (
    // Mantenemos las clases de carrusel horizontal (w-[220px], min-w-[220px], snap-center)
    <div className="w-[220px] h-[320px] min-w-[220px] flex-shrink-0 group snap-center cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950">
      
      {/* 1. TEXTO Y ADORNOS (Siempre al frente con z-20) */}
      <div className="absolute inset-0 h-full w-full p-5 flex flex-col justify-between items-center z-20 pointer-events-none">
        {/* Línea decorativa superior */}
        <div className="w-12 h-1 bg-purple-500/50 rounded-full mt-2" />
        
        {/* Categoría con sombra fuerte para contrastar sobre cualquier imagen */}
        <h3 className="text-white text-xl font-bold tracking-wider uppercase text-center my-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {category}
        </h3>
        
        {/* Botón inferior */}
        <span className="text-[10px] text-purple-300/60 uppercase tracking-widest bg-gradient-to-b from-[#0A1045] to-[#4B2E2A] px-3 py-1 rounded-full border border-purple-500/20 drop-shadow-md">
          Ver portada
        </span>
      </div>

      {/* 2. PORTADAS DE FONDO (z-10 - Se muestran todo el tiempo detrás del texto) */}
      <div className="absolute inset-0 h-full w-full bg-slate-900 z-10">
        
        {/* Imagen normal (siempre visible, ya no tiene opacity-0) */}
        <img 
          src={cover} 
          alt={`Portada ${category}`} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${hoverCover ? 'group-hover:opacity-0' : ''}`} 
        />
        
        {/* Imagen alternativa (solo se activa si haces hover sobre la tarjeta) */}
        {hoverCover && (
          <img 
            src={hoverCover} 
            alt={`Portada ${category} hover`} 
            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          />
        )}
        
        {/* Capa de contraste oscura: Clave para que el diseño morado y el texto sigan viéndose nítidos */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-950/30 pointer-events-none" />
      </div>

    </div>
  );
};

export default Card;