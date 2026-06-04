import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I unlock my rented bike?",
      answer: "Once you complete your checkout, a digital QR code will appear in your dashboard and be sent to your email. Simply walk up to the designated bike at the station, tap the lock screen, scan the QR code using your phone camera, and the electronic bolt will slide open automatically!"
    },
    {
      question: "What is included in the premium insurance?",
      answer: "Our premium damage insurance features zero-deductible liability coverage. It covers accidental damage to the bike frame, mechanical gears, tires, and electronic components, plus third-party liability. It does not cover theft if the bike was left completely unlocked."
    },
    {
      question: "Can I return the bike to a different station?",
      answer: "Yes, absolutely! You can pick up a bike at any Downtown Core station and drop it off at any Waterfront Hub, Midtown Station, or Suburb Terminal. Simply dock it in an empty slot at the destination hub to end your billing session."
    },
    {
      question: "How does the hourly rate billing work?",
      answer: "We charge in blocks of minutes, based on the bike's hourly price. When you checkout, we authorize a temporary hold on your credit card. Once you dock the bike safely and terminate the ride from the app dashboard, we calculate the exact minutes utilized and refund any unused balance instantly."
    },
    {
      question: "What happens if the E-Bike battery dies during my ride?",
      answer: "Our smart e-bikes report active telemetry to our main system. If your battery drops below 15%, the app dashboard will display a warning and guide you to the nearest Velo docking station to hot-swap your bike for a fully charged one for free."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
          >
            <button 
              className="faq-trigger" 
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <ChevronDown className="faq-arrow-icon" size={18} />
            </button>
            <div className="faq-content-wrapper">
              <div className="faq-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: rgba(17, 24, 39, 0.4);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: var(--transition-normal);
        }

        .faq-item:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.02);
        }

        .faq-item.open {
          border-color: var(--primary);
          box-shadow: 0 4px 20px rgba(226, 241, 60, 0.05);
        }

        .faq-trigger {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .faq-arrow-icon {
          color: var(--text-secondary);
          transition: transform 0.3s ease;
          flex-shrink: 0;
          margin-left: 16px;
        }

        .faq-item.open .faq-arrow-icon {
          transform: rotate(180deg);
          color: var(--primary);
        }

        .faq-content-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
        }

        .faq-item.open .faq-content-wrapper {
          max-height: 500px; /* Large enough to fit text */
          transition: max-height 0.4s cubic-bezier(1, 0, 1, 0);
        }

        .faq-content {
          padding: 0 24px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
        }

        .faq-content p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-top: 16px;
        }
      `}</style>
    </div>
  );
}
