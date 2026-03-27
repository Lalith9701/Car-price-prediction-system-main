import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

/* COMPONENTS */
import Navbar from "./components/Navbar";

/* PAGES */
import Home from "./pages/Home";
import Listing from "./Listing";
import NewCars from "./NewCars";
import SellCar from "./SellCar";
import Login from "./pages/Login";

/* DETAILS */
import CarDetails from "./CarDetails";
import UsedCarDetails from "./UsedCarDetails";

/* AUTH */
import Auth from "./Auth";


/* ⭐ Layout controls Navbar visibility */
function Layout(){

  const location = useLocation();

  /* hide navbar on login */
  const hideNavbar =
    location.pathname === "/login";

  return(
    <>
      {!hideNavbar && <Navbar/>}

      <Routes>

        {/* MAIN */}
        <Route path="/" element={<Home/>}/>
        <Route path="/used-cars" element={<Listing/>}/>
        <Route path="/listing" element={<Listing/>}/>
        <Route path="/new-cars" element={<NewCars/>}/>
        <Route path="/sell-car" element={<SellCar/>}/>

        {/* DETAILS */}
        <Route path="/car/:id" element={<CarDetails/>}/>
        <Route path="/used/:id" element={<UsedCarDetails/>}/>

        {/* AUTH */}
        <Route path="/login" element={<Login/>}/>
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