import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass, ShieldCheck, Milestone, Sparkles, Bike,Clock } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import { bikes } from '../data/bikes';
import scooty1 from "../assets/scooty1.jpg";
import scooty2 from "../assets/scooty2.jpg";
import scooty3 from "../assets/scooty3.png";

export default function Home({ setActiveTab, onBookBike, onSubscribe }) {
  const [searchLocation, setSearchLocation] = useState('Downtown Core');
  const [searchType, setSearchType] = useState('All');

  const featuredBikes = bikes.filter(b => b.featured);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('explore');
    // We can also pass state or perform scroll when in catalog, which we will handle.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in-up">
            <span className="badge badge-primary hero-badge">
              <Sparkles size={12} />
              <span>THE NEXT-GEN BIKE SHARING PLATFORM</span>
            </span>
            <h1 className="hero-title">
              Experience the Future of <span className="text-glow">Two-Wheel</span> Travel
            </h1>
            <p className="hero-subtitle-desc">
              Unlock a premium fleet of carbon-frame road racers, intelligent e-bikes, and trail-taming mountain giants. Instant digital checkout, live GPS telemetry tracking, and zero-liability premium insurance.
            </p>
            <div className="hero-buttons">
              <button onClick={() => setActiveTab('explore')} className="btn btn-primary">
                Explore Fleet Catalog
              </button>
              <button onClick={() => setActiveTab('contact')} className="btn btn-outline">
                Contact Support
              </button>
            </div>
          </div>

          {/* Glass Search Panel */}
          <div className="hero-search-wrapper animate-fade-in-up">
  <form
    onSubmit={handleSearchSubmit}
    className="search-panel glass-panel"
  >
    <h3 className="panel-title">
      Find Your Perfect Ride
    </h3>

    <div className="panel-fields">

      {/* Location & Fleet Type */}
      <div className="panel-row">

        <div className="input-group">
          <span className="input-label">
            <MapPin size={12} /> Station Location
          </span>

          <select
            className="input-field select-field"
            value={searchLocation}
            onChange={(e) =>
              setSearchLocation(e.target.value)
            }
          >
            <option value="Tirupati">
              Tirupati
            </option>
          </select>
        </div>

        <div className="input-group">
          <span className="input-label">
            <Compass size={12} /> Fleet Type
          </span>

          <select
            className="input-field select-field"
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>
            <option value="Scooter">
              Scooter
            </option>
            <option value="Bike">
              Bike
            </option>
          </select>
        </div>

      </div>


<div className="panel-row">

  {/* Pick-up Date */}
  <div className="input-group">
    <span className="input-label">
      <Calendar size={12} /> Pick-up Date
    </span>
    <input
      type="date"
      className="input-field"
      defaultValue={new Date().toISOString().split("T")[0]}
    />
  </div>

  {/* Pick-up Time */}
  <div className="input-group">
    <span className="input-label">
      <Clock size={12} /> Pick-up Time
    </span>
    <input
      type="time"
      className="input-field"
      defaultValue="09:00"
    />
  </div>

  {/* Drop-off Date */}
  <div className="input-group">
    <span className="input-label">
      <Calendar size={12} /> Drop-off Date
    </span>
    <input
      type="date"
      className="input-field"
      defaultValue={new Date().toISOString().split("T")[0]}
    />
  </div>

  {/* Drop-off Time */}
  <div className="input-group">
    <span className="input-label">
      <Clock size={12} /> Drop-off Time
    </span>
    <input
      type="time"
      className="input-field"
      defaultValue="18:00"
    />
  </div>

</div>
      

      {/* Search Button */}
      <button
        type="submit"
        className="btn btn-primary w-full search-submit-btn"
      >
        <Search size={18} />
        <span>Search Availability</span>
      </button>

    </div>
  </form>
</div>
</div>
</section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Engineered to Transcend</h2>
            <p className="section-subtitle">
              We did not just build a bike rental app. We re-imagined the urban transit grid from the wheels up.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="feature-icon-bg">
                <Milestone className="feature-icon" />
              </div>
              <h3>Hot-Swappable Hubs</h3>
              <p>Pick up in Downtown, lock and drop at the Waterfront. Complete municipal routing freedom across 45 modular Velo docks.</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-bg">
                <Sparkles className="feature-icon" fill="var(--primary)" />
              </div>
              <h3>Active IoT Telemetry</h3>
              <p>Keep real-time watch on speed, remaining distance, elevation gains, and smart battery health from your dynamic live dashboard.</p>
            </div>

            <div className="feature-card glass-panel">
              <div className="feature-icon-bg">
                <ShieldCheck className="feature-icon" />
              </div>
              <h3>Zero Deductible Waiver</h3>
              <p>Every single rental includes top-tier comprehensive insurance covering mechanical damage, structural scrapes, and flat tires.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us / Our Story Section */}
      <section className="about-us-section">
        <div className="container about-container">
          <div className="about-visual-box glass-panel">
            <svg viewBox="0 0 100 100" className="about-vector-svg animate-float">
              <defs>
                <radialGradient id="about-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#about-glow)" />
              <circle cx="50" cy="50" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
              <path d="M 50 15 A 35 35 0 0 1 85 50" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4,2" />
              <path d="M 50 85 A 35 35 0 0 1 15 50" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
              <Bike className="about-svg-bike" x="38" y="38" width="24" height="24" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="about-text-content">
            <span className="badge badge-secondary">Our Story</span>
            <h2 className="section-title">Rethinking Urban Transit</h2>
            <p className="about-para">
              Founded by passionate green energy advocates and precision mechanical engineers, Velovolt was born to solve last-mile congestion while making the journey exhilarating.
            </p>
            <p className="about-para">
              We started with a handful of custom carbon frames in a small workshop. Today, we are proud to power a premium, fully connected digital fleet across major smart city corridors. We believe in absolute mechanical reliability, clean renewable energy, and designing travel experiences that make you look forward to the commute.
            </p>
            <div className="about-stats-mini">
              <div className="mini-stat">
                <h3>99.9%</h3>
                <span>Ride Uptime</span>
              </div>
              <div className="mini-stat">
                <h3>150k+</h3>
                <span>Green Kilometers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="featured-fleet-section">
        <div className="container">
        <div className="section-header-flex">
        <div className="header-left">
        <h2 className="section-title">The Featured Fleet</h2>
        <p className="section-subtitle">
          Choose from our most popular bikes and scooters.
        </p>
      </div>

      <button
        onClick={() => setActiveTab("explore")}
        className="btn btn-secondary"
      >
        View Entire Fleet
      </button>
    </div>

    <div className="featured-bikes-grid">
      <div className="bike-showcase">
        <img src={scooty1} alt="Suzuki Access 125" />
        <div className="bike-price">₹21/hr</div>
      </div>

      <div className="bike-showcase">
        <img src={scooty2} alt="TVS Jupiter 125" />
        <div className="bike-price">₹24/hr</div>
      </div>

      <div className="bike-showcase">
        <img src={scooty3} alt="Royal Enfield Bullet 350" />
        <div className="bike-price">₹56/hr</div>
      </div>
    </div>
  </div>
