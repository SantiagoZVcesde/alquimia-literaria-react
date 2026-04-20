import { useEffect, useState } from "react";
import { end_points } from "../services/api";
import "../pages/PagesCss/Login.css"; 

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [users, setUsers] = useState([]);

  const characters = "アアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
  const matrixContent = Array(200).fill(characters).flat().slice(0, 700);

  function getUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function findUser() {
    return users.find((item) => user === item.username && password === item.password);
  }

  function signIn(e) {
    e.preventDefault();
    if (user === "" || password === "") return alert("Login or password is empty");
    if (findUser()) return alert("Welcome admin");
    alert("Login or password is incorrect");
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      
      {/* FONDO ANIMADO */}
      <div className="matrix-bg">
        {matrixContent.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

      {/* FORMULARIO (Encima del fondo gracias al z-index y relative) */}
      <div className="relative z-10 w-full max-w-sm p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Bienvenido</h2>
          <p className="text-blue-200/60 text-sm">Ingresa tus credenciales</p>
        </div>

        <form className="space-y-5" onSubmit={signIn}>
          <div>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Usuario"
              type="text"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Contraseña"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-blue-200/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" onChange={() => setRemember(!remember)} />
              <span>Recordarme</span>
            </label>
            <a href="#" className="hover:text-white transition-colors">¿Olvidaste tu clave?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all"
          >
            INGRESAR
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-slate-400">¿No tienes cuenta? </span>
          <a href="/Register" className="text-blue-400 font-bold hover:underline">Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default Login;