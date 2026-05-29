import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { end_points } from "../services/api";
import { redirectAlert } from "../helpers/alerts";
import Swal from "sweetalert2";
import "../pages/PagesCss/Register.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Guardamos el objeto completo del usuario cuando lo encontremos
  const [activeUser, setActiveUser] = useState(null); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Credenciales maestras solo para el GET inicial
  const adminCredentialsBase64 = btoa("admin:admin123");

  // --- 1. CARGAR TODOS LOS USUARIOS USANDO LA CREDENCIAL MAESTRA DE SPRING SECURITY ---
  useEffect(() => {
    fetch(end_points.users, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${adminCredentialsBase64}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("La API no devolvió un array:", data);
        }
      })
      .catch((error) => console.log("Error cargando usuarios:", error));
  }, [adminCredentialsBase64]);

  // --- 2. PASO 1: VERIFICAR EL CORREO EN LA LISTA ---
  const handleVerifyEmail = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return Swal.fire("Campo requerido", "Por favor, ingresa tu correo electrónico.", "warning");
    }

    setLoading(true);

    const match = users.find((u) => u.email && u.email.toLowerCase() === email.trim().toLowerCase());

    setTimeout(() => {
      setLoading(false);
      if (match) {
        setActiveUser(match); 
        Swal.fire("Usuario Verificado", "Correo encontrado. Ahora ingresa tu nueva contraseña.", "success");
      } else {
        Swal.fire("Error", "El correo electrónico no coincide con ninguna cuenta activa.", "error");
      }
    }, 500);
  };

  // --- 3. PASO 2: MANDAR EL PUT ENCRIPTANDO LAS CREDENCIALES DEL USUARIO PROPIO ---
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      return Swal.fire("Campos vacíos", "Todos los campos de contraseña son obligatorios.", "warning");
    }

    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "Las contraseñas no coinciden.", "error");
    }

    setLoading(true);

    // Clonamos los datos actuales
    let updatedUser = {
      id: activeUser.id,
      nombre: activeUser.nombre,
      apellido: activeUser.apellido,
      tipoIdentidad: activeUser.tipoIdentidad,
      numeroIdentidad: String(activeUser.numeroIdentidad),
      email: activeUser.email,
      direccion: activeUser.direccion || "Calle 123 #45-67",
      telefono: activeUser.telefono || "555-1234",
      password: newPassword // Aquí va el cambio
    };

    /**
     * ¡OJO AQUÍ MANO!
     * Para el PUT generamos un token Basic Auth usando el email del usuario 
     * y su contraseña ACTUAL (la vieja que está en la BD, activeUser.password).
     * Así Spring Security valida que es él mismo quien hace la petición.
     */
    const userCredentialsBase64 = btoa(`${activeUser.email}:${activeUser.password}`);

    fetch(end_points.users + "/" + activeUser.id, {
      method: "PUT",
      headers: {
        "Authorization": `Basic ${userCredentialsBase64}`, // Mandamos el token de su propia cuenta vieja
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (!res.ok) {
          // Si falla con las del usuario, intentamos como último recurso con las del admin maestro
          return fetch(end_points.users + "/" + activeUser.id, {
            method: "PUT",
            headers: {
              "Authorization": `Basic ${adminCredentialsBase64}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }).then(resAdmin => {
            if (!resAdmin.ok) throw new Error("Bloqueado por Spring Security en ambos intentos");
            return resAdmin.json();
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Contraseña cambiada con éxito:", data);
        setLoading(false);
        return redirectAlert(
          "¡Contraseña Actualizada!",
          "Tu contraseña ha sido restablecida con éxito. Ya puedes iniciar sesión.",
          "/Login",
          "success"
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Swal.fire("Error de Autenticación", "Spring Security rechazó la actualización. Revisa la consola o los permisos del backend.", "error");
      });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] py-10 overflow-hidden">
      
      <Link 
        to="/Login" 
        className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-widest"
      >
        ← VOLVER AL LOGIN
      </Link>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4">
        
        {!activeUser ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-3xl font-bold text-white tracking-tight text-center">
                ¿Olvidaste tu contraseña?
              </h2>
              <p className="text-blue-200/60 text-sm mt-2 text-center">
                Ingresa tu correo electrónico registrado para verificar tu cuenta.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleVerifyEmail}>
              <div>
                <label className="text-blue-200/80 text-xs ml-1 mb-1 block">
                  Correo Electrónico
                </label>
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all uppercase tracking-wider flex justify-center items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Verificar Correo"
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-3xl font-bold text-white tracking-tight text-center">
                Restablecer Credencial
              </h2>
              <p className="text-amber-300 text-xs mt-2 text-center font-semibold bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                Usuario verificado: {activeUser.nombre} {activeUser.apellido}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div>
                <label className="text-slate-400 text-xs ml-1 mb-1 block">ID de Usuario</label>
                <input
                  type="text"
                  value={activeUser.id}
                  disabled
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-slate-400 cursor-not-allowed outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-blue-200/80 text-xs ml-1 mb-1 block">
                  Nueva Contraseña
                </label>
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-blue-200/80 text-xs ml-1 mb-1 block">
                  Confirmar Contraseña
                </label>
                <input
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
                  placeholder="Repite la contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all uppercase tracking-wider flex justify-center items-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Guardar Nueva Contraseña"
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-400">¿Recordaste tu contraseña? </span>
          <Link to="/Login" className="text-blue-400 font-bold hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;