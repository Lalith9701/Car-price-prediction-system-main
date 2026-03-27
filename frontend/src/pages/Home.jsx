import { useNavigate, Link } from "react-router-dom";
import "../App.css";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero-section">
  <img src="/professional_car_hero_dark.png" className="hero-bg" alt="Luxury Corporate Car" />
  <div className="hero-content">
    <h1>Experience <span>Luxury</span></h1>
    <p>Discover premium new & used cars at unbeatable prices.</p>
  </div>
  <div className="hero-buttons">
  <Link to="/new-cars" className="hero-btn btn-explore">
    Explore New Cars
  </Link>

  <Link to="/used-cars" className="hero-btn btn-used">
    Used Cars
  </Link>

  <Link to="/sell-car" className="hero-btn btn-sell">
    Sell Your Car
  </Link>
</div>

</section>

      {/* ===== FEATURED ===== */}
      <section className="featured-section">
        <h2 className="featured-title">🔥 Featured Cars</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <img src="/cars/Evitara.jpg" alt="Maruti Suzuki" />
            <h3>eVITARA</h3>
            <p>₹17 lakh – ₹22.5 lakh</p>
          </div>

          <div className="featured-card">
            <img src="/cars/volkswagen_tayron.jpg" alt="Volkswagen Tayron" />
            <h3>Tayron R-Line</h3>
            <p>₹40.00 - ₹45.00 Lakh</p>
          </div>

          <div className="featured-card">
            <img src="/cars/BMW iX4.jpg" alt="BMW iX4" />
            <h3>BMW iX4</h3>
            <p>₹85 Lakh – ₹1.10 Crore</p>
          </div>

          <div className="featured-card">
            <img src="/cars/Highlander EV.jpg" alt="Tata" />
            <h3>Highlander EV</h3>
            <p>₹65 lakh – ₹80 lakh</p>
          </div>
          <div className="featured-card">
            <img src="/cars/Porsche Cayenne Electric.jpg" alt="Porsche" />
            <h3>Porsche Cayenne Electric</h3>
            <p>₹1.75 – 1.76 crore</p> 
          </div>
        </div>
      </section>

      {/* ===== TRENDING ===== */}
      <section className="trending-section">
        <h2 className="trending-title">🚀 Trending Cars</h2>
        <div className="trending-grid">
          <div className="trending-card">
           <img src="/cars/punch.jpg" alt="Punch" />
           <h3>Tata Punch</h3>
           <p>₹8.29 lakh – ₹9.79 lakh</p>
          </div>
         
          <div className="trending-card">
            <img src="/cars/Tesla Model Y.jpg" alt="Tesla" />
            <h3>Tesla Model Y</h3>
            <p>₹61 lakh – ₹69 lakh+</p>
          </div>

          <div className="trending-card">
            <img src="/cars/Ford F-Series.jpg" alt="Ford" />
            <h3>Ford F-Series</h3>
            <p>₹90 lakh – ₹98 lakh</p>
          </div>

          <div className="trending-card">
            <img src="/cars/thar.jpg" alt="Mahindra Thar" />
            <h3>Mahindra Thar</h3>
            <p>₹12L+</p>
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="section dark">
        <h2>Top Brands</h2>
        <div className="brand-row">
          <img src="/logos/tata.png" alt="" />
          <img src="/logos/bmw.png" alt="" />
          <img src="/logos/hyundai.png" alt="" />
          <img src="/logos/Audi.png" alt="" />
          <img src="/logos/mercedes.png" alt="" />
          <img src="/logos/toyota.png" alt="" />
          <img src="/logos/porsche.png" alt="" />
        </div>
      </section>

      {/* ===== WHY ===== */}
      <section className="section light">
        <h2>Why Choose HUB Cars?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>✔ Verified Listings</h3>
            <p>100% genuine & trusted car listings.</p>
          </div>

          <div className="why-card">
            <h3>⚡ Instant Price</h3>
            <p>Get real-time market value instantly.</p>
          </div>

          <div className="why-card">
            <h3>🔒 Secure Deals</h3>
            <p>Safe and transparent transactions.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta">
        <h2>Ready to Find Your Perfect Car?</h2>
        <button onClick={() => navigate("/new-cars")}>
          Explore Now
        </button>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <h3>HUB Cars</h3>
        <p>India’s Smartest Car Marketplace 🚗</p>
        <p>© 2026 HUB Cars. All rights reserved.</p>
      </footer>
    </div>
  );
}
