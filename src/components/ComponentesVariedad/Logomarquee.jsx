import React from 'react';

// URLs reales y públicas que cargan perfectamente
const LOGOS = [
  { id: 1, name: 'chat', url: '/img/logos/chat.png' },
  { id: 2, name: 'github', url: '/img/logos/github.png' }, 
  { id: 3, name: 'Postman', url: '/img/logos/postman.png' },
  { id: 4, name: 'Preline', url: '/img/logos/preline.png' },
  { id: 5, name: 'prisma', url: '/img/logos/prisma.png' },
  { id: 6, name: 'vite', url: '/img/logos/vite.png' },
];

export default function Logomarquee() {
  const listaDuplicada = [...LOGOS, ...LOGOS, ...LOGOS]; // Duplicamos la lista para un efecto de carrusel más largo

  return (
    // Usamos bg-navy (el azul profundo de tu paleta) para que combine con tus tarjetas
    <section className="bg-[#0A1045] py-10 border-y border-gray-900 overflow-hidden select-none w-full">

      {/* Contenedor horizontal */}
      <div className="relative flex w-full overflow-hidden">
        
        {/* LA CINTA: Asegúrate de que 'flex' esté todo en minúscula */}
        <div className="flex min-w-full shrink-0 items-center justify-around gap-16 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          
          {listaDuplicada.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="flex items-center justify-center w-28 h-12 shrink-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img 
                src={logo.url} 
                alt={`Logo de ${logo.name}`} 
                className="max-h-full max-w-full object-contain filter drop-shadow-md"
              />
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}