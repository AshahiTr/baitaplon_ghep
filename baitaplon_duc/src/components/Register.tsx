import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Register: React.FC<{onClose?: ()=>void}> = ({onClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !password) { 
      setMessage("Vui lòng nhập email & mật khẩu."); 
      return; 
    }

    // Đăng ký với metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '', // Lưu vào metadata
        },
        // Nếu bạn muốn tắt email confirmation trong lúc dev:
        // emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      setMessage(error.message);
      console.error("Signup error:", error);
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Kiểm tra nếu cần xác nhận email
    if (data.user && !data.session) {
      setMessage("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
    } else {
      setMessage("Đăng ký thành công!");
    }

    setEmail(""); 
    setPassword("");
    setFullName("");
    
    setTimeout(() => { 
      setMessage(""); 
      onClose && onClose(); 
    }, 3000);
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      
      <input 
        placeholder="Họ tên" 
        value={fullName} 
        onChange={e=>setFullName(e.target.value)} 
        style={{width:"100%",margin:"8px 0",padding:8}} 
      />
      
      <input 
        placeholder="Email" 
        type="email"
        value={email} 
        onChange={e=>setEmail(e.target.value)} 
        style={{width:"100%",margin:"8px 0",padding:8}} 
      />
      
      <input 
        placeholder="Mật khẩu (tối thiểu 6 ký tự)" 
        type="password" 
        value={password} 
        onChange={e=>setPassword(e.target.value)} 
        style={{width:"100%",margin:"8px 0",padding:8}} 
      />
      
      <button 
        onClick={handleRegister} 
        style={{width:"100%",padding:10, marginTop: 8}}
      >
        Đăng ký
      </button>
      
      {message && <p style={{marginTop:10, color: message.includes('thành công') ? 'green' : 'red'}}>{message}</p>}
    </div>
  );
};

export default Register;