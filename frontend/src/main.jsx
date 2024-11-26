import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import RegisterPage from "./Components/RegisterPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import VerifyOTP from "./Components/VerifyOTP.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "verifyOTP",
    element: <VerifyOTP />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
