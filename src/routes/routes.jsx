import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import ProtectedRoute from "./ProtectedRoute";

const protectedElement = (Component) => (
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
);
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={protectedElement(Profile)} />
        <Route path="/" element={protectedElement(Chats)} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
