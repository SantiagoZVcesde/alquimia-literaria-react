import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../pages/PagesCss/Hero.css';
import Card from './ComponentesVariedad/Card';
import ScrollFloat from './ComponentesVariedad/Texto';
import Autor from './ComponentesVariedad/Autor';
import Logomarquee from './ComponentesVariedad/Logomarquee';

const Hero = () => {
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  
  // Estado y Ref para la intersección de las secciones
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
        <section className="bg-cortina-3d w-full py-30  px-6 md:px-12 lg:px-16 select-none overflow-hidden">
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
                  categorias
                </ScrollFloat>
              </div>
            </div>

            {/* CAJÓN DE LAS CARDS */}
            <div className="  bg-[#0A1045]/40 backdrop-blur-md border  border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(237,51,185,0.25)] hover:shadow-[0_0_60px_-10px_rgba(0,194,209,0.35)] transition-all duration-500">
              
              {/* FILA DE TARJETAS HORIZONTAL */}
              <div className="flex flex-row gap-8 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-thin w-full">
                <Card category="Terror" cover="/img/libros/Dracula.jpg" />
                <Card category="Ficción" cover="/img/libros/lacamarasecreta.jpg" />
                <Card category="Romance" cover="/img/libros/orgulloyprejuicio.jpg" />
                <Card category="Fantasía" cover="/img/libros/lapiedrafilosofal.jpg" />
                <Card category="Ciencia Ficción" cover="/img/libros/1948.jpg" />
                <Card category="Clásicos" cover="/img/libros/donquijote.jpg" />
                <Card category="Comic" cover="/img/libros/araña.jpg" />
                <Card category="Distopía" cover="/img/libros/juegosdelhambre.jpg" />
                <Card category="Gótico" cover="/img/libros/sharpteeth.jpg" />
                <Card category="Terror" cover="/img/libros/enlamontaña.jpg" />
                <Card category="Clásico" cover="/img/libros/soledad.jpg" />
                <Card category="Filosofía" cover="/img/libros/elprincipito.jpg" />
                <Card category="Física" cover="/img/libros/caos.jpg" />
              </div>

            </div>

          </div>
        </section>
          


        {/* SECCIÓN 3: AUTORES Y SECCIONES SIGUIENTES (Fondo plano Deep Navy) */}
        <div className="bg-[#0A1045] w-full transition-colors duration-500">
          
          {/* ZONA DE AUTORES DESTACADOS REESTRUCTURADA */}
        <Logomarquee/>
          <div className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto overflow-hidden flex flex-col gap-16">
            
            {/* DIV COMPLETAMENTE INDEPENDIENTE PARA EL TÍTULO DE AUTORES */}
            <div className="w-full text-center block overflow-visible py-4">
              <div className="inline-block max-w-full text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white break-words">
                <ScrollFloat
                  animationDuration={1}
                  ease='back.inOut(2)'
                  scrollStart='center bottom+=50%'
                  scrollEnd='bottom bottom-=40%'
                  stagger={0.03}
                >
                  Autores 
                </ScrollFloat>
              </div>
            </div>
            
            
            {/* CAJÓN DE AUTORES PREMIUM */}
            <div className="bg-[#0A1045]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(0,194,209,0.2)] hover:shadow-[0_0_60px_-10px_rgba(237,51,185,0.3)] transition-all duration-500">
              
              {/* FILA DE AUTORES HORIZONTAL */}
              <div className="flex flex-row gap-8 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-thin w-full">
                <Autor nombre="Guillermo" cover="/img/libros/migueldecervantes.jpg" descripcion="Maestro del terror ." /> 
                <Autor nombre="El Yeti" cover="/img/libros/paulacoelo.jpg" descripcion="Criatura de la nieve." />
                <Autor nombre="Caratoro" cover="/img/libros/stanlee.jpg" descripcion="Misterio y mitología." />
                <Autor nombre="Rock" cover="/img/libros/stephenking.jpg" descripcion="Música en la lectura." />
                <Autor nombre="Rock" cover="/img/libros/stephenking.jpg" descripcion="Música en la lectura." />
                <Autor nombre="Rock" cover="/img/libros/stephenking.jpg" descripcion="Música en la lectura." />
                <Autor nombre="Rock" cover="/img/libros/stephenking.jpg" descripcion="Música en la lectura." />
              </div>  

            </div>      
          </div>

          {/* CARACTERÍSTICAS (Iconos de variedad, audiolibros, etc.) */}
          <section className="px-6 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { img: "/img/iconos cta/libro.png", title: "Variedad", color: "#00C2D1" },
                { img: "/img/iconos cta/pintora.png", title: "Autores", color: "#ED33B9" },
                { img: "/img/iconos cta/megafono.webp", title: "Audiolibros", color: "#F6AF65" },
                { img: "/img/iconos cta/billete.png", title: "Préstamos", color: "#00C2D1" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  style={{ 
                    borderColor: item.color,
                    transitionDelay: `${i * 100}ms` 
                  }}
                  className={`bg-[#100977] p-8 rounded-2xl border-b-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } hover:-translate-y-2`}
                >
                  <img src={item.img} className="w-16 h-16 mx-auto mb-4" alt={item.title} />
                  <h3 className="font-bold text-xl text-center" style={{ color: item.color }}>{item.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN DE LA COMUNIDAD */}
          <section className="py-32 px-6 bg-gradient-to-b from-[#0001532f] to-[#4B2E2A]">
            <div className={`max-w-5xl mx-auto bg-[#4B2E2A] p-16 rounded-[4rem] text-center border-2 border-[#ED33B9]/30 shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase">
                Únete a la <span className="text-[#00C2D1]">Comunidad</span>
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                <Link to="/library" className="bg-[#00C2D1] text-[#1a0f0a] px-12 py-5 rounded-full font-black text-lg hover:shadow-[0_0_30px_#00C2D1] transition-all">
                  Ver Librería
                </Link>
                <Link to="/register" className="bg-[#ED33B9] text-white px-12 py-5 rounded-full font-black text-lg hover:shadow-[0_0_30px_#ED33B9] transition-all">
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </section>

        </div> 
      </div> 
    </>
  );
};

export default Hero;