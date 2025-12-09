import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface Props {
  onClose?: () => void;
}

const ForgotPassword: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/auth/reset", // trang reset mật khẩu
    });

    if (error) {
      setMessage("Email không hợp lệ hoặc không tồn tại.");
      return;
    }

    setMessage("Chúng tôi đã gửi email reset mật khẩu!");
    if (onClose) setTimeout(onClose, 1500);
  };

  return (
    <div>
      <h2>Quên mật khẩu</h2>

      <input
        type="email"
        placeholder="Nhập email..."
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset} style={{ marginTop: 10 }}>
        Gửi email reset
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
