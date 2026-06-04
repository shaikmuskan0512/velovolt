import React from "react";
import scooty1 from "../assets/scooty1.jpg";
import scooty2 from "../assets/scooty2.jpg";
import { Bike, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>About CampX Bike Rentals</h1>
        <p>
          Ride anywhere, anytime. We provide affordable and reliable
          bike and scooter rentals for students, travelers, and daily commuters.
        </p>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-card">
          <Bike size={40} />
          <h3>Wide Range of Vehicles</h3>
          <p>
            Choose from scooters, bikes, and premium motorcycles
            at affordable hourly prices.
          </p>
        </div>

        <div className="about-card">
          <ShieldCheck size={40} />
          <h3>Safe & Secure</h3>
          <p>
            All vehicles are regularly maintained and inspected
            for your safety and comfort.
          </p>
        </div>

        <div className="about-card">
          <Clock size={40} />
          <h3>24/7 Booking</h3>
          <p>
            Book your ride anytime with our easy online rental
            platform.
          </p>
        </div>

        <div className="about-card">
          <MapPin size={40} />
          <h3>Multiple Locations</h3>
          <p>
            Pick up and drop off your vehicle at convenient
            locations across the city.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our goal is to make transportation affordable,
          accessible, and convenient for everyone. Whether you
          need a scooter for daily travel or a bike for a weekend
          adventure, CampX has you covered.
        </p>
      </section>
      {/* Founders Section */}
<section className="founders-section">
  <h2>Meet Our Founders</h2>

  <div className="founders-grid">

    <div className="founder-card">
      <img
        src="/scooty1.jpg"
        alt="Founder"
        className="founder-img"
      />
      <h3>Shaik Muskan</h3>
      <p className="role">Co-Founder & Frontend Developer</p>

      <p className="story">
        CampX started as a college project with a vision to make
        bike rentals simple and affordable for students.
        Muskan designed the platform and focused on creating
        an easy booking experience for users.
      </p>
    </div>

    <div className="founder-card">
      <img
        src="/scooty2.jpg"
        alt="Founder"
        className="founder-img"
      />
      <h3>Team Member Name</h3>
      <p className="role">Co-Founder & Operations Lead</p>

      <p className="story">
        The idea came from noticing how difficult it was for
        students and travelers to find affordable transport.
        Together, the founders built CampX to provide reliable
        bikes and scooters on demand.
      </p>
    </div>

  </div>
</section>

      <style>{`
        .about-page{
          min-height:100vh;
          padding:40px 20px;
          color:white;
        }

        .hero-section{
          text-align:center;
          margin-bottom:60px;
        }

        .hero-section h1{
          font-size:3rem;
          margin-bottom:15px;
          color:#e2f13c;
        }

        .hero-section p{
          max-width:700px;
          margin:auto;
          color:#d1d5db;
          font-size:1.1rem;
        }

        .about-content{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
          margin-bottom:60px;
        }

        .about-card{
          background:#1e293b;
          padding:25px;
          border-radius:15px;
          text-align:center;
          transition:.3s;
        }

        .about-card:hover{
          transform:translateY(-8px);
        }

        .about-card svg{
          color:#e2f13c;
          margin-bottom:15px;
        }

        .about-card h3{
          margin-bottom:10px;
        }

        .about-card p{
          color:#d1d5db;
        }

        .mission-section{
          text-align:center;
          max-width:800px;
          margin:auto;
          background:#1e293b;
          padding:40px;
          border-radius:20px;
        }

        .mission-section h2{
          color:#e2f13c;
          margin-bottom:15px;
        }

        .mission-section p{
          color:#d1d5db;
          line-height:1.7;
        }
      `}</style>
    </div>
  );
}