import { createBrowserRouter } from "react-router";
import Login from "../Components/Login";
import Register from "../Components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);