</section>

      {/* Subscription Passes Section */}
      <section className="subscriptions-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Velo Premium Passes</h2>
            <p className="section-subtitle">Unlock unlimited rides, free e-bike hours, and priority hot-swaps with our monthly memberships.</p>
          </div>

          <div className="subscriptions-grid">
            {/* Pass 1 */}
            <div className="pass-card glass-panel">
              <div className="pass-header">
                <span className="badge badge-secondary">Daily Rider</span>
                <h3>City Commuter</h3>
                <div className="pass-price">
                  <span className="price-val">₹999</span>
                  <span className="price-unit">/month</span>
                </div>
              </div>
              <ul className="pass-features">
                <li>✓ Free first 30 mins on all Urban bikes</li>
                <li>✓ 15% discount on subsequent hours</li>
                <li>✓ Integrated damage insurance waiver</li>
                <li>✗ Electric E-Bike priority hot-swaps</li>
              </ul>
              <button 
                onClick={() => onSubscribe('City Commuter Pass')} 
                className="btn btn-secondary w-full"
              >
                Subscribe to Commuter
              </button>
            </div>

            {/* Pass 2 - Volt Elite */}
            <div className="pass-card glass-panel pass-card-featured">
              <div className="featured-ribbon">POPULAR CHOICE</div>
              <div className="pass-header">
                <span className="badge badge-primary">Unlimited Access</span>
                <h3>Volt Elite Pass</h3>
                <div className="pass-price">
                  <span className="price-val">₹2,499</span>
                  <span className="price-unit">/month</span>
                </div>
              </div>
              <ul className="pass-features">
                <li>✓ Free first 60 mins on ALL bikes (inc. E-Bikes)</li>
                <li>✓ 25% discount on subsequent hours</li>
                <li>✓ Full zero-liability damage waiver</li>
                <li>✓ Priority e-bike hot-swaps & displays</li>
                <li>✓ Free GPS HUD navigational add-on</li>
              </ul>
              <button 
                onClick={() => onSubscribe('Volt Elite Pass')} 
                className="btn btn-primary w-full"
              >
                Subscribe to Volt Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">What Veloriders Say</h2>
            <p className="section-subtitle">Real experiences from riders who swapped their steering wheels for handle grips.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card glass-panel">
              <p className="quote">"Bengaluru traffic is legendary. Swapping my car for the Volt Cruiser e-bike was the best decision! I completely skip the massive traffic queues, and the pedal-assist means I reach my office fresh without sweating."</p>
              <div className="author-row">
                <div className="author-avatar av-1">RS</div>
                <div>
                  <h4>Rohan Sharma</h4>
                  <span>IT Professional, Bengaluru</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-panel">
              <p className="quote">"Evening rides along Mumbai's Marine Drive on the Velo City Commuter are absolute bliss! Scanning the QR code to unlock is super smooth, and it is far more practical than hailing local cabs in rush hour."</p>
              <div className="author-row">
                <div className="author-avatar av-2">PN</div>
                <div>
                  <h4>Priya Nair</h4>
                  <span>Product Designer, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-panel">
              <p className="quote">"Early mornings in Lutyens' Delhi are perfect for speed. The Sonic Streamliner Road bike is a pure carbon masterpiece—feather-light, aerodynamic, and handles gear changes like butter."</p>
              <div className="author-row">
                <div className="author-avatar av-3">AP</div>
                <div>
                  <h4>Amit Patel</h4>
                  <span>Cycling Enthusiast, New Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* About Us Section */
        .about-us-section {
          padding: 100px 0;
          background: #090c13;
        }

        .about-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: center;
        }

        .about-visual-box {
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          background: rgba(17, 24, 39, 0.3);
          position: relative;
          overflow: hidden;
        }

        .about-vector-svg {
          width: 75%;
          height: auto;
        }

        .about-svg-bike {
          color: var(--primary);
        }

        .about-text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .about-para {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .about-stats-mini {
          display: flex;
          gap: 40px;
          margin-top: 12px;
        }

        .mini-stat h3 {
          font-size: 2rem;
          color: var(--primary);
          font-weight: 800;
          line-height: 1.1;
        }

        .mini-stat span {
          font-size: 0.82rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        /* Subscriptions Section */
        .subscriptions-section {
          padding: 100px 0;
        }

        .subscriptions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 860px;
          margin: 0 auto;
        }

        .pass-card {
          padding: 40px 32px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(17, 24, 39, 0.4);
          position: relative;
          transition: var(--transition-normal);
          height: 100%;
        }

        .pass-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .pass-card-featured {
          border-color: var(--primary);
          background: rgba(226, 241, 60, 0.03);
          box-shadow: 0 10px 30px rgba(226, 241, 60, 0.05);
        }

        .pass-card-featured:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-volt), var(--shadow-lg);
        }

        .featured-ribbon {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--primary);
          color: #000;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }

        .pass-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 24px;
          margin-bottom: 28px;
        }

        .pass-header h3 {
          font-size: 1.4rem;
          color: #fff;
          font-weight: 750;
        }

        .pass-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-top: 8px;
        }

        .price-val {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.0;
        }

        .pass-card-featured .price-val {
          color: var(--primary);
        }

        .price-unit {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .pass-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .pass-features li {
          font-size: 0.92rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 900px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-visual-box {
            height: 280px;
          }
          .subscriptions-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .hero-section {
          position: relative;
          padding: 80px 0 100px;
          overflow: hidden;
          background: radial-gradient(circle at 10% 20%, rgba(226, 241, 60, 0.04) 0%, rgba(9, 13, 22, 0.2) 90%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hero-badge {
          margin-bottom: 24px;
          gap: 8px;
        }

        .hero-title {
          font-size: 3.8rem;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 24px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .text-glow {
          color: var(--primary);
          text-shadow: 0 0 30px rgba(226, 241, 60, 0.3);
        }

        .hero-subtitle-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Hero Search Wrapper */
        .hero-search-wrapper {
          display: flex;
          justify-content: center;
        }

        .search-panel {
          padding: 32px;
          width: 100%;
          max-width: 440px;
          border-radius: var(--radius-lg);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .panel-title {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 24px;
          font-weight: 700;
        }

        .panel-fields {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel-row {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 12px;
        }

        .search-submit-btn {
          margin-top: 10px;
          padding: 14px 20px;
        }

        /* Features Section */
        .features-section {
          padding: 100px 0;
          background: #090c13;
          position: relative;
        }
        
        .text-center { text-align: center; }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .feature-card {
          padding: 40px 32px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: var(--primary);
          box-shadow: 0 10px 30px rgba(226, 241, 60, 0.04);
        }

        .feature-icon-bg {
          width: 52px;
          height: 52px;
          background: rgba(226, 241, 60, 0.08);
          border: 1px solid rgba(226, 241, 60, 0.15);
          border-radius: var(--radius-sm);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .feature-icon {
          stroke-width: 1.8;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          color: #fff;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Featured Fleet Section */
        .featured-fleet-section {
          padding: 100px 0;
        }

        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }

        .section-header-flex .section-subtitle {
          margin-bottom: 0;
        }

        .featured-bikes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 100px 0;
          background: #090c13;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .testimonial-card {
          padding: 32px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testimonial-card .quote {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 28px;
          position: relative;
        }

        .testimonial-card .quote::before {
          content: '“';
          font-size: 4rem;
          font-family: Georgia, serif;
          color: var(--primary);
          opacity: 0.2;
          position: absolute;
          top: -24px;
          left: -12px;
          line-height: 1;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: #000;
        }

        .av-1 { background-color: #60a5fa; }
        .av-2 { background-color: #f87171; }
        .av-3 { background-color: #fbbf24; }

        .author-row h4 {
          font-size: 0.95rem;
          color: #fff;
          font-weight: 600;
        }

        .author-row span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hero-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-buttons {
            justify-content: center;
          }
          .hero-title {
            font-size: 3.0rem;
          }
          .features-grid, .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .section-header-flex {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .section-header-flex .btn {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-section, .features-section, .featured-fleet-section, .testimonials-section {
            padding: 60px 0;
          }
        }
          .featured-fleet-section {
  padding: 80px 0;
}

.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.featured-bikes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.bike-showcase {
  position: relative;
  height: 280px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: 0.3s;
}

.bike-showcase:hover {
  transform: translateY(-8px);
}

.bike-showcase img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bike-price {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #000;
  color: #e2f13c;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .featured-bikes-grid {
    grid-template-columns: 1fr;
  }

  .bike-showcase {
    height: 250px;
  }
}
.panel-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:15px;
  margin-top:15px;
}

.panel-row .input-group{
  width:100%;
}

@media (max-width:768px){
  .panel-row{
    grid-template-columns:1fr;
  }
}
      `}</style>
    </div>
  );
}
