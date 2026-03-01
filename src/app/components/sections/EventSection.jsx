"use client";
import { Reveal, RevealGroup, GoldLine } from "../ui/scrollAnimations";



export default function EventsSection() {
  const events = [
    {
      title: "BETROTHAL",
      date: "23 April 2026",
      time: "7:00 PM",
      location: "At Little Flower Catholic Church, Puthencruz, Ernakulam.",
      detail: "Followed by dinner at PetRose Event Centre, Puthencruz.",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4521783016576!2d76.44591439999999!3d9.979456299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0875294c0765ff%3A0x7364789e33bd1555!2sPetRose%20Event%20Centre!5e0!3m2!1sen!2sin!4v1772190167814!5m2!1sen!2sin",
      mapUrl: "https://maps.app.goo.gl/Zt7hfE8q6Lc2JrN2A",
    },
    {
      title: "WEDDING",
      date: "2 May 2026",
      time: "7:00 PM",
      location: "At St. Mary's Syro-Malabar Church, Muttom, Cherthala.",
      detail: "Followed by dinner at Anthraper Gardens Mansion, Cherthala ",
      mapSrc:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.829391044604!2d76.3436547!3d9.6955984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087c14567d3a35%3A0x8d2e85706d8e790f!2sAnthraper%20Gardens%20Homestay%20Mansion!5e0!3m2!1sen!2sin!4v1772197821330!5m2!1sen!2sin",
      mapUrl:
        "https://maps.app.goo.gl/oCf59rcdDb9MFNR58",
    },
  ];
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #F0D478;
          --gold-bright: #F5E6B8;
          --gold-dark: #8B6914;
          --gold-deep: #6B4F10;
          --ivory: #FDFAF3;
          --ivory-mid: #F5EDD8;
          --ivory-dark: #EDE0C0;
          --text-dark: #3D2B0E;
          --text-mid: #6B4F1E;
        }

        .events-section {
          background: radial-gradient(ellipse at 50% 0%, #F7F0DC 0%, #FDFAF3 50%, #F0E8D0 100%);
          min-height: 100vh;
          padding: 80px 20px 100px;
          font-family: 'Cormorant Garamond', serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background texture */
        .events-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }

        .events-title {
          text-align: center;
          font-family: 'Great Vibes', cursive;
          font-size: clamp(4rem, 9vw, 6.5rem);
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          letter-spacing: 3px;
          filter: drop-shadow(0 2px 8px rgba(139,105,20,0.25));
          animation: shimmerTitle 4s ease-in-out infinite;
          background-size: 200% 100%;
        }

        @keyframes shimmerTitle {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .title-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 60px;
        }

        .title-ornament-line {
          height: 1px;
          width: 80px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .title-ornament-diamond {
          width: 8px;
          height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 480px));
          gap: 60px;
          justify-content: center;
          max-width: 1140px;
          margin: 0 auto;
        }

        /* The frame wrapper - positions the SVG frame around the card */
        .event-frame-wrapper {
          position: relative;
          /* Extra padding so the frame SVG overlaps outside the card */
        }

        /* The actual garden foliage frame - absolutely positioned to overflow the card */
        .frame-svg {
          position: absolute;
          inset: -38px;
          width: calc(100% + 76px);
          height: calc(100% + 76px);
          pointer-events: none;
          z-index: 3;
          /* Golden chrome filter */
          filter: 
            drop-shadow(0 0 8px rgba(201,168,76,0.5))
            drop-shadow(0 0 2px rgba(245,230,184,0.8))
            drop-shadow(0 2px 4px rgba(139,105,20,0.4));
          animation: goldPulse 5s ease-in-out infinite;
        }

        @keyframes goldPulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.5)) drop-shadow(0 0 2px rgba(245,230,184,0.8)) drop-shadow(0 2px 4px rgba(139,105,20,0.4)); }
          50% { filter: drop-shadow(0 0 14px rgba(201,168,76,0.7)) drop-shadow(0 0 4px rgba(245,230,184,1)) drop-shadow(0 2px 8px rgba(139,105,20,0.5)); }
        }

        .event-card {
          position: relative;
          z-index: 2;
          background: linear-gradient(160deg, #FEFCF5 0%, #FAF3E0 40%, #FDF8ED 100%);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 52px 40px 40px;
          box-shadow:
            0 8px 40px rgba(139,105,20,0.15),
            0 2px 10px rgba(201,168,76,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(201,168,76,0.15);
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.45s ease;
          /* Tiny inner border */
          outline: 1px solid rgba(201,168,76,0.15);
          outline-offset: -10px;
        }

        .event-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 20px 60px rgba(139,105,20,0.2),
            0 4px 16px rgba(201,168,76,0.18),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(201,168,76,0.2);
        }

        .event-card-title {
          font-family: 'Cinzel', serif;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 0.4em;
          background: linear-gradient(135deg, #6B4F10 0%, #C9A84C 35%, #F0D478 50%, #C9A84C 65%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 16px;
        }

        .card-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 20%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.4) 80%, transparent 100%);
          margin-bottom: 30px;
          position: relative;
        }

        .card-divider::after {
          content: '◆';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--gold);
          font-size: 0.5rem;
          background: var(--ivory);
          padding: 0 6px;
          line-height: 1;
        }

        .event-meta {
          display: flex;
          justify-content: center;
          gap: 50px;
          margin-bottom: 28px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .meta-icon {
          color: var(--gold);
        }

        .meta-text {
          font-size: 1.05rem;
          color: var(--text-mid);
          font-weight: 400;
          letter-spacing: 0.03em;
          font-style: italic;
        }

        .event-location {
          text-align: center;
          color: var(--text-mid);
          font-size: 1.02rem;
          line-height: 1.8;
          margin-bottom: 24px;
          font-style: italic;
        }

        .map-wrapper {
          border: 1px solid rgba(201,168,76,0.35);
          box-shadow: inset 0 0 0 3px rgba(250,243,224,0.9), 0 2px 12px rgba(139,105,20,0.12);
          overflow: hidden;
          margin-top: 4px;
        }

        .map-wrapper iframe {
          display: block;
          width: 100%;
          height: 195px;
          border: none;
        }

        .map-link {
          display: block;
          text-align: center;
          margin-top: 12px;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: var(--gold-dark);
          text-decoration: none;
          transition: color 0.2s;
        }
        .map-link:hover { color: var(--gold); }

        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr; max-width: 480px; }
          .event-card { padding: 44px 24px 32px; }
          .frame-svg { inset: -28px; width: calc(100% + 56px); height: calc(100% + 56px); }
        }
      `}</style>

<section id="events" className="events-section">
      <Reveal animation="fadeUp" duration="0.9s">
          <h2 className="events-title">Events</h2>
        </Reveal>
        <Reveal animation="fadeIn" delay="0.15s" duration="0.7s">
          <div className="title-ornament">
            <div className="title-ornament-line" />
            <div className="title-ornament-diamond" />
            <div className="title-ornament-line" />
          </div>
        </Reveal>

        
        
        <div className="events-grid">
          {events.map((event, i) => (
            <div className="event-frame-wrapper" key={i}>
              <div className="event-card">
              <Reveal animation="fadeUp" delay="0.1s" duration="0.5s" threshold={0.3}>
                  <h3 className="event-card-title">{event.title}</h3>
                </Reveal>
                <Reveal animation="fadeIn" delay="0.2s" duration="0.5s" threshold={0.3}>
                  <div className="card-divider" />
                </Reveal>

                {/* Meta items group with stagger */}
                <RevealGroup 
                  animation="fadeUp" 
                  staggerDelay={0.1} 
                  baseDelay={0.3}
                  duration="0.5s"
                  threshold={0.3}
                >
                  <div className="event-meta">
                    <div className="meta-item">
                      <span className="meta-icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </span>
                      <span className="meta-text">{event.date}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </span>
                      <span className="meta-text">{event.time}</span>
                    </div>
                  </div>
                </RevealGroup>


                <Reveal animation="fadeUp" delay="0.5s" duration="0.6s" threshold={0.3}>
                  <p className="event-location">
                    {event.location}
                    <br />
                    {event.detail}
                  </p>
                </Reveal>

                <Reveal animation="fadeIn" delay="0.7s" duration="0.6s" threshold={0.3}>
                  <div className="map-wrapper">
                    <iframe
                      src={event.mapSrc}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map for ${event.title}`}
                    />
                  </div>
                </Reveal>

                <Reveal animation="fadeUp" delay="0.9s" duration="0.5s" threshold={0.3}>
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    ↗ VIEW LARGER MAP
                  </a>
                </Reveal>
              </div>
            </div>
          ))}
        </div>

         {/* Decorative gold line at the bottom */}
         <Reveal animation="fadeIn" delay="1s" duration="0.6s">
          <GoldLine delay="0.2s" className="mt-7" />
        </Reveal>
      </section>
    </>
  );
}
