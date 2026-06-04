import React, { useState } from 'react';
import { Bike, Menu, X, Compass, LayoutDashboard, Mail, Home as HomeIcon  } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="glass-navbar">
      <div className="container nav-container">
        {/* Logo */}
        <div className="logo-section" onClick={() => handleNavClick('home')}>
          <div className="logo-icon-bg">
            <Bike className="logo-icon" />
          </div>
          <span className="logo-text">VELO<span className="logo-highlight">VOLT</span></span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {isActive && <span className="nav-indicator-dot"></span>}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Button */}
        <div className="nav-action">
          <button 
            onClick={() => handleNavClick('explore')} 
            className="btn btn-primary btn-sm-nav"
          >
            Find Bikes
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
          <li className="mobile-action-li">
            <button
              onClick={() => handleNavClick('explore')}
              className="btn btn-primary w-full"
            >
              Rent a Bike Now
            </button>
          </li>
        </ul>
      </div>

      <style>{`
        .glass-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: rgba(9, 13, 22, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 100;
          display: flex;
          align-items: center;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, var(--primary) 0%, #a2b00f 100%);
          border-radius: var(--radius-sm);
          color: #000;
          box-shadow: 0 4px 12px rgba(226, 241, 60, 0.3);
          transition: var(--transition-normal);
        }

        .logo-section:hover .logo-icon-bg {
          transform: rotate(-10deg) scale(1.05);
          box-shadow: var(--shadow-volt);
        }

        .logo-icon {
          stroke-width: 2.5;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .logo-highlight {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 8px;
          align-items: center;
        }

        .nav-link-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          transition: var(--transition-normal);
          position: relative;
        }

        .nav-link-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.04);
        }

        .nav-link-btn.active {
          color: var(--primary);
          background: rgba(226, 241, 60, 0.08);
        }

        .nav-indicator-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary);
        }

        .nav-action {
          display: block;
        }

        .btn-sm-nav {
          padding: 8px 20px;
          font-size: 0.88rem;
        }

        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-menu-drawer {
          display: none;
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(9, 13, 22, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 99;
          opacity: 0;
          pointer-events: none;
        }

        .mobile-menu-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          list-style: none;
        }

        .mobile-nav-link-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          text-align: left;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .mobile-nav-link-btn:hover, .mobile-nav-link-btn.active {
          color: var(--primary);
          background: rgba(226, 241, 60, 0.08);
        }

        .mobile-action-li {
          margin-top: 12px;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-action {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
          .mobile-menu-drawer {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
