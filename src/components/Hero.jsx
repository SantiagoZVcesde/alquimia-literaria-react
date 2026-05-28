import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../pages/PagesCss/Hero.css';
import Card from './ComponentesVariedad/Card';
import ScrollFloat from './ComponentesVariedad/Texto';
import Autor from './ComponentesVariedad/Autor';
import Logomarquee from './ComponentesVariedad/Logomarquee';
import SliderTipografico from './ComponentesVariedad/SliderTipografico';
import LibroSemana from './ComponentesVariedad/LibroSemana';
import ComunidadSplit from './ComponentesVariedad/ComunidadSplit';


const Hero = () => {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  
  // Estado y Ref para la intersección de las secciones
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Estados para controlar el progreso del scroll horizontal
  const [categoriesProgress, setCategoriesProgress] = useState(0);
  const [authorsProgress, setAuthorsProgress] = useState(0);

  // Referencias para los contenedores escaneables horizontales
  const categoriesRef = useRef(null);
  const authorsRef = useRef(null);

  // Función para calcular la barra de progreso horizontal
  const handleHorizontalScroll = (ref, setProgress) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setProgress((scrollLeft / totalScroll) * 100);
      }
    }
  };

  useEffect(() => {
    // Lógica de Scroll para Video y Logo
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollOpacity(Math.min(scrollY / 1, 1)); 
      
      const logoThreshold = 300;
      if (scrollY > 50) {
        setLogoOpacity(Math.min((scrollY - 50) / logoThreshold, 1));
      } else {
        setLogoOpacity(0);
      }
    };

    // Intersection Observer para activar las animaciones al bajar
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("¿Se activó la sección?:", entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -100px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      {/* SECCIÓN 1: HERO Y VIDEO */}
      <div className="hero-container bg-[#1a0f0a]">
        <div className="media-wrapper relative">
          <img src="/img/img-para-utilizar/guillermo.webp" alt="Guillermo" className="base-media" />
          <video 
            src="/img/img-para-utilizar/Proyecto de vídeo 4.mp4" 
            autoPlay muted loop 
            className="overlay-media"
            style={{ 
              opacity: scrollOpacity,
              backgroundColor: '#1a0f0a',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/80 to-transparent z-10"></div>
        </div>

        <div className="hero-content transition-opacity duration-700 z-20" style={{ opacity: logoOpacity }}>
          <img 
            src="/img/log/logo.png" 
            className="rounded-full max-w-xs border-4 border-[#ED33B9] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_#ED33B9] cursor-pointer"
            alt="Logo" 
          />
        </div>
        
        <div className="h-[100vh]"></div> 
      </div>

      {/* CONTENEDOR GLOBAL DEL CUERPO CENTRAL */}
      <div
        ref={sectionRef} 
        className={`relative z-20 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        
        {/* SECCIÓN 2: LA CORTINA 3D (TÍTULO INDEPENDIENTE Y LIBROS) */}
        <section className="bg-cortina-3d w-full py-30 px-6 md:px-12 lg:px-16 select-none overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">

            {/* DIV COMPLETAMENTE INDEPENDIENTE PARA EL TÍTULO 1 */}
            <div className="w-full text-center block overflow-visible py-4">
              <div className="inline-block max-w-full text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white break-words">
                <ScrollFloat
                  animationDuration={1}
                  ease='back.inOut(2)'
                  scrollStart='center bottom+=50%'
                  scrollEnd='bottom bottom-=40%'
                  stagger={0.03}
                >
                  Variedad
                </ScrollFloat>
              </div>
            </div>

            {/* CAJÓN DE LAS CARDS CON HOVER CONTROLADO */}
            <div className="bg-[#0A1045]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(237,51,185,0.25)] hover:shadow-[0_0_60px_-10px_rgba(0,194,209,0.35)] transition-all duration-500">
              
              {/* FILA DE TARJETAS HORIZONTAL */}
              <div 
                ref={categoriesRef}
                onScroll={() => handleHorizontalScroll(categoriesRef, setCategoriesProgress)}
                className="flex flex-row gap-8 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-none w-full"
              >
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Terror" cover="/img/libros/Dracula.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Ficción" cover="/img/libros/lacamarasecreta.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Romance" cover="/img/libros/orgulloyprejuicio.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Fantasía" cover="/img/libros/lapiedrafilosofal.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Ciencia Ficción" cover="/img/libros/1948.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Clásicos" cover="/img/libros/donquijote.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Comic" cover="/img/libros/araña.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Distopía" cover="/img/libros/juegosdelhambre.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Gótico" cover="/img/libros/sharpteeth.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Terror" cover="/img/libros/enlamontaña.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Clásico" cover="/img/libros/soledad.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Filosofía" cover="/img/libros/elprincipito.jpg" />
                </div>
                <div className="transition-transform duration-500 ease-out hover:scale-105">
                  <Card category="Física" cover="/img/libros/caos.jpg" />
                </div>
              </div>

              {/* Indicador de scroll de categorías */}
              <div className="w-32 h-1 bg-white/10 mx-auto rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-[#00C2D1] transition-all duration-150 ease-out"
                  style={{ width: `${categoriesProgress}%` }}
                ></div>
              </div>

            </div>

          </div>
        </section>

                {/* SECCIÓN: MARQUEE ENTRE SECCIONES */}
        <div className="bg-[#0A1045] w-full">
          <Logomarquee/>
        </div>
          
{/* SECCIÓN 3: AUTORES (Espacio full screen protagonista) */}
<section className="relative w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 flex flex-col justify-center select-none overflow-hidden bg-[#0A1045]">
  <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
    <video 
      src="/img/img-para-utilizar/paisaje.mp4" 
      autoPlay muted loop playsInline
      className="w-full h-full object-cover"
      style={{ opacity: scrollOpacity }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1045] via-[#0A1045]/60 to-[#0A1045]"></div>
  </div>

  <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
    <div className="w-full text-center block overflow-visible py-2">
      <div className="inline-block max-w-full text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white break-words drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
        <ScrollFloat animationDuration={1} ease='back.inOut(2)' scrollStart='center bottom+=50%' scrollEnd='bottom bottom-=40%' stagger={0.03}>
          Autores
        </ScrollFloat>
      </div>
    </div>
    
    {/* CONTENEDOR PRINCIPAL DEL CARRUSEL */}
    <div className="bg-[#0A1045]/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(0,194,209,0.15)]">
      
      <div 
        ref={authorsRef}
        onScroll={() => handleHorizontalScroll(authorsRef, setAuthorsProgress)}
        className="flex flex-row gap-8 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-none w-full relative z-30"
      >
        
        {/* 1. EDGAR ALLAN POE */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Edgar Allan Poe" 
            cover="/img/libros/edgarallapoul.jpg" 
            descripcion="EDGAR ALLAN POE" 
            fechas="1809 — 1849"
            generos="Terror Gótico, Poesía"
            biografia="Escritor, poeta y crítico estadounidense, reconocido mundialmente como uno de los maestros del relato corto y creador del relato detectivesco."
          />
        </div>

        {/* 2. GUILLERMO DEL TORO (Estructura Corregida y Organizada) */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Guillermo del Toro" 
            cover="/img/libros/guillermotoro.jpg" 
            descripcion="GUILLERMO DEL TORO" 
            fechas="1964 — Presente"
            generos="Fantasía Oscura, Ciencia Ficción"
            biografia="Afamado director, guionista y novelista mexicano. Su mente brillante destaca por entrelazar de forma poética los mundos de las criaturas fantásticas y los horrores humanos, transportando la alquimia del diseño de monstruos a la alta literatura y el cine de culto."
          />
        </div>

        {/* 3. MIGUEL DE CERVANTES */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Miguel de Cervantes" 
            cover="/img/libros/migueldecervantes.jpg" 
            descripcion="MIGUEL DE CERVANTES" 
            fechas="1547 — 1616"
            generos="Novela, Novela de aventuras"
            biografia="Máxima figura de la literatura española y autor de 'Don Quijote de la Mancha', considerada la primera novela moderna de la historia universal."
          />
        </div>        
        
        {/* 4. PAULO COELHO */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Paulo Coelho" 
            cover="/img/libros/paulocoelo.jpg" 
            descripcion="PAULO COELHO" 
            fechas="1947 — Presente"
            generos="Lírica, Novela Espiritual"
            biografia="Novelista, dramaturgo y letrista brasileño. Es uno de los escritores más leídos del mundo gracias a su célebre obra de superación y misticismo filosófico 'El Alquimista'."
          />
        </div>

        {/* 5. STAN LEE */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Stan Lee" 
            cover="/img/libros/stanlee.jpg" 
            descripcion="STAN LEE" 
            fechas="1922 — 2018"
            generos="Cómics, Ciencia Ficción"
            biografia="Escritor y editor de cómics estadounidense, creador de un universo mitológico moderno que revolucionó la cultura pop global con personajes como Spider-Man, Iron Man y X-Men."
          />
        </div>

        {/* 6. STEPHEN KING */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Stephen King" 
            cover="/img/libros/stephenking.jpg" 
            descripcion="STEPHEN KING" 
            fechas="1947 — Presente"
            generos="Terror, Suspenso, Ficción"
            biografia="Prolífico autor estadounidense de novelas de suspenso y terror. Sus obras de ambientación psicológica claustrofóbica como 'It' o 'El Resplandor' lo han consolidado en el trono de la literatura de suspenso contemporánea."
          />
        </div> 

        {/* 7. GABRIEL GARCÍA MÁRQUEZ */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="Gabriel García Márquez" 
            cover="/img/libros/gabrielgarciasmarquez.jpg" 
            descripcion="GABRIEL GARCÍA MÁRQUEZ" 
            fechas="1927 — 2014"
            generos="Realismo Mágico"
            biografia="Genio literario colombiano galardonado con el Premio Nobel. Transformó las letras del mundo fundando el Realismo Mágico a través de universos poéticos inmortales como el Macondo de 'Cien años de soledad'."
          />
        </div>

        {/* 8. WILLIAM SHAKESPEARE */}
        <div className="transition-transform duration-500 ease-out hover:scale-105 hover:filter hover:drop-shadow-[0_10px_20px_rgba(237,51,185,0.2)] snap-start shrink-0">
          <Autor 
            nombre="William Shakespeare" 
            cover="/img/libros/wiliamsheksper.jpg" 
            descripcion="WILLIAM SHAKESPEARE" 
            fechas="1564 — 1616"
            generos="Tragedia, Drama, Poesía"
            biografia="Dramaturgo y poeta inglés, unánimemente considerado el escritor más importante en lengua inglesa y uno de los más célebres de la literatura universal debido a su profunda exploración de la psique humana."
          />
        </div>

      </div>  

      {/* Indicador Visual de Progreso del Scroll */}
      <div className="w-32 h-1 bg-white/10 mx-auto rounded-full overflow-hidden mt-2">
        <div 
          className="h-full bg-[#ED33B9] transition-all duration-150 ease-out"
          style={{ width: `${authorsProgress}%` }}
        ></div>
      </div>
    </div>      
  </div>
</section>


      <SliderTipografico texto= "De la alquimia de la lectura nace la transformación del alma; un libro no cambia el mundo, cambia a quien va a cambiar el mundo."/>   

      <LibroSemana/>
      <ComunidadSplit/>

      </div> 
    </>
  );
};

export default Hero;