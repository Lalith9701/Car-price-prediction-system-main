import { Link, useNavigate } from "react-router-dom";
import { FiHelpCircle, FiUser, FiMapPin, FiGlobe } from "react-icons/fi";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

export default function Navbar(){

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [user,setUser] = useState(null);
  const [open,setOpen] = useState(false);
  const [helpOpen,setHelpOpen] = useState(false);
  const [langOpen,setLangOpen] = useState(false);

  /* ⭐ LANGUAGE */
  const changeLang=(lng)=>{
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  /* ⭐ LOCATION */
  const [locationOpen,setLocationOpen] = useState(false);
  const [search,setSearch] = useState("");
  const [selectedCity,setSelectedCity] = useState("");

  const cities=[
    "Hyderabad","Bangalore","Chennai","Mumbai","Delhi","Pune",
    "Kolkata","Ahmedabad","Jaipur","Lucknow","Nagpur","Indore",
    "Patna","Vadodara","Ghaziabad","Navi Mumbai",
    "Thane","Bhopal","Visakhapatnam","Pimpri-Chinchwad",
    "Ludhiana","Agra","Nashik","Faridabad","Meerut","Rajkot",
    "Kalyan-Dombivli","Vasai-Virar","Varanasi","Srinagar",
    "Aurangabad","Dhanbad","Amritsar","Nanded","Allahabad",
    "Howrah","Gwalior","Jabalpur","Coimbatore","Vijayawada",
    "Jodhpur","Madurai","Raipur","Kota","Guwahati","Chandigarh",
    "Solapur","Hubli-Dharwad","Mysore","Tiruchirappalli",
    "Bareilly","Aligarh","Moradabad","Jalandhar","Bhubaneswar",
    "Salem","Warangal","Guntur","Bhiwandi","Saharanpur",
    "Gorakhpur","Amravati","Bikaner","Noida","Jamshedpur",
    "Bhilai","Cuttack","Firozabad","Kochi","Nellore",
    "Bhavnagar","Dehradun","Durgapur","Pulivendula",
    "Asansol","Rourkela","Nizamabad","Kolhapur","Ajmer",
    "Gulbarga","Jamnagar","Ujjain","Loni","Siliguri",
    "Jhansi","Ulhasnagar","Mangalore","Belgaum",
    "Ambattur","Tirunelveli","Malegaon","Gaya","Jalgaon",
    "Udaipur","Maheshtala","Davanagere","Kamarhati",
    "Rohtak","Kakinada","Bardhaman","Yamunanagar",
    "Tiruppur","Muzaffarnagar", "Bilaspur","Ahmednagar","Panipat","Latur",
    "Dhule","Darbhanga","Nagercoil","Korba","Ballari",
    "Bhatpara","Pali","Deoghar","Khandwa","Barasat",
    "Ongole","Gopalpur","Ramagundam","Karimnagar",
    "Darjeeling","Etawah","Kaithal","Bharatpur",
    "Begusarai","New Delhi","Tirupati","Hapur","Sikar","Panchkula","Satara",
    "Mokokchung","Dimapur","Tuensang","Kohima","Wokha",

  ];

  const filtered=cities.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,u=>setUser(u));
    return ()=>unsub();
  },[]);

  const logout=async()=>{
    await signOut(auth);
    setOpen(false);
    navigate("/");
  };

  const chooseCity=(city)=>{
    setSelectedCity(city);
    setSearch(city);
    setLocationOpen(false);
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

        {/* ⭐ LANGUAGE */}
        <div className="lang-wrapper">
          <FiGlobe
            className="nav-icon"
            onClick={()=>setLangOpen(!langOpen)}
          />

          {langOpen && (
            <div className="lang-dropdown">
              <p onClick={()=>changeLang("en")}>🇬🇧 English</p>
              <p onClick={()=>changeLang("te")}>🇮🇳 Telugu</p>
              <p onClick={()=>changeLang("hi")}>🇮🇳 Hindi</p>
            </div>
          )}
        </div>

        {/* ⭐ HELP */}
        <div className="help-wrapper">
          <FiHelpCircle
            className="nav-icon"
            onClick={()=>setHelpOpen(!helpOpen)}
          />

          {helpOpen && (
            <div className="help-dropdown">
              <p onClick={()=>navigate("/FAQ")}>{t("FAQ")}</p>
              <p onClick={()=>navigate("/support")}>{t("ContactSupport")}</p>
              <p onClick={()=>navigate("/seller-support")}>{t("ChatSeller")}</p>
              <p onClick={()=>navigate("/sell-guide")}>{t("SellGuide")}</p>
            </div>
          )}
        </div>

        {/* ⭐ LOCATION */}
        <div className="location-wrapper">

          <FiMapPin
            className="nav-icon"
            onClick={()=>setLocationOpen(!locationOpen)}
          />

          {locationOpen && (
            <div className="location-dropdown">

              <input
                className="location-search"
                placeholder={t("searchCity")}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />

              <div className="location-list">
                {filtered.map(city=>(
                  <div
                    key={city}
                    className="city-item"
                    onClick={()=>chooseCity(city)}
                  >
                    {city}
                  </div>
                ))}

                {filtered.length===0 && (
                  <span className="no-city">{t("noCity")}</span>
                )}
              </div>

            </div>
          )}
        </div>

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
            <div className="profile-dropdown">

              <img
                src={user.photoURL || "/user.png"}
                className="drop-photo"
                alt="user"
              />

              <h3>{user.displayName || "HUB User"}</h3>
              <p>{user.email}</p>

              <button
                className="settings-btn"
                onClick={()=>navigate("/profile")}
              >
                {t("myProfile")}
              </button>

              <button className="logout-btn" onClick={logout}>
                {t("logout")}
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}