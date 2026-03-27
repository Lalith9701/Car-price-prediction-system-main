import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";
import "./ProfessionalProfile.css";
import { useTranslation } from "react-i18next";

export default function Navbar(){

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [user,setUser] = useState(null);
  const [open,setOpen] = useState(false);

  useEffect(()=>{
    const localUser = localStorage.getItem("user");
    if (localUser) {
      try {
        const u = JSON.parse(localUser);
        // Map phone to email if it's stored that way, or just use u.email if exists
        setUser({ ...u, displayName: u.name, email: u.email || u.phone || "" });
      } catch(e) {}
    } else {
      const unsub = onAuthStateChanged(auth, u => setUser(u));
      return () => unsub();
    }
  },[]);

  const logout=async()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try { await signOut(auth); } catch(e){}
    setOpen(false);
    window.location.href = "/";
  };

  return(
    <nav className="tesla-nav">

      {/* LEFT */}
      <div className="nav-left" onClick={()=>navigate("/")}>
        <h2 className="tesla-logo">HUB Cars 🚙</h2>
      </div>

      {/* CENTER NAV LINKS */}
      <div className="nav-center">
        <Link to="/">{t("home")}</Link>
        <Link to="/listing">{t("usedCars")}</Link>
        <Link to="/new-cars">{t("newCars")}</Link>
        <Link to="/sell-car">{t("sellCar")}</Link>
     </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* ⭐ PROFILE */}
        <div className="profile-wrapper">

          <FiUser
            className="nav-icon login"
            onClick={()=>{
              if(!user) navigate("/login");
              else setOpen(!open);
            }}
          />

          {open && user && (
            <div className="profile-dropdown professional">
              <div className="profile-header">
                <img
                  src={user.gender === "Female" ? `https://avatar.iran.liara.run/public/girl?username=${user.displayName || "user"}` : `https://avatar.iran.liara.run/public/boy?username=${user.displayName || "user"}`}
                  className="drop-photo"
                  alt="user"
                />
                <div className="profile-info">
                  <h3>{user.displayName || "HUB User"}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="btn-settings"
                  onClick={()=>{setOpen(false); navigate("/profile");}}
                >
                  My Profile
                </button>

                <button className="btn-logout" onClick={logout}>
                  Logout
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}