import { Link } from "react-router-dom";

function Main() {
  return (
    <main>

      {/* HERO */}
      <section className="pt-28 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12 min-h-screen bg-gradient-to-b from-white to-[var(--color-fondo)]">
        
        <div className="flex justify-center flex-1">
          <img 
            src="/img/log/logo.png"
            alt="Logo Alquimia" 
            className="rounded-full max-w-xs shadow-lg hover:shadow-[0_0_40px_var(--color-secundario)] transition-shadow duration-300"
          />
        </div>

        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl font-bold leading-tight text-[var(--color-primario)]">
            Descubre, escucha y vive la magia de los libros.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-black">
            Alquimia.Literaria es tu portal para explorar libros, cómics, mangas y audiolibros.
          </p>

          <Link to="/library">
            <button className="mt-8 px-7 py-3 border-2 border-[var(--color-secundario)] rounded-full text-[var(--color-secundario)] font-semibold hover:bg-[var(--color-secundario)] hover:text-[var(--color-primario)] transition hover:scale-105 shadow-lg">
              Explorar
            </button>
          </Link>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="px-6 mt-20 md:px-20 ">
        <div className="max-w-5xl mx-auto  bg-(--color-primario) border-2 border-[var(--color-primario)] rounded-lg p-8 shadow-lg flex flex-col md:flex-row gap-12">

          <div className="flex-1 ">
            <h2 className="text-4xl font-bold mb-4 text-[var(--color-primario)]">
              ¿Qué es Alquimia.Literaria?
            </h2>

            <p className="leading-relaxed text-black">
              Somos una plataforma que conecta lectores con historias.
            </p>

            {/* FORM */}
            <form className="mt-6 flex flex-col space-y-4 ">
              <input type="text" placeholder="Tu nombre" className="border p-2 rounded-lg" />
              <input type="email" placeholder="Tu correo" className="border p-2 rounded-lg" />
              <textarea placeholder="Tu mensaje" className="border p-2 rounded-lg"></textarea>

              <button className="bg-[var(--color-primario)] text-[var(--color-secundario)] py-2 rounded-lg hover:bg-gray-900">
                Enviar
              </button>
            </form>
          </div>

          {/* MAPA */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2 text-[var(--color-gris)]">
              Nos ubicamos en:
            </h2>

            <iframe
              src="https://maps.google.com/maps?q=medellin&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-80 rounded-lg border-4 border-[var(--color-secundario)]"
              title="mapa"
            ></iframe>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 py-12 md:px-12 lg:px-20 ">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primario)] mb-10">
          Características
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            { img: "/img/iconos cta/libro.png", title: "Variedad de géneros", desc: "Libros, cómics, mangas y más." },
            { img: "/img/iconos cta/pintora.png", title: "Autores destacados", desc: "Conoce su vida y obras." },
            { img: "/img/iconos cta/megafono.webp", title: "Audiolibros", desc: "Historias para escuchar." },
            { img: "/img/iconos cta/billete.png", title: "Préstamos", desc: "Acceso fácil a la lectura." }
          ].map((item, i) => (
            <div key={i} className="bg-(--color-primario) flex flex-col items-center text-center p-6 border rounded-2xl shadow hover:bg-gray-100 transition">
              <img src={item.img} className="w-16 h-16 mb-4" alt="icono" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-[var(--color-gris)] mt-2 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--color-primario)] to-gray-700 py-16 px-6 md:px-20 text-white text-center rounded-3xl shadow-xl mx-4 my-10">
        
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Conviértete en parte de nuestra comunidad
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Únete hoy y transforma tus días con historias.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">

          <Link to="/library">
            <button className="bg-[var(--color-secundario)] text-[var(--color-primario)] font-bold py-3 px-6 rounded-full">
              📚 Ver Librería
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-white text-[var(--color-primario)] font-bold py-3 px-6 rounded-full">
              ✍️ Crear cuenta
            </button>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Main;