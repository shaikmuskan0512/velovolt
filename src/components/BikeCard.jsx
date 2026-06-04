import React from "react";
import { Star, Compass } from "lucide-react";

export default function BikeCard({ bike, onBook }) {
  return (
    <div className="bike-card">
      <div
        className="card-image-box"
        style={{ background: bike.imageColor }}
      >
        <span className="card-badge">
          <Compass size={14} />
          <span>{bike.type}</span>
        </span>

        {!bike.available && (
          <span className="card-avail-badge">
            Fully Booked
          </span>
        )}

        <div className="bike-image-container">
          <img
            src={bike.image}
            alt={bike.name}
            className="bike-image"
          />
        </div>

        <div className="card-price-tag">
          <span className="price-num">
            ₹{bike.price}
          </span>
          <span className="price-unit">/hr</span>
        </div>
      </div>

      <div className="card-details">
        <div className="card-header-row">
          <h3>{bike.name}</h3>

          <div className="card-rating">
            <Star size={14} />
            <span>{bike.rating}</span>
          </div>
        </div>

        <p className="card-tagline">
          {bike.tagline}
        </p>

        <div className="card-specs-grid">
          <div className="spec-item">
            <span className="spec-label">Weight</span>
            <span className="spec-value">{bike.weight}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Gears</span>
            <span className="spec-value">{bike.gears}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Frame</span>
            <span className="spec-value">{bike.frame}</span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Type</span>
            <span className="spec-value">{bike.type}</span>
          </div>
        </div>

        <button
          className="book-btn"
          onClick={() => onBook && onBook(bike)}
          disabled={!bike.available}
        >
          {bike.available ? "BOOK NOW" : "FULLY BOOKED"}
        </button>
      </div>

      <style>{`
        .bike-card{
          border-radius:16px;
          overflow:hidden;
          background:#1e293b;
          transition:0.3s;
          height:100%;
          max-width:320px;   /* smaller card */
          margin:auto;
        }

        .bike-card:hover{
          transform:translateY(-8px);
        }

        .card-image-box{
          position:relative;
          height:200px;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:10px;
        }

        .bike-image-container{
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .bike-image{
          width:100%;
          max-width:250px;
          height:170px;
          object-fit:contain;
        }

        .card-badge{
          position:absolute;
          top:15px;
          left:15px;
          background:rgba(255,255,255,0.15);
          padding:8px 12px;
          border-radius:20px;
          display:flex;
          align-items:center;
          gap:5px;
          color:#fff;
        }

        .card-avail-badge{
          position:absolute;
          top:15px;
          right:15px;
          background:#ef4444;
          color:white;
          padding:8px 12px;
          border-radius:20px;
          font-size:12px;
        }

        .card-price-tag{
          position:absolute;
          bottom:5px;
          right:5px;
          background:black;
          padding:5px 8px;
          border-radius:12px;
        }

        .price-num{
          color:#e2f13c;
          font-size:18px;
          font-weight:700;
        }

        .price-unit{
          color:white;
          margin-left:2px;
        }

        .card-details{
          padding:10px;
        }

        .card-header-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .card-header-row h3{
          color:white;
          margin:0;
          font-size:15px;
        }

        .card-rating{
          display:flex;
          align-items:center;
          gap:5px;
          color:#ffd700;
        }

        .card-tagline{
          color:#d1d5db;
          margin:15px 0;
        }

        .card-specs-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:20px;
        }

        .spec-item{
          background:rgba(255,255,255,0.05);
          padding:10px;
          border-radius:10px;
        }

        .spec-label{
          display:block;
          color:#9ca3af;
          font-size:12px;
        }

        .spec-value{
          color:white;
          font-size:14px;
        }

        .book-btn{
          width:100%;
          padding:12px;
          border:none;
          border-radius:10px;
          background:#e2f13c;
          color:black;
          font-weight:bold;
          cursor:pointer;
        }

        .book-btn:disabled{
          background:#666;
          color:white;
          cursor:not-allowed;
        }
      `}</style>
    </div>
  );
}