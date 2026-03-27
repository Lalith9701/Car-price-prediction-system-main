import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import "./auth.css";

export default function Auth() {

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [generatedOtp,setGeneratedOtp]=useState("");
  const [step,setStep]=useState("email");

  /* SEND OTP */
  const sendOtp=()=>{
    if(!email) return alert("Enter email");

    const newOtp=Math.floor(100000+Math.random()*900000).toString();
    setGeneratedOtp(newOtp);

    console.log("OTP:",newOtp);
    alert("OTP sent (check console)");
    setStep("otp");
  };

  /* VERIFY OTP */
  const verifyOtp=()=>{
    if(otp===generatedOtp){
      setStep("success");
      setTimeout(()=>navigate("/"),1500);
    }else alert("Wrong OTP");
  };

  /* GOOGLE LOGIN */
  const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    console.log("USER:", result.user);

    alert("Login success ✅");

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Google login failed ❌");
  }
};

  return(
  <div className="login-page">

    <div className="login-card">

      {step==="email" && (
        <>
          <h2>Login with OTP 📩</h2>

          <input
            placeholder="Enter email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />

          <button onClick={sendOtp}>Send OTP</button>

          <div className="or">OR</div>

          <button className="google" onClick={googleLogin}>
            Continue with Google
          </button>
        </>
      )}

      {step==="otp" && (
        <>
          <h2>Enter OTP 🔐</h2>

          <input
            placeholder="6 digit OTP"
            value={otp}
            onChange={e=>setOtp(e.target.value)}
          />

          <button onClick={verifyOtp}>Verify</button>
        </>
      )}

      {step==="success" && (
        <>
          <h2>✅ Login Successful</h2>
        </>
      )}

    </div>

  </div>
  );
}