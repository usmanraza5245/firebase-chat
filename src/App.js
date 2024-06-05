import React from "react";
import AppRoutes from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
