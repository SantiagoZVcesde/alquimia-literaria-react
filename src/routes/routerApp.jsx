import { Navigate } from "react-router-dom"; // Importamos Navigate para redireccionar
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
                path: "*",
                element: <Navigate to="/" />,
            },
        ],
    },
];

export default routerApp;