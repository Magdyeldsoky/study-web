import { Routes, Route, Navigate } from "react-router-dom";

import StartPage from "@/pages/StartPage";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import CodePage from "@/pages/code";
import Home from "@/pages/Home";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/code" element={<CodePage />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
