"use client";
import { useEffect, useState } from "react";
import { Reveal, RevealGroup, GoldLine } from "../ui/scrollAnimations";

export default function Countdown() {
  const weddingDate = new Date("2026-04-23T19:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tickSeconds, setTickSeconds] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
      
      // Tick animation for seconds
      setTickSeconds(true);
      setTimeout(() => setTickSeconds(false), 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days,    label: "Days" },
    { value: timeLeft.hours,   label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        .countdown-section {
          background: radial-gradient(ellipse at 50% 0%, #F7F0DC 0%, #FDFAF3 50%, #F0E8D0 100%);
          padding: 90px 20px;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          position: relative;
          overflow: hidden;
        }

        .countdown-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }

        .countdown-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3.2rem, 7vw, 5.5rem);
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: shimmerTitle 4s ease-in-out infinite;
          margin-bottom: 10px;
          filter: drop-shadow(0 2px 8px rgba(139,105,20,0.2));
        }

        @keyframes shimmerTitle {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .countdown-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .ornament-line {
          height: 1px;
          width: 80px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .ornament-diamond {
          width: 7px;
          height: 7px;
          background: #C9A84C;
          transform: rotate(45deg);
        }

        .countdown-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          letter-spacing: 0.35em;
          color: #8B6914;
          margin-bottom: 56px;
          text-transform: uppercase;
        }

        .countdown-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Separator dot between units */
        .countdown-grid .time-unit:not(:last-child)::after {
          content: '✦';
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-60%);
          color: #C9A84C;
          font-size: 1rem;
          opacity: 0.6;
        }

        .time-unit {
          position: relative;
          background: linear-gradient(160deg, #FEFCF5 0%, #FAF3E0 50%, #FDF8ED 100%);
          border: 1px solid rgba(201,168,76,0.35);
          outline: 1px solid rgba(201,168,76,0.15);
          outline-offset: -8px;
          box-shadow:
            0 6px 30px rgba(139,105,20,0.12),
            0 1px 6px rgba(201,168,76,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9);
          padding: 30px 10px 22px;
          width: 148px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .time-unit:hover {
          transform: translateY(-4px);
          box-shadow:
            0 14px 50px rgba(139,105,20,0.18),
            0 2px 10px rgba(201,168,76,0.15),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }

        /* Top corner accents */
        .corner-accent {
          position: absolute;
          width: 18px;
          height: 18px;
          pointer-events: none;
        }
        .corner-accent.tl { top: 5px; left: 5px; border-top: 1.5px solid rgba(201,168,76,0.6); border-left: 1.5px solid rgba(201,168,76,0.6); }
        .corner-accent.tr { top: 5px; right: 5px; border-top: 1.5px solid rgba(201,168,76,0.6); border-right: 1.5px solid rgba(201,168,76,0.6); }
        .corner-accent.bl { bottom: 5px; left: 5px; border-bottom: 1.5px solid rgba(201,168,76,0.6); border-left: 1.5px solid rgba(201,168,76,0.6); }
        .corner-accent.br { bottom: 5px; right: 5px; border-bottom: 1.5px solid rgba(201,168,76,0.6); border-right: 1.5px solid rgba(201,168,76,0.6); }

        .time-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.8rem;
          font-weight: 300;
          line-height: 1;
          margin-bottom: 10px;
          background: linear-gradient(180deg, #8B6914 0%, #C9A84C 40%, #F0D478 55%, #C9A84C 75%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          /* tick animation on seconds */
          transition: transform 0.1s ease;
        }

        .time-value.tick {
          transform: scale(1.06);
        }

        .time-unit-divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent);
          margin: 0 auto 10px;
        }

        .time-label {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: #8B6914;
          text-transform: uppercase;
          display: block;
        }

        .countdown-footer {
          margin-top: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .footer-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5));
        }
        .footer-line.right {
          background: linear-gradient(90deg, rgba(201,168,76,0.5), transparent);
        }
        .footer-date {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #8B6914;
          letter-spacing: 0.08em;
        }

        @media (max-width: 600px) {
          .time-unit { width: 130px; padding: 24px 8px 18px; }
          .time-value { font-size: 3rem; }
          .countdown-grid { gap: 14px; }
          .countdown-grid .time-unit:not(:last-child)::after { display: none; }
        }
        .time-value.tick {
          transform: scale(1.06);
        }
      `}</style>

<section className="countdown-section">
        <Reveal animation="fadeUp" duration="0.8s">
          <h2 className="countdown-title">Count Down</h2>
        </Reveal>

        <Reveal animation="fadeIn" delay="0.15s" duration="0.6s">
          <div className="countdown-ornament">
            <div className="ornament-line" />
            <div className="ornament-diamond" />
            <div className="ornament-line" />
          </div>
        </Reveal>

        <Reveal animation="fadeUp" delay="0.25s" duration="0.7s">
          <p className="countdown-subtitle">To Our Big Day</p>
        </Reveal>

        <RevealGroup 
          animation="scaleUp" 
          staggerDelay={0.1} 
          baseDelay={0.3}
          duration="0.6s"
          className="countdown-grid"
        >
          {units.map(({ value, label }, index) => (
            <div className="time-unit" key={label}>
              <span className="corner-accent tl" />
              <span className="corner-accent tr" />
              <span className="corner-accent bl" />
              <span className="corner-accent br" />
              <span className={`time-value ${label === "Seconds" && tickSeconds ? 'tick' : ''}`}>
                {String(value).padStart(2, "0")}
              </span>
              <div className="time-unit-divider" />
              <span className="time-label">{label}</span>
            </div>
          ))}
        </RevealGroup>

        <Reveal animation="fadeUp" delay="0.7s" duration="0.7s">
          <div className="countdown-footer">
            <div className="footer-line" />
            <span className="footer-date">April 23, 2026 • 7:00 PM</span>
            <div className="footer-line right" />
          </div>
        </Reveal>

        <Reveal animation="fadeIn" delay="0.9s" duration="0.5s">
          <GoldLine delay="0.2s" />
        </Reveal>
      </section>
    </>
  );
}