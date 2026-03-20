import { useState } from "react";
import { Lock, User } from "lucide-react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(username, password)) {
      setError("Invalid credentials. Try user1 / user");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-panel">
        <h2 className="text-gradient">Welcome Back</h2>
        <p className="text-muted" style={{ textAlign: "center" }}>
          Sign in to your EarnSure account
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {error && <div className="text-danger" style={{ textAlign: "center" }}>{error}</div>}
          
          <div style={{ position: "relative" }}>
            <User size={20} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={20} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--text-muted)" }} />
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
          </div>

          <button type="submit" className="btn btn-primary flex-center" style={{ width: "100%", justifyContent: "center" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
