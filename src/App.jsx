import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import BookingModal from './components/BookingModal';
import { CheckCircle2, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bookings, setBookings] = useState([]);
  const [bookingBike, setBookingBike] = useState(null);
  const [toast, setToast] = useState(null);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleBookBike = (bike) => {
    setBookingBike(bike);
  };

  const handleBookingSuccess = (newBooking) => {
    // Add new booking to global list
    setBookings((prevBookings) => [newBooking, ...prevBookings]);
    
    // Trigger real-time visual toast
    showToast(`⚡ Rental active! Booking ID ${newBooking.id} initiated.`);
    
    // Auto-redirect user to Dashboard so they can view the live GPS tracking simulator!
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 1500);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            setActiveTab={setActiveTab} 
            onBookBike={handleBookBike} 
            onSubscribe={(passName) => showToast(`🎟️ Pass Active! Welcome to the ${passName} membership.`)} 
          />
        );
      case 'explore':
        return <Explore onBookBike={handleBookBike} />;
      case 'dashboard':
        return <Dashboard bookings={bookings} setActiveTab={setActiveTab} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home 
            setActiveTab={setActiveTab} 
            onBookBike={handleBookBike} 
            onSubscribe={(passName) => showToast(`🎟️ Pass Active! Welcome to the ${passName} membership.`)} 
          />
        );
    }
  };

  return (
    <div className="app-layout">
      {/* Premium Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dynamic Content Views */}
      <main className="main-content">
        {renderActivePage()}
      </main>

      {/* Checkout Modal Wizard Overlay */}
      {bookingBike && (
        <BookingModal
          bike={bookingBike}
          onClose={() => setBookingBike(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Toast Notification HUD Layer */}
      {toast && (
        <div className="toast-container">
          <div className="toast glass-panel animate-fade-in-up">
            <CheckCircle2 size={16} className="text-primary animate-pulse" />
            <span className="toast-msg-text">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Premium Footer */}
      <Footer setActiveTab={setActiveTab} />

      <style>{`
        .toast-msg-text {
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .toast {
          background: rgba(15, 23, 42, 0.9) !important;
          border-left: 4px solid var(--primary) !important;
          border-radius: var(--radius-sm);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-volt), var(--shadow-lg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}
