import {Cart} from "../pages/Cart";
import Home from "../pages/Home";
import {Library} from "../pages/Library";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";

const routerApp = [
    {
        path: "/",
        element: <App />,
        
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/library",
        element: <Library />,
    },
    {
        path: "/cart",
        element: <Cart />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];

export default routerApp;