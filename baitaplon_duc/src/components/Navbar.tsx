import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <nav style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
      {user ? (
        <>
          <span>Xin chào, {user.email}</span>
          <button onClick={logout} style={{ marginLeft: 16 }}>
            Đăng xuất
          </button>
        </>
      ) : (
        <>
          <Link to="/auth/login">Đăng nhập</Link>
          <Link to="/auth/register" style={{ marginLeft: 16 }}>
            Đăng ký
          </Link>
        </>
      )}
    </nav>
  );
}
