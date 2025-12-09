import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import Modal from "./components/Modal";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

// Component modal Login / Register
const AuthPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/")}>
      {type === "login" ? (
        <Login onClose={() => navigate("/")} />
      ) : type === "register" ? (
        <Register onClose={() => navigate("/")} />
      ) : null}
    </Modal>
  );
};

// Component modal Forgot Password
const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/")}>
      <ForgotPassword onClose={() => navigate("/")} />
    </Modal>
  );
};

// Component modal Reset Password
const ResetPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/")}>
      <ResetPassword onClose={() => navigate("/")} />
    </Modal>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Trang chính */}
        <Route path="/" element={<Home />} />

        {/* Login / Register */}
        <Route path="/auth/:type" element={<AuthPage />} />

        {/* Quên mật khẩu */}
        <Route path="/auth/forgot" element={<ForgotPasswordPage />} />

        {/* Reset mật khẩu */}
        <Route path="/auth/reset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;