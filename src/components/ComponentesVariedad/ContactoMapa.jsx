        {/* CONTACTO Y MAPA */}
        <section className="px-6 md:px-20 py-24">
          <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
            {/* Formulario con ligero retraso para efecto cascada */}
            <div className={`flex-1 bg-[#251812] p-10 rounded-3xl border-2 border-[#ED33B9]/30 shadow-2xl transition-all duration-700 delay-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
              <h2 className="text-4xl font-bold mb-6 text-[#00C2D1]">Contacto</h2>
              <form className="flex flex-col space-y-4">
                <input type="text" placeholder="Tu nombre" className="bg-[#1a0f0a] text-white border border-[#4a3427] p-4 rounded-xl focus:outline-none focus:border-[#ED33B9]" />
                <input type="email" placeholder="Tu correo" className="bg-[#1a0f0a] text-white border border-[#4a3427] p-4 rounded-xl focus:outline-none focus:border-[#ED33B9]" />
                <textarea placeholder="Tu mensaje" className="bg-[#1a0f0a] text-white border border-[#4a3427] p-4 rounded-xl h-40 focus:outline-none focus:border-[#ED33B9]"></textarea>
                <button className="bg-[#ED33B9] text-white font-black py-4 rounded-xl hover:shadow-[0_0_25px_#ED33B9] transition-all">
                  ENVIAR
                </button>
              </form>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-[#F6AF65]">Nos ubicamos en:</h2>
              <iframe
                src="https://maps.google.com/maps?q=medellin&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[400px] rounded-3xl border-4 border-[#00C2D1] shadow-2xl"
                title="mapa"
              ></iframe>
            </div>
          </div>
        </section>