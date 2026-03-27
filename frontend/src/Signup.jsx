import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    alert("Signup successful (demo)");
    nav("/login");
  };

  return (
    <div className="auth-page">
      <h1>Create Account</h1>

      <input 
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Sign Up</button>

      <p>
        Already have account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
