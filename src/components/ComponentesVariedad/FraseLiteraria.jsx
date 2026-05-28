import React from 'react';
import ScrollFloat from './Texto';

const FraseLiteraria = () => {
  return (
    <section
      className="
        w-full
        bg-gradient-to-b
        from-[#0A1045]
        to-[#050826]
        text-white
        overflow-hidden
        py-16
        px-4
      "
    >
      <div className="w-full max-w-5xl mx-auto text-center">

        {/* Etiqueta */}
        <span className="block text-[#ED33B9] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-8">
          Inspiración Alquímica
        </span>

        {/* Texto */}
        <div
          className="
            w-full
            font-serif
            italic
            font-light
            text-white/90
            leading-[1.35]
            sm:leading-[1.45]
            md:leading-[1.5]
            drop-shadow-md

            text-3xl
            sm:text-3xl
            md:text-3xl
            lg:text-3xl

            break-words
          "
        >
<ScrollFloat
  containerClassName="frase-alquimia"
  textClassName="frase-alquimia-texto"
  animationDuration={1.2}
  ease="power2.out"
  scrollStart="top bottom-=10%"
  scrollEnd="bottom center"
  stagger={0.02}
>
            "De la alquimia de la lectura nace la transformación del alma; un libro no cambia el mundo, cambia a quien va a cambiar el mundo."
          </ScrollFloat>
        </div>

        {/* Autor */}
        <div className="mt-10 text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] text-[#00C2D1] uppercase">
          — Anónimo Literario
        </div>
      </div>
    </section>
  );
};

export default FraseLiteraria;