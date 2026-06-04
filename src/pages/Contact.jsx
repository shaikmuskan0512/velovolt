import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Headphones } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="contact-page container animate-fade-in">
      <div className="section-header text-center">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">Have questions about fleet availability, corporate group rides, or key hubs? We are here 24/7.</p>
      </div>

      {/* Main Grid Contact Options & Form */}
      <div className="contact-main-grid">
        {/* Left Columns - Info Cards */}
        <div className="contact-info-cards">
          <div className="info-card glass-panel">
            <Headphones className="info-icon" size={24} />
            <div className="info-details">
              <h3>24/7 Telemetry Support</h3>
              <p className="info-txt">Active riders can dial directly for hot-swap queries, battery warnings, or locking assistance.</p>
              <span className="info-anchor">+1 (800) VELO-VOLT</span>
            </div>
          </div>

          <div className="info-card glass-panel">
            <Mail className="info-icon" size={24} />
            <div className="info-details">
              <h3>Email Concierge</h3>
              <p className="info-txt">Drop us a line for partnerships, municipal coordination, or refund inquiries.</p>
              <span className="info-anchor">support@velovolt.co</span>
            </div>
          </div>

          <div className="info-card glass-panel">
            <MapPin className="info-icon" size={24} />
            <div className="info-details">
              <h3>Central Operations</h3>
              <p className="info-txt">Visit our tech hub and master terminal where we service the carbon fleets.</p>
              <span className="info-anchor">84 Velo Boulevard, Downtown Station Core</span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="contact-form-box glass-panel">
          {submitted ? (
            <div className="form-success-alert animate-fade-in">
              <CheckCircle size={48} className="success-icon text-primary" />
              <h3>Message Sent Successfully</h3>
              <p>Thank you for reaching out! A Velo concierge has received your telemetry or account inquiry. We will contact you back within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Send a Message</h3>
              <div className="input-group">
                <label className="input-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  className="input-field"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jane@company.com"
                  className="input-field"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Subject</label>
                <select
                  className="input-field select-field"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Billing & Refunds">Billing & Refunds</option>
                  <option value="Corporate Fleet Renting">Corporate Fleet Renting</option>
                  <option value="Municipal Transit Partnership">Municipal Transit Partnership</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Inquiry Message *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe your question or telemetry assistance request..."
                  className="input-field textarea-field"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full submit-contact-btn">
                <Send size={16} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section-contact">
        <div className="section-header text-center">
          <h2 className="section-title">Frequently Answered</h2>
          <p className="section-subtitle">Quick responses to standard technical, billing, and locking system queries.</p>
        </div>
        <FAQAccordion />
      </section>

      <style>{`
        .contact-page {
          padding-top: 40px;
          padding-bottom: 80px;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          margin-top: 40px;
          margin-bottom: 80px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Info Cards */
        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          padding: 24px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          background: rgba(17, 24, 39, 0.4);
        }

        .info-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 4px;
        }

        .info-details h3 {
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 6px;
          font-weight: 700;
        }

        .info-txt {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .info-anchor {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary);
        }

        /* Contact Form */
        .contact-form-box {
          padding: 32px;
          background: rgba(17, 24, 39, 0.45);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-form h3 {
          font-size: 1.25rem;
          color: #fff;
          margin-bottom: 4px;
        }

        .textarea-field {
          resize: vertical;
          min-height: 100px;
        }

        .submit-contact-btn {
          margin-top: 10px;
          padding: 14px 20px;
        }

        /* Success Alert */
        .form-success-alert {
          text-align: center;
          padding: 40px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .form-success-alert .success-icon {
          margin-bottom: 20px;
          animation: pulse-glow 2s infinite;
          border-radius: 50%;
          padding: 8px;
        }

        .form-success-alert h3 {
          font-size: 1.3rem;
          color: #fff;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .form-success-alert p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 400px;
        }

        /* FAQ Section styling */
        .faq-section-contact {
          border-top: 1px solid var(--border);
          padding-top: 80px;
        }
      `}</style>
    </div>
  );
}
