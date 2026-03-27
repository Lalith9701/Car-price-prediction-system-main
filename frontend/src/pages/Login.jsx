import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login(){

  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

 const sendOtp=()=>{
  setLoading(true);
  alert("OTP sent");
  navigate("/");

  setTimeout(()=>{
    setLoading(false);
    alert("OTP sent to "+email);
  },1500);
};

 const loginWithGoogle = async()=>{
  try{
    await signInWithPopup(auth,googleProvider);

    alert("Login success ✅");

    navigate("/");   // ⭐ THIS LINE IMPORTANT
  }catch(err){
    console.log(err);
    alert("Login failed");
  }
};

  return(
    <div className="login-page">

      <div className="login-card">

        <h2 className="title">
          Login to HUB Cars
        </h2>
        <p className="sub">Secure developer authentication</p>

        <div className="field">
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <label>Sign in Email </label>
        </div>

        <button className="primary" onClick={sendOtp}>
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <div className="divider">OR</div>

        <button className="google" onClick={loginWithGoogle}>
          Continue with Google
        </button>

        <small className="terms">
          By continuing you agree Terms & Privacy
        </small>

      </div>

    </div>
  );
}