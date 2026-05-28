import { useState, useEffect } from "react";
import { end_points } from "../services/api";
import "../pages/PagesCss/Register.css";
import { Link } from "react-router-dom"; 
import { redirectAlert } from "../helpers/alerts";

const Register = () => {
  // 1. ESTADOS REALES EXIGIDOS POR TU CLIENTEREGISTRODTO
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoIdentidad, setTipoIdentidad] = useState("CEDULA"); 
  const [numeroIdentidad, setNumeroIdentidad] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("CLIENTE"); 

  const [users, setUsers] = useState([]);

  // Credenciales administrativas para saltar el Spring Security básico
  const credentialsBase64 = btoa("admin:admin123");

  // 2. CARGAR USUARIOS PARA EVITAR DUPLICADOS (Sin conflictos de ESLint)
  useEffect(() => {
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
  }, [credentialsBase64]);

  const findUser = (emailToCheck, idToCheck) => {
    return users.find(
      (item) => item.email === emailToCheck || item.numeroIdentidad === idToCheck
    );
  };

  // 3. PROCESAR EL REGISTRO (POST)
  const handleRegister = (e) => {
    e.preventDefault();

    // Validar campos obligatorios de la API
    if ([nombre, apellido, tipoIdentidad, numeroIdentidad, email, password, rol].includes("")) {
      return redirectAlert(
        "Campos incompletos",
        "Por favor, llena todos los campos obligatorios para continuar",
        "/Register",
        "warning"
      );
    }

    // Validar duplicados
    const userExists = findUser(email, numeroIdentidad);
    if (userExists) {
      return redirectAlert(
        "Error de registro",
        "El correo o el número de identidad ya se encuentran registrados",
        "/Register",
        "error"
      );
    }

    // Mapeo idéntico a lo que espera Java
    const newUserDTO = {
      nombre,
      apellido,
      tipoIdentidad,
      numeroIdentidad,
      email,
      direccion, 
      telefono,  
      password,
      rol
    };

    console.log("Enviando DTO a Render:", newUserDTO);

    fetch(end_points.users, {
      method: 'POST',
      headers: { 
        "Authorization": `Basic ${credentialsBase64}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(newUserDTO)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en el servidor");
      return res.json();
    })
    // CORRECCIÓN ESLINT: Ya no declaramos 'data' porque no la usamos dentro, evitando el error
    .then(() => {
      redirectAlert(
        "¡Registro Exitoso!",
        "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        "/Login",
        "success"
      );
    })
    .catch(err => {
      console.log(err);
      redirectAlert("Error de Red", "No se pudo registrar en la base de datos", "/Register", "error");
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] py-10 overflow-hidden">
      
      {/* BOTÓN VOLVER AL INICIO */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-widest"
      >
        ← VOLVER AL INICIO
      </Link>

      <div className="relative z-10 w-full max-w-lg p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4 my-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Crea tu cuenta
          </h2>
          <p className="text-blue-200/60 text-sm">
            Únete a la Alquimia Literaria
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Nombre *</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="Santiago"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Apellido *</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="Zapata"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>

          {/* Tipo Documento y Número */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Tipo de Documento *</label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-all cursor-pointer"
                value={tipoIdentidad}
                onChange={(e) => setTipoIdentidad(e.target.value)}
              >
                <option className="bg-slate-900" value="CEDULA">Cédula</option>
                <option className="bg-slate-900" value="PASAPORTE">Pasaporte</option>
                <option className="bg-slate-900" value="LICENCIA_CONDUCIR">Licencia de Conducir</option>
                <option className="bg-slate-900" value="OTRO">Otro</option>
              </select>
            </div>
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Número de Identidad *</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="12345678"
                type="text"
                value={numeroIdentidad}
                onChange={(e) => setNumeroIdentidad(e.target.value)}
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Correo Electrónico *</label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="correo@dominio.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Dirección y Teléfono (Opcionales) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Dirección</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="Calle 123"
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Teléfono</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="555-1234"
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>

          {/* Contraseña y Rol */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Contraseña *</label>
              <input
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-blue-200/80 text-xs ml-1 mb-1 block">Rol de Acceso *</label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-all cursor-pointer"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option className="bg-slate-900" value="CLIENTE">Cliente</option>
                <option className="bg-slate-900" value="ADMIN">Administrador</option>
              </select>
            </div>
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
          <Link to="/login" className="text-blue-400 font-bold hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;