import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../Pages/NotFound";

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
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }

]);