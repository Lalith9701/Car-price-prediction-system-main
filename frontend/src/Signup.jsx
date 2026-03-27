import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./pages/Login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSignup = async () => {
    if (!name || !phone || !password) {
      alert("Fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password, gender })
      });
      const data = await res.json();
      if (data.success) {
        alert("Registration successful!");
        nav("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Create Account</h2>
        <p className="sub">Join HUB Cars today</p>

        <div className="field">
          <input 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label>Full Name</label>
        </div>

        <div className="field">
          <input 
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <label>Phone Number</label>
        </div>

        <div className="field">
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <div style={{display: "flex", gap: "20px", marginBottom: "20px", color: "white", justifyContent: "center"}}>
          <label style={{cursor:"pointer", display:"flex", alignItems:"center", gap:"5px"}}>
            <input type="radio" value="Male" checked={gender==="Male"} onChange={e=>setGender(e.target.value)} />
            Male
          </label>
          <label style={{cursor:"pointer", display:"flex", alignItems:"center", gap:"5px"}}>
            <input type="radio" value="Female" checked={gender==="Female"} onChange={e=>setGender(e.target.value)} />
            Female
          </label>
        </div>

        <button className="primary" onClick={handleSignup} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{color: "#1890ff"}}>Login</Link>
        </p>

        <small className="terms">
          By continuing you agree to Terms & Privacy
        </small>
      </div>
    </div>
  );
}
