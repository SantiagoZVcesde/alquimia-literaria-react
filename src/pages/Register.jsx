import { useState } from "react";
import { end_points } from "../services/api";
import "../pages/PagesCss/Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const characters = "アアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
  const matrixContent = Array(200).fill(characters).flat().slice(0, 700);

  const handleRegister = (e) => {
    e.preventDefault();
    
    const newUser = {
      username: username,
      fullName: fullName,
      email: email,
      password: password
    };

    if ([username, fullName, email, password].includes("")) {
      return alert("Por favor, llena todos los campos");
    }

    console.log("Enviando datos:", newUser);
    
    fetch(end_points.users, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => alert("¡Registro exitoso!"))
    .catch(err => console.log(err));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black py-10">
      
      {/* FONDO ANIMADO */}
      <div className="matrix-bg">
        {matrixContent.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

      {/* FORMULARIO DE REGISTRO */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Crea tu cuenta</h2>
          <p className="text-blue-200/60 text-sm">Únete a la Alquimia Literaria</p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Campo Nombre Completo */}
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Nombre Completo</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Ej: Juan Torres"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Campo Usuario */}
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Nombre de Usuario</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Ej: jtorres"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Correo Electrónico</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="juan@ejemplo.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Contraseña</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all uppercase tracking-wider"
            >
              Registrarme
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-400">¿Ya tienes cuenta? </span>
          <a href="/login" className="text-blue-400 font-bold hover:underline">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;