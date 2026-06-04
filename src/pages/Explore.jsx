import React from "react";
import BikeCard from "../components/BikeCard";
import { bikes } from "../data/bikes";

export default function Explore({ onBookBike }) {
  return (
    <div className="explore-page">
      <div className="header">
        <h1>Available Vehicles</h1>
        <p>Choose your favorite ride and book instantly.</p>
      </div>

      <div className="bikes-grid">
        {bikes.map((bike) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            onBook={onBookBike}
          />
        ))}
      </div>

      <style>{`
        .explore-page {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h1 {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 10px;
        }

        .header p {
          color: #d1d5db;
          font-size: 1rem;
        }

        .bikes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }

          .bikes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}