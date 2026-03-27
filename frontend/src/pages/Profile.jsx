import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(localUser);
    setUser(parsed);

    const fetchMyCars = async () => {
      try {
        const res = await fetch("http://localhost:5050/cars");
        const data = await res.json();
        
        // Filter strictly bounded by the credentialed phone metadata mapped during submit
        const mine = data.filter(car => car.sellerPhone === parsed.phone);
        setMyListings(mine);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyCars();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/cars/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setMyListings(prev => prev.filter(c => c.id !== id));
      }
    } catch (e) {
      console.error("Deletion failed:", e);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.phone}</p>
        </div>
      </div>

      <div className="profile-content">
        <h2>My Active Listings ({myListings.length})</h2>
        {myListings.length === 0 ? (
          <p className="no-listings">You have no active vehicle listings.</p>
        ) : (
          <div className="listings-grid">
            {myListings.map(car => (
              <div key={car.id} className="listing-card">
                <img src={`http://localhost:5050/${car.images?.[0]}`} alt={car.name} />
                <div className="card-body">
                  <h3>{car.name}</h3>
                  <div className="card-details">
                    <span>{car.year}</span>
                    <span>{car.km} km</span>
                  </div>
                  <h4>₹ {car.price}</h4>
                  <button className="btn-delete" onClick={() => handleDelete(car.id)}>
                    Remove Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
