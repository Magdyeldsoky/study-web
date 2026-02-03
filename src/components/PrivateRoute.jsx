import React from "react";
import { Navigate } from "react-router-dom";

// استبدل هذا بفحص حقيقي للمستخدم مسجل دخول
const isAuthenticated = () => {
  // مثال: نستخدم localStorage أو context
  return localStorage.getItem("userLoggedIn") === "true";
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // لو مش مسجل دخول، نروح للـ login
    return <Navigate to="/login" replace />;
  }
  // لو مسجل دخول، نسمح بالدخول للصفحة
  return children;
};

export default PrivateRoute;
