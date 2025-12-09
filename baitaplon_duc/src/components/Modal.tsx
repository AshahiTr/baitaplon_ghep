import React from "react";

interface Props { children: React.ReactNode; onClose: () => void; }

export default function Modal({ children, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50
      }}
      onClick={onClose}
    >
      <div style={{ background: "white", borderRadius: 8, padding: 20, minWidth: 320 }} onClick={(e)=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
