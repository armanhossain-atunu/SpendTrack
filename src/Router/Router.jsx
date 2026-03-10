import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  }

]);