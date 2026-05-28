import { useEffect, useState } from "react";
import { end_points } from "../services/api";
import "../pages/PagesCss/Login.css"; 
import { redirectAlert } from "../helpers/alerts";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  // Cambiamos 'user' por 'email' para que coincida con la base de datos real
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();

  // Credenciales administrativas para saltar el Spring Security básico
  const credentialsBase64 = btoa("admin:admin123");

  // 1. USEEFFECT CORREGIDO (Evita fallos de ESLint metiendo la función adentro)
  useEffect(() => {
    // Si ya existe la sesión en el navegador, lo despachamos directo para la librería
    const session = localStorage.getItem("user_session");
    if (session) {
      navigate("/Library");
      return;
    }

    const fetchUsers = () => {
      fetch(end_points.users, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${credentialsBase64}`,
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.log("Error cargando usuarios:", error));
    };

    fetchUsers();
  }, [navigate, credentialsBase64]);

  // 2. BUSCAR USUARIO POR EMAIL Y PASSWORD REALES
  const findUser = () => {
    return users.find((item) => email === item.email && password === item.password);
  };

  // 3. PROCESAR INICIO DE SESIÓN
  const signIn = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return redirectAlert("Campos vacíos", "El correo y la contraseña son obligatorios", "/Login", "warning");
    }

    const authenticatedUser = findUser();

    if (authenticatedUser) {
      // Guardamos la sesión con los datos que sí devuelve tu backend (nombre, apellido, rol, email)
      localStorage.setItem("user_session", JSON.stringify({
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        nombre: authenticatedUser.nombre,
        apellido: authenticatedUser.apellido,
        rol: authenticatedUser.rol,
        isLoggedIn: true
      }));

      return redirectAlert(
        "Bienvenido a Alquimia Literaria", 
        `Hola ${authenticatedUser.nombre}, serás redireccionado`, 
        "/Library", 
        "success"
      );
    } else {
      return redirectAlert(
        "Credenciales incorrectas", 
        "El correo electrónico o la contraseña no coinciden con ninguna cuenta activa", 
        "/Login", 
        "error"
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] overflow-hidden">
      
      {/* BOTÓN VOLVER AL INICIO */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold"
      >
        ← VOLVER AL INICIO
      </Link>

      <div className="relative z-10 w-full max-w-sm p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Bienvenido</h2>
          <p className="text-blue-200/60 text-sm">Ingresa tus credenciales</p>
        </div>

        <form className="space-y-5" onSubmit={signIn}>
          <div>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* ESTA FILA FUE MODIFICADA PARA AGREGAR EL ENLACE */}
          <div className="flex items-center justify-between text-xs text-blue-200/80">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
              <input 
                type="checkbox" 
                className="accent-blue-500" 
                checked={remember}
                onChange={() => setRemember(!remember)} 
              />
              <span>Recordarme</span>
            </label>
            
            {/* Enlace añadido apuntando exactamente a tu ruta mapeada */}
            <Link 
              to="/forgot-password" 
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
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