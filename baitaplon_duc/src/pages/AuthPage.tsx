import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "../components/Login";
import Signup from "../components/Register";

const AuthPage: React.FC = () => {
  const { type } = useParams(); // "login" hoặc "signup"
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/")}>
      {type === "login" && <Login />}
      {type === "signup" && <Signup />}
    </Modal>
  );
};

export default AuthPage;
