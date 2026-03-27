import { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){

  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!phone || !password) {
      alert("Enter phone and password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful ✅");
        window.location.href = "/"; // Force refresh to update Navbar state
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="login-page">

      <div className="login-card">

        <h2 className="title">
          Login to HUB Cars
        </h2>
        <p className="sub">Secure user authentication</p>

        <div className="field">
          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
          />
          <label>Phone Number </label>
        </div>

        <div className="field">
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <label>Password </label>
        </div>

        <button className="primary" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Don't have an account? <Link to="/signup" style={{color: "#1890ff"}}>Sign up</Link>
        </p>

        <small className="terms">
          By continuing you agree Terms & Privacy
        </small>

      </div>

    </div>
  );
}