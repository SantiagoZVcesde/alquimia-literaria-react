import { useState } from "react";
import { Link } from "react-router-dom";
import { end_points } from "../services/api";
import { redirectAlert } from "../helpers/alerts";
import "../pages/PagesCss/Register.css"; // Reutilizamos tus estilos de formulario

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Credenciales administrativas para saltar el Spring Security básico en tus endpoints
  const credentialsBase64 = btoa("admin:admin123");

  const handleResetPassword = (e) => {
    e.preventDefault();

    // 1. Validación de campo vacío
    if (email.trim() === "") {
      return redirectAlert(
        "Campo requerido",
        "Por favor, ingresa tu correo electrónico para continuar.",
        "/forgot-password",
        "warning"
      );
    }

    setLoading(true);

    console.log("Solicitando recuperación para:", email);

    // 2. Petición POST al endpoint de recuperación de tu backend
    // Nota: Asegúrate de tener mapeado este endpoint en tu objeto end_points (ej: end_points.forgotPassword o el que corresponda)
    const targetEndpoint = end_points.forgotPassword || `${end_points.users}/forgot-password`;

    fetch(targetEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentialsBase64}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("El correo no se encuentra registrado en el sistema.");
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        redirectAlert(
          "Enlace Enviado",
          "Se ha enviado un correo con las instrucciones para restablecer tu contraseña.",
          "/Login",
          "success"
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        // Tip de contingencia: Si tu backend aún no tiene el servicio de correo configurado,
        // puedes simular el éxito aquí o alertar el error real de la API.
        redirectAlert(
          "Error de Solicitud",
          err.message || "No se pudo conectar con el servidor de Render.",
          "/forgot-password",
          "error"
        );
      });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#1a0f0a] to-[#0A1045] py-10 overflow-hidden">
      
      {/* BOTÓN VOLVER AL LOGIN */}
      <Link 
        to="/Login" 
        className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-widest"
      >
        ← VOLVER AL LOGIN
      </Link>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl mx-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-blue-200/60 text-sm mt-2 text-center negotiation-box">
            Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div>
            <label className="text-blue-200/80 text-xs ml-1 mb-1 block">
              Correo Electrónico
            </label>
            <input
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-all"
              placeholder="Zapatavillasantiago@gmail.com"
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
                "Enviar enlace de recuperación"
              )}
            </button>
          </div>
        </form>

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