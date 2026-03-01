"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) return;

    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        .admin-bg {
          height: 100vh;
          background: radial-gradient(circle at 30% 30%, #1c1205, #000);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* subtle golden glow */
        .admin-bg::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%);
          animation: glowMove 8s ease-in-out infinite alternate;
        }

        @keyframes glowMove {
          from { transform: translate(-20%, -20%); }
          to { transform: translate(20%, 20%); }
        }

        .admin-card {
          width: 360px;
          padding: 50px 40px;
          background: rgba(253,250,243,0.06);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(201,168,76,0.25);
          box-shadow: 0 12px 40px rgba(139,105,20,0.25);
          text-align: center;
          position: relative;
        }

        .admin-title {
          font-family: 'Great Vibes', cursive;
          font-size: 2.4rem;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #F5E6B8, #C9A84C, #8B6914);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s ease-in-out infinite;
          margin-bottom: 30px;
        }

        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .admin-input {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(255,255,255,0.08);
          color: #F5E6B8;
          outline: none;
          margin-bottom: 20px;
          font-family: 'Cinzel', serif;
          letter-spacing: 2px;
        }

        .admin-input::placeholder {
          color: rgba(245,230,184,0.5);
        }

        .admin-btn {
          width: 100%;
          padding: 12px;
          font-family: 'Cinzel', serif;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #F0D478, #C9A84C, #8B6914);
          background-size: 200% 100%;
          border: none;
          color: #1a0e00;
          cursor: pointer;
          animation: shimmer 4s ease-in-out infinite;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,105,20,0.5);
        }

        .admin-footer {
          margin-top: 25px;
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: rgba(245,230,184,0.4);
        }
      `}</style>

      <div className="admin-bg">
        <div className="admin-card">
          <div className="admin-title">Admin Access</div>

          <input
            type="password"
            placeholder="Enter Secret Key"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="admin-btn"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <div className="admin-footer">
            Wedding Management Panel
          </div>
        </div>
      </div>
    </>
  );
}