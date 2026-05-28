import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SliderTipografico.css';

gsap.registerPlugin(ScrollTrigger);

const SliderTipografico = ({ texto }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll('.word');

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: true,
        },
      }
    );
  }, []);

  const palabras = texto.split(' ');

  return (
    <section className="slider-tipografico">
      <div className="slider-contenido">

        <span className="slider-etiqueta">
          Inspiración Alquímica
        </span>

        <h2 ref={containerRef} className="slider-texto">
          {palabras.map((word, index) => (
            <span className="word" key={index}>
              {word}&nbsp;
            </span>
          ))}
        </h2>

        <p className="slider-autor">
          — Anónimo Literario
        </p>

      </div>
    </section>
  );
};

export default SliderTipografico;