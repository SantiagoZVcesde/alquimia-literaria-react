import React from "react";
import { Navigate } from "react-router-dom"; 
import { Cart } from "../pages/Cart";
import Home from "../pages/Home";
import { Library } from "../pages/Library";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword"; // Importamos tu recuperación de clave
import AdminDashboard from "../pages/AdminDashboard"; // Importamos tu nuevo panel de control
import App from "../App";

const routerApp = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />, // Ruta lista para la recuperación de contraseña
      },
      {
        path: "admin",
        element: <AdminDashboard />, // Ruta protegida internamente para GHT Corp / Alquimia Admin
      },
      {
        path: "*",
        element: <Navigate to="/" />, // Comodín al final para redirigir cualquier error de tipeo
      },
    ],
  },
];

export default routerApp;