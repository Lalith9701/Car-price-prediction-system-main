import { useState } from "react";
import "./App.css";

export default function BookingModal({ car, onClose }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    date: ""
  });

  const [done, setDone] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitBooking() {
    if (!form.name || !form.phone || !form.city || !form.date) {
      alert("Fill all details");
      return;
    }

    console.log("BOOKING DATA:", {
      car: car.name,
      ...form
    });

    setDone(true);
  }

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        {done ? (
          <>
            <h2>✅ Booking Confirmed!</h2>
            <p>Your test drive for <b>{car.name}</b> is scheduled.</p>
            <button onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <h2>Book Test Drive – {car.name}</h2>

            <input 
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
            />

            <input 
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input 
              name="city"
              placeholder="City"
              onChange={handleChange}
            />

            <input 
              type="date"
              name="date"
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="cancel" onClick={onClose}>Cancel</button>
              <button className="confirm" onClick={submitBooking}>
                Confirm Booking
              </button>
            </div>
          </>
        )}

      </div>

    </div>
  );
}
