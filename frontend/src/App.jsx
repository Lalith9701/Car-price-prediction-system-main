import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";

/* PAGES */
import Home from "./pages/Home";
import Listing from "./Listing";
import NewCars from "./NewCars";
import SellCar from "./SellCar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

/* DETAILS */
import CarDetails from "./CarDetails";
import UsedCarDetails from "./UsedCarDetails";

/* AUTH */
import Auth from "./Auth";
import Signup from "./Signup";

/* ⭐ PrivateRoute */
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/* ⭐ Layout controls Navbar visibility */
function Layout(){

  const location = useLocation();

  /* hide navbar on login pages */
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/auth";

  return(
    <>
      {!hideNavbar && <Navbar/>}

      <Routes>

        {/* MAIN (Protected) */}
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/used-cars" element={<PrivateRoute><Listing/></PrivateRoute>}/>
        <Route path="/listing" element={<PrivateRoute><Listing/></PrivateRoute>}/>
        <Route path="/new-cars" element={<PrivateRoute><NewCars/></PrivateRoute>}/>
        <Route path="/sell-car" element={<PrivateRoute><SellCar/></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>

        {/* DETAILS (Protected) */}
        <Route path="/car/:id" element={<PrivateRoute><CarDetails/></PrivateRoute>}/>
        <Route path="/used/:id" element={<PrivateRoute><UsedCarDetails/></PrivateRoute>}/>

        {/* AUTH (Public) */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/auth" element={<Auth/>}/>

      </Routes>
    </>
  );
}

/* ⭐ App root */
export default function App(){
  return(
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}