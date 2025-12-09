import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface Props {
  onClose?: () => void;
}

const ResetPassword: React.FC<Props> = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSetPassword = async () => {
    if (!password || password.length < 6) {
      setMsg("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMsg("Đổi mật khẩu thất bại: " + error.message);
      return;
    }

    setMsg("Đổi mật khẩu thành công!");
    
    // Đóng modal sau 2 giây
    setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>

      <input
        type="password"
        placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", margin: "8px 0", padding: 8 }}
      />

      <button onClick={handleSetPassword} style={{ width: "100%", padding: 10 }}>
        Đổi mật khẩu
      </button>

      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </div>
  );
};

export default ResetPassword;