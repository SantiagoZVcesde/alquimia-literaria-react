import { useEffect, useState } from "react";
import { end_points } from "../services/api";
import "../pages/PagesCss/Login.css"; 
import { redirectAlert } from "../helpers/alerts";
import { Link } from "react-router-dom"; 

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [users, setUsers] = useState([]);

  const characters = "アアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ마미ムメモヤユヨラリルレロワヲン".split("");
  const matrixContent = Array(200).fill(characters).flat().slice(0, 700);

  function getUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error cargando usuarios:", error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function findUser() {
    return users.find((item) => user === item.username && password === item.password);
  }

  function signIn(e) {
    e.preventDefault();

    if (user === "" || password === "") {
      return redirectAlert("Campos vacíos", "El usuario y contraseña son obligatorios", "/Login", "warning");
    }

    const authenticatedUser = findUser();

    if (authenticatedUser) {

      localStorage.setItem("user_session", JSON.stringify({
        username: authenticatedUser.username,
        fullName: authenticatedUser.fullName,
        isLoggedIn: true
      }));

      return redirectAlert(
        "Bienvenido a Alquimia Literaria", 
        `Hola ${authenticatedUser.username}, serás redireccionado`, 
        "/Library", 
        "success"
      );
    } else {
      return redirectAlert(
        "Credenciales incorrectas", 
        "El usuario o la contraseña no coinciden", 
        "/Login", 
        "error"
      );
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      
      {/* --- BOTÓN VOLVER AL INICIO (HU05) --- */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold"
      >
        ← VOLVER AL INICIO
      </Link>

      <div className="matrix-bg">
        {matrixContent.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

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
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-blue-200/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="accent-blue-500" 
                checked={remember}
                onChange={() => setRemember(!remember)} 
              />
              <span>Recordarme</span>
            </label>
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
          <Link to="/Register" className="text-blue-400 font-bold hover:underline">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;