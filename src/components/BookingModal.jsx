import React, { useState } from 'react';
import { X, Calendar, Shield, CreditCard, ChevronRight, CheckCircle, Clock } from 'lucide-react';

export default function BookingModal({ bike, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Booking Details & Accessories
  const [hours, setHours] = useState(3);
  const [accessories, setAccessories] = useState({
    helmet: false,
    lock: false,
    gps: false,
    insurance: false
  });

  // Step 2: Personal Info
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: ''
  });

  // Step 3: Payment
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const accessoryPrices = {
    helmet: 2, // per hour
    lock: 1,   // per hour
    gps: 3,    // per hour
    insurance: 5 // flat rate
  };

  const getAccessorySubtotal = () => {
    let total = 0;
    if (accessories.helmet) total += accessoryPrices.helmet * hours;
    if (accessories.lock) total += accessoryPrices.lock * hours;
    if (accessories.gps) total += accessoryPrices.gps * hours;
    if (accessories.insurance) total += accessoryPrices.insurance;
    return total;
  };

  const getBikeSubtotal = () => bike.price * hours;
  const getTotal = () => getBikeSubtotal() + getAccessorySubtotal();

  const handleNextStep = () => {
    if (step === 2) {
      if (!customer.name || !customer.email || !customer.phone) {
        alert("Please fill in all required customer details.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handlePaymentSubmit = async (e) => {
  e.preventDefault();

  if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
    alert("Please fill in all payment details.");
    return;
  }

  try {
    const response = await fetch(
      "https://velovolt.onrender.com/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bikeName: bike.name,
          customerName: customer.name,
          pickupDate: new Date().toISOString(),
          dropoffDate: new Date(
            Date.now() + hours * 60 * 60 * 1000
          ).toISOString(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Booking failed");
    }

    console.log("Booking saved:", data);

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      bikeId: bike.id,
      bikeName: bike.name,
      bikeImageColor: bike.imageColor,
      bikeType: bike.type,
      hours: hours,
      total: getTotal(),
      date: new Date().toLocaleDateString(),
      status: "Active",
      trackerSimulated: true,
    };

    onBookingSuccess(newBooking);

    setStep(4);
  } catch (error) {
    console.error("Booking Error:", error);
    alert("Failed to save booking.");
  }
};
 

  const toggleAccessory = (accKey) => {
    setAccessories(prev => ({ ...prev, [accKey]: !prev[accKey] }));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-fade-in-up">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-title">
            <span className="step-count">Step {Math.min(step, 3)} of 3</span>
            <h2>{step === 4 ? "Booking Confirmed" : `Reserve ${bike.name}`}</h2>
          </div>
          {step !== 4 && (
            <button className="close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="progress-bar-container">
            <div 
              className="progress-fill" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="wizard-step animate-fade-in">
            <h3>Configure Accessories & Duration</h3>
            <p className="step-intro">Tailor your rental with premium add-ons and choose your rental duration.</p>
            
            <div className="hours-selector-container">
              <div className="input-group">
                <span className="input-label">Rental Duration</span>
                <div className="duration-controls">
                  <button 
                    className="btn btn-secondary duration-btn" 
                    onClick={() => setHours(Math.max(1, hours - 1))}
                  >-</button>
                  <span className="duration-value">{hours} Hour{hours > 1 ? 's' : ''}</span>
                  <button 
                    className="btn btn-secondary duration-btn" 
                    onClick={() => setHours(hours + 1)}
                  >+</button>
                </div>
              </div>
            </div>

            <div className="accessories-section">
              <span className="input-label">Premium Add-ons</span>
              <div className="accessories-grid">
                {/* Accessory Items */}
                <div 
                  className={`accessory-card ${accessories.helmet ? 'selected' : ''}`}
                  onClick={() => toggleAccessory('helmet')}
                >
                  <div className="accessory-info">
                    <h4>Safety Helmet</h4>
                    <p>Cleaned & sanitized helmet</p>
                    <span className="accessory-price">${accessoryPrices.helmet}/hr</span>
                  </div>
                  <input type="checkbox" checked={accessories.helmet} readOnly />
                </div>

                <div 
                  className={`accessory-card ${accessories.lock ? 'selected' : ''}`}
                  onClick={() => toggleAccessory('lock')}
                >
                  <div className="accessory-info">
                    <h4>Heavy Duty Lock</h4>
                    <p>Chain lock for secure stops</p>
                    <span className="accessory-price">${accessoryPrices.lock}/hr</span>
                  </div>
                  <input type="checkbox" checked={accessories.lock} readOnly />
                </div>

                <div 
                  className={`accessory-card ${accessories.gps ? 'selected' : ''}`}
                  onClick={() => toggleAccessory('gps')}
                >
                  <div className="accessory-info">
                    <h4>GPS Navigation Kit</h4>
                    <p>Integrated handlebars HUD</p>
                    <span className="accessory-price">${accessoryPrices.gps}/hr</span>
                  </div>
                  <input type="checkbox" checked={accessories.gps} readOnly />
                </div>

                <div 
                  className={`accessory-card ${accessories.insurance ? 'selected' : ''}`}
                  onClick={() => toggleAccessory('insurance')}
                >
                  <div className="accessory-info">
                    <h4>Damage Insurance</h4>
                    <p>Zero-liability damage waiver</p>
                    <span className="accessory-price">${accessoryPrices.insurance} Flat</span>
                  </div>
                  <input type="checkbox" checked={accessories.insurance} readOnly />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-step animate-fade-in">
            <h3>Customer Verification</h3>
            <p className="step-intro">Enter your details to generate your digital rental contract.</p>
            
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Full Name *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. John Doe"
                  value={customer.name}
                  onChange={e => setCustomer({...customer, name: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address *</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="e.g. john@domain.com"
                  value={customer.email}
                  onChange={e => setCustomer({...customer, email: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number *</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="e.g. +1 (555) 019-2834"
                  value={customer.phone}
                  onChange={e => setCustomer({...customer, phone: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">ID / Driver's License</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. DL-2938102"
                  value={customer.idNumber}
                  onChange={e => setCustomer({...customer, idNumber: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-step animate-fade-in">
            <h3>Secure Checkout</h3>
            <p className="step-intro">Complete your payment details. Transactions are 256-bit encrypted.</p>
            
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <div className="payment-fields">
                <div className="input-group">
                  <label className="input-label">Card Number</label>
                  <div className="input-icon-wrapper">
                    <CreditCard className="input-icon-decor" size={18} />
                    <input
                      type="text"
                      maxLength="19"
                      className="input-field input-with-icon"
                      placeholder="4111 2222 3333 4444"
                      value={payment.cardNumber}
                      onChange={e => setPayment({...payment, cardNumber: e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                      required
                    />
                  </div>
                </div>

                <div className="payment-sub-row">
                  <div className="input-group">
                    <label className="input-label">Expiry Date</label>
                    <input
                      type="text"
                      maxLength="5"
                      className="input-field"
                      placeholder="MM/YY"
                      value={payment.expiry}
                      onChange={e => setPayment({...payment, expiry: e.target.value})}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">CVV</label>
                    <input
                      type="password"
                      maxLength="3"
                      className="input-field"
                      placeholder="123"
                      value={payment.cvv}
                      onChange={e => setPayment({...payment, cvv: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" style={{ display: 'none' }} id="hidden-submit-btn" />
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-step animate-fade-in success-step">
            <div className="success-icon-container">
              <CheckCircle size={64} className="success-icon-svg" />
            </div>
            <h3>Thank You, {customer.name}!</h3>
            <p className="success-msg">
              Your booking for the <strong>{bike.name}</strong> was successful. We have sent the confirmation receipt, QR code, and digital contract to <strong>{customer.email}</strong>.
            </p>
            <div className="booking-summary-box glass-panel">
              <div className="summary-row">
                <span>Velo ID</span>
                <span className="summary-val font-mono text-primary">BK-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="summary-row">
                <span>Duration</span>
                <span className="summary-val">{hours} Hours</span>
              </div>
              <div className="summary-row">
                <span>Rental Hub</span>
                <span className="summary-val">Downtown Core Velo Station</span>
              </div>
            </div>
            <p className="dashboard-nudge">
              You can now track your bike's battery, range, and GPS location in real-time from the <strong>Dashboard</strong>!
            </p>
            <button className="btn btn-primary w-full" onClick={onClose}>
              Go to Dashboard
            </button>
          </div>
        )}

        {/* Modal Footer / Navigation */}
        {step < 4 && (
          <div className="modal-footer">
            {/* Invoice Summary */}
            <div className="invoice-brief">
              <div className="invoice-row">
                <span>Bike Subtotal:</span>
                <span>${getBikeSubtotal()}</span>
              </div>
              {getAccessorySubtotal() > 0 && (
                <div className="invoice-row">
                  <span>Add-ons:</span>
                  <span>${getAccessorySubtotal()}</span>
                </div>
              )}
              <div className="invoice-row total-row">
                <span>Total:</span>
                <span className="total-highlight">${getTotal()}</span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="footer-actions">
              {step > 1 && (
                <button className="btn btn-secondary" onClick={handlePrevStep}>
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  <span>Continue</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  className="btn btn-primary btn-checkout" 
                  onClick={() => document.getElementById('hidden-submit-btn').click()}
                >
                  <CreditCard size={16} />
                  <span>Pay & Secure</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 6, 10, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
          overflow-y: auto;
        }

        .modal-content {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow-volt), var(--shadow-lg);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }

        .step-count {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-title h2 {
          font-size: 1.4rem;
          color: #fff;
          margin-top: 4px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .close-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }

        /* Progress Bar */
        .progress-bar-container {
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          transition: width 0.4s ease;
        }

        /* Wizard Step */
        .wizard-step {
          padding: 32px 24px;
          max-height: 450px;
          overflow-y: auto;
        }

        .wizard-step h3 {
          font-size: 1.25rem;
          color: #fff;
          margin-bottom: 8px;
        }

        .step-intro {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        /* Step 1 specifics */
        .duration-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }

        .duration-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 1.3rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .duration-value {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          min-width: 90px;
          text-align: center;
        }

        .accessories-section {
          margin-top: 28px;
        }

        .accessories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 12px;
        }

        .accessory-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: var(--transition-normal);
        }

        .accessory-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .accessory-card.selected {
          border-color: var(--primary);
          background: rgba(226, 241, 60, 0.04);
        }

        .accessory-info h4 {
          font-size: 0.95rem;
          color: #fff;
          margin-bottom: 4px;
        }

        .accessory-info p {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .accessory-price {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--primary);
        }

        .accessory-card input {
          margin-top: 4px;
          accent-color: var(--primary);
          cursor: pointer;
        }

        /* Step 2 Form */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 550px) {
          .accessories-grid, .form-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Step 3 Payment */
        .payment-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon-decor {
          position: absolute;
          left: 16px;
          color: var(--text-secondary);
        }

        .input-with-icon {
          padding-left: 48px;
        }

        .payment-sub-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        /* Step 4 Success */
        .success-step {
          text-align: center;
          padding: 40px 24px;
          max-height: none;
        }

        .success-icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(226, 241, 60, 0.1);
          border: 1px solid var(--primary);
          border-radius: 50%;
          color: var(--primary);
          box-shadow: var(--shadow-volt);
          margin-bottom: 24px;
          animation: pulse-glow 2s infinite;
        }

        .success-icon-svg {
          stroke-width: 2.5;
        }

        .success-step h3 {
          font-size: 1.6rem;
          color: #fff;
          margin-bottom: 12px;
        }

        .success-msg {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .booking-summary-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          max-width: 380px;
          margin: 0 auto 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .summary-val {
          color: #fff;
          font-weight: 600;
        }
        
        .font-mono {
          font-family: monospace;
          letter-spacing: 0.05em;
        }

        .text-primary {
          color: var(--primary) !important;
        }

        .dashboard-nudge {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 28px;
        }

        /* Modal Footer */
        .modal-footer {
          border-top: 1px solid var(--border);
          padding: 20px 24px;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .invoice-brief {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .invoice-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-secondary);
          width: 180px;
        }

        .total-row {
          border-top: 1px solid var(--border);
          padding-top: 4px;
          margin-top: 2px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
        }

        .total-highlight {
          color: var(--primary);
          font-size: 1.1rem;
        }

        .footer-actions {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
