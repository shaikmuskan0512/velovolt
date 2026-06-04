import React, { useState } from 'react';
import { Bike, Send, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Trust Badges Bar */}
      <div className="trust-bar">
        <div className="container trust-container">
          <div className="trust-item">
            <Zap className="trust-icon" />
            <div>
              <h4>Instant Booking</h4>
              <p>Reserve in under 60 seconds</p>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck className="trust-icon" />
            <div>
              <h4>Premium Insurance</h4>
              <p>Full liability & damage cover</p>
            </div>
          </div>
          <div className="trust-item">
            <RefreshCw className="trust-icon" />
            <div>
              <h4>Flexible Cancellations</h4>
              <p>100% refund up to 24h before</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="logo-section" onClick={() => handleLinkClick('home')}>
              <div className="logo-icon-bg">
                <Bike className="logo-icon" />
              </div>
              <span className="logo-text">VELO<span className="logo-highlight">VOLT</span></span>
            </div>
            <p className="brand-description">
              Velovolt is the leading premium smart bike rental platform. Experience absolute luxury, cutting-edge technology, and unmatched performance on two wheels.
            </p>
            <div className="social-links">
              {['Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map((platform) => (
                <a key={platform} href="#" className="social-icon-link" aria-label={platform}>
                  <span className="social-dot"></span>
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleLinkClick('home')}>Home Landing</button></li>
              <li><button onClick={() => handleLinkClick('explore')}>Browse Catalog</button></li>
              <li><button onClick={() => handleLinkClick('dashboard')}>Dashboard & Tracker</button></li>
              <li><button onClick={() => handleLinkClick('contact')}>Support & Contact</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h3>Fleet Types</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleLinkClick('explore')}>Electric Assist</button></li>
              <li><button onClick={() => handleLinkClick('explore')}>Mountain Trails</button></li>
              <li><button onClick={() => handleLinkClick('explore')}>Aero Road</button></li>
              <li><button onClick={() => handleLinkClick('explore')}>Urban Belt-Drive</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to receive trail guides, exclusive promotions, and fleet updates.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <span className="newsletter-success animate-fade-in">
                ✨ Successfully subscribed! Welcome to the loop.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Velovolt Technologies Inc. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #05070a;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        /* Trust Bar */
        .trust-bar {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding: 24px 0;
        }

        .trust-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .trust-icon {
          color: var(--primary);
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          stroke-width: 1.5;
        }

        .trust-item h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }

        .trust-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Footer Main */
        .footer-main {
          padding: 64px 0 48px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 48px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-brand .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .footer-brand .logo-icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--primary);
          border-radius: var(--radius-sm);
          color: #000;
        }

        .footer-brand .logo-icon {
          stroke-width: 2.5;
          width: 20px;
          height: 20px;
        }

        .brand-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 300px;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 8px;
        }

        .social-icon-link {
          font-size: 0.82rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .social-icon-link:hover {
          color: var(--primary);
        }

        .social-dot {
          width: 6px;
          height: 6px;
          background-color: var(--text-muted);
          border-radius: 50%;
          transition: var(--transition-normal);
        }

        .social-icon-link:hover .social-dot {
          background-color: var(--primary);
          box-shadow: 0 0 6px var(--primary);
        }

        /* Links Columns */
        .footer-links-col h3, .footer-newsletter h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: var(--transition-fast);
        }

        .footer-links button:hover {
          color: var(--primary);
          transform: translateX(4px);
        }

        /* Newsletter */
        .footer-newsletter {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-newsletter p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .newsletter-input {
          flex-grow: 1;
          border-radius: var(--radius-full);
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
          font-size: 0.88rem;
        }

        .newsletter-btn {
          border-radius: 50%;
          width: 42px;
          height: 42px;
          padding: 0;
          flex-shrink: 0;
        }

        .newsletter-success {
          font-size: 0.82rem;
          color: var(--primary);
          font-weight: 600;
          margin-top: 4px;
        }

        /* Footer Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding: 24px 0;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .bottom-links {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .bottom-links a:hover {
          color: var(--text-secondary);
        }

        .separator {
          color: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-brand, .footer-newsletter {
            grid-column: span 2;
          }
          .brand-description {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-brand, .footer-newsletter {
            grid-column: span 1;
          }
          .bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
