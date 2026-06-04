import React, { useState, useEffect, useRef } from 'react';
import { Compass, Battery, AlertTriangle, Navigation, MapPin, Gauge, ShieldAlert } from 'lucide-react';

export default function ActiveRentalMap({ booking }) {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(22.4);
  const [battery, setBattery] = useState(98);
  const [distance, setDistance] = useState(0.4);
  const [status, setStatus] = useState('En Route');
  
  // Coordinates representing the simulated route path in SVG space:
  // From Downtown Station (20, 48) to Waterfront Hub (85, 12)
  const routePoints = [
    { x: 20, y: 48 },
    { x: 32, y: 48 },
    { x: 32, y: 35 },
    { x: 55, y: 35 },
    { x: 55, y: 18 },
    { x: 74, y: 18 },
    { x: 74, y: 12 },
    { x: 85, y: 12 }
  ];

  // Interpolate position along the point path based on progress (0 to 100)
  const getMarkerPosition = () => {
    const totalSegments = routePoints.length - 1;
    const segmentWidth = 100 / totalSegments;
    const currentSegmentIndex = Math.min(
      Math.floor(progress / segmentWidth),
      totalSegments - 1
    );
    
    const segmentProgress = (progress % segmentWidth) / segmentWidth;
    const startPoint = routePoints[currentSegmentIndex];
    const endPoint = routePoints[currentSegmentIndex + 1];

    if (!startPoint || !endPoint) return { x: 20, y: 48 };

    return {
      x: startPoint.x + (endPoint.x - startPoint.x) * segmentProgress,
      y: startPoint.y + (endPoint.y - startPoint.y) * segmentProgress
    };
  };

  const markerPos = getMarkerPosition();

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update progress along the path
      setProgress((prev) => {
        if (prev >= 99.5) {
          setStatus('Arrived');
          return 100;
        }
        return prev + 0.4; // increments along path
      });

      // 2. Fluctuating Speedometer
      setSpeed((prev) => {
        if (status === 'Arrived') return 0;
        const change = (Math.random() - 0.5) * 4;
        const newSpeed = Math.max(12, Math.min(30, prev + change));
        return parseFloat(newSpeed.toFixed(1));
      });

      // 3. Gradual battery drain (if electric, which Volt Cruiser is)
      setBattery((prev) => {
        if (status === 'Arrived') return prev;
        const drain = Math.random() * 0.05;
        return Math.max(10, parseFloat((prev - drain).toFixed(1)));
      });

      // 4. Odometer incremental distance update
      setDistance((prev) => {
        if (status === 'Arrived') return prev;
        const added = speed / 3600; // Speed km/h to km/s (roughly scaled)
        return parseFloat((prev + added * 5).toFixed(2));
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [speed, status]);

  const handleRestart = () => {
    setProgress(0);
    setBattery(98);
    setDistance(0.1);
    setStatus('En Route');
  };

  return (
    <div className="live-tracker-panel glass-panel animate-fade-in">
      <div className="tracker-header">
        <div className="active-glow-indicator">
          <span className="glow-dot"></span>
          <h3>Live Telemetry: Booking {booking.id}</h3>
        </div>
        <span className={`badge ${status === 'Arrived' ? 'badge-primary' : 'badge-secondary'}`}>
          {status}
        </span>
      </div>

      <div className="tracker-body-grid">
        {/* Left side: Vector Map Visualizer */}
        <div className="map-visualizer-box">
          <div className="map-labels">
            <span className="map-label-tag tag-start"><MapPin size={12} /> Downtown Station</span>
            <span className="map-label-tag tag-end"><Compass size={12} /> Waterfront Hub</span>
          </div>

          <svg viewBox="0 0 100 60" className="vector-map-svg">
            <defs>
              <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Background Base */}
            <rect width="100" height="60" fill="rgba(255, 255, 255, 0.01)" rx="8" />

            {/* Blue River/Waterbody on map */}
            <path d="M 0 50 Q 30 55 50 30 T 100 35 L 100 60 L 0 60 Z" fill="url(#water-grad)" />

            {/* City blocks / park squares */}
            <rect x="5" y="5" width="20" height="15" rx="2" fill="rgba(255, 255, 255, 0.03)" border="1" />
            <rect x="30" y="5" width="35" height="10" rx="2" fill="rgba(226, 241, 60, 0.02)" />
            <rect x="70" y="5" width="25" height="20" rx="2" fill="rgba(255, 255, 255, 0.03)" />
            <rect x="5" y="25" width="15" height="20" rx="2" fill="rgba(255, 255, 255, 0.03)" />

            {/* Secondary Grid Lines representing minor roads */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="40" y1="0" x2="40" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="80" y1="0" x2="80" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

            {/* Simulated Main Roads */}
            <path d="M 0 48 H 32 V 35 H 55 V 18 H 74 V 12 H 100" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 0 48 H 32 V 35 H 55 V 18 H 74 V 12 H 100" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeLinecap="round" />

            {/* Glowing route active overlay */}
            <path d="M 20 48 H 32 V 35 H 55 V 18 H 74 V 12 H 85" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,3" className="glowing-route-trail" />

            {/* Station Anchors */}
            <g transform="translate(20, 48)">
              <circle r="4" fill="rgba(226, 241, 60, 0.2)" />
              <circle r="2.5" fill="var(--primary)" />
            </g>

            <g transform="translate(85, 12)">
              <circle r="4" fill="rgba(59, 130, 246, 0.2)" />
              <circle r="2.5" fill="#3b82f6" />
            </g>

            {/* Live Moving Marker */}
            {status !== 'Arrived' && (
              <g transform={`translate(${markerPos.x}, ${markerPos.y})`} className="gps-marker-g">
                <circle r="6" fill="var(--primary)" opacity="0.3" className="gps-pulse" />
                <circle r="4.5" fill="#000" stroke="var(--primary)" strokeWidth="1.5" />
                <path d="M-1.5,0 L1.5,0 M0,-1.5 L0,1.5" stroke="var(--primary)" strokeWidth="1" />
              </g>
            )}
          </svg>
        </div>

        {/* Right side: Live Telemetry HUD */}
        <div className="hud-telemetry-box">
          <div className="telemetry-grid">
            <div className="hud-card">
              <div className="hud-icon-label">
                <Gauge size={16} className="hud-icon text-primary" />
                <span>Current Speed</span>
              </div>
              <div className="hud-value-row">
                <span className="hud-big-num">{speed}</span>
                <span className="hud-unit">km/h</span>
              </div>
            </div>

            <div className="hud-card">
              <div className="hud-icon-label">
                <Battery size={16} className={`hud-icon ${battery > 20 ? 'text-primary' : 'text-danger'}`} />
                <span>Battery Level</span>
              </div>
              <div className="hud-value-row">
                <span className="hud-big-num">{booking.bikeType === 'Electric' ? `${battery}%` : 'N/A'}</span>
                <span className="hud-unit">{booking.bikeType === 'Electric' ? 'Li-Ion' : 'Mechanical'}</span>
              </div>
            </div>

            <div className="hud-card">
              <div className="hud-icon-label">
                <Navigation size={16} className="hud-icon text-primary" />
                <span>Odometer</span>
              </div>
              <div className="hud-value-row">
                <span className="hud-big-num">{distance}</span>
                <span className="hud-unit">km</span>
              </div>
            </div>

            <div className="hud-card">
              <div className="hud-icon-label">
                <Clock size={16} className="hud-icon text-primary" />
                <span>Estimated Arrival</span>
              </div>
              <div className="hud-value-row">
                <span className="hud-big-num">{status === 'Arrived' ? '0' : Math.max(1, Math.round((100 - progress) * 0.15))}</span>
                <span className="hud-unit">mins</span>
              </div>
            </div>
          </div>

          {/* Quick actions inside HUD */}
          <div className="hud-alert-actions">
            {status === 'Arrived' ? (
              <div className="arrival-alert glass-panel animate-fade-in">
                <p>🎉 You have safely arrived at <strong>Waterfront Hub Station</strong>! Please lock the bike inside dock #14 to terminate the billing.</p>
                <button className="btn btn-primary btn-sm w-full mt-2" onClick={handleRestart}>
                  Simulate Trip Again
                </button>
              </div>
            ) : (
              <div className="trip-status-tip">
                <div className="tip-header">
                  <ShieldAlert size={14} className="tip-icon" />
                  <span>Safety Advisory</span>
                </div>
                <p>Helmets are mandatory. Speed limit in waterfront corridors is capped at 20 km/h. Local rain sensors report dry pathways.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .live-tracker-panel {
          padding: 24px;
          border-radius: var(--radius-lg);
          background: rgba(17, 24, 39, 0.45);
          width: 100%;
        }

        .tracker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .active-glow-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .glow-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
          animation: mapPulse 1.5s infinite alternate;
        }

        @keyframes mapPulse {
          100% {
            transform: scale(1.4);
            opacity: 0.5;
          }
        }

        .tracker-header h3 {
          font-size: 1.15rem;
          color: #fff;
          font-weight: 700;
        }

        .tracker-body-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 28px;
        }

        @media (max-width: 900px) {
          .tracker-body-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Map Visualizer */
        .map-visualizer-box {
          position: relative;
          background: #05080f;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .map-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          z-index: 2;
        }

        .map-label-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
        }

        .tag-start {
          background: rgba(226, 241, 60, 0.12);
          color: var(--primary);
          border: 1px solid rgba(226, 241, 60, 0.2);
        }

        .tag-end {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .vector-map-svg {
          width: 100%;
          height: auto;
          background: #0b0f19;
          border-radius: var(--radius-sm);
        }

        .glowing-route-trail {
          animation: routeDash 1s linear infinite;
        }

        @keyframes routeDash {
          to {
            stroke-dashoffset: -20;
          }
        }

        .gps-pulse {
          animation: pulseMarker 1.2s infinite ease-out;
          transform-origin: center;
        }

        @keyframes pulseMarker {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Telemetry HUD */
        .hud-telemetry-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .telemetry-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .hud-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100px;
        }

        .hud-icon-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .hud-icon {
          stroke-width: 2.0;
        }
        
        .text-danger {
          color: #ef4444 !important;
        }

        .hud-value-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-top: 8px;
        }

        .hud-big-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          font-family: monospace;
          line-height: 1.0;
        }

        .hud-unit {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .hud-alert-actions {
          flex-grow: 1;
          display: flex;
        }

        .arrival-alert {
          background: rgba(226, 241, 60, 0.05);
          border-color: rgba(226, 241, 60, 0.2);
          padding: 16px;
          width: 100%;
          border-radius: var(--radius-md);
        }

        .arrival-alert p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        .mt-2 { margin-top: 8px; }

        .trip-status-tip {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border);
          padding: 16px;
          border-radius: var(--radius-md);
          width: 100%;
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .tip-icon {
          color: var(--primary);
        }

        .trip-status-tip p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
