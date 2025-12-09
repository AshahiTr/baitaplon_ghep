import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface LoginProps {
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    alert("Đăng nhập thành công!");

    // đóng modal nếu có onClose
    if (onClose) onClose();
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="Mật khẩu"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Đăng nhập</button>

      <p style={{ marginTop: 10 }}>
        <a href="/auth/forgot">Quên mật khẩu?</a>
      </p>
    </div>
  );
};

export default Login;
