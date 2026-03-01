"use client";
import { useState } from "react";
import { Reveal, RevealGroup, GoldLine } from "../ui/scrollAnimations";



const families = [
  {
    side: "Bride",
    label: "Bride's Family",
    familyName: "Perumkulathil Family",
    photo: "/bride-family.webp",
    address: "Perumkulathil (H),\nPuthencruz, Ernakulam, Kerala – 682308",
    bio: "Deeply rooted in Ernakulam’s traditions, the Perumkulathil family from Puthencruz has long been a pillar of faith, hospitality, and close-knit love. Their home reflects generations of shared values and joyful gatherings. Today, they welcome this joyous milestone as their beloved daughter embarks on her new life with grace and happiness.",
  },
  {
    side: "Groom",
    label: "Groom's Family",
    familyName: "Vanniamparambil Family",
    photo: "/groom-family.webp",
    address: "Vanniamparambil (H),\nCherthala, Alappuzha, Kerala –  688524",
    bio: "Deeply rooted in the serene backwaters of Cherthala, Alappuzha, the Vanniamparambil family has cherished values of faith, diligence, and unwavering family bonds for generations. Their home has always been a haven of hospitality and quiet strength. Today, they celebrate with profound joy as their son begins this beautiful new chapter, warmly welcoming a cherished daughter into their fold.",
  },
];
// ─────────────────────────────────────────────

function FamilyCard({ family }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="family-card">

      {/* Photo */}
      <div className="family-photo-wrap">
        <div className="photo-frame-ring" />
        

        {!imgError ? (
           <Reveal animation="fadeIn" delay="0.1s" duration="0.6s" threshold={0.2}>
           <img
             src={family.photo}
             alt={family.familyName}
             className="family-photo"
             onError={() => setImgError(true)}
           />
         </Reveal>
        ) : (
          <div className="family-photo-fallback">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>{family.familyName}</span>
          </div>
        )}

        {/* Gradient fade into content */}
        <div className="photo-gradient" />

        {/* Bride / Groom badge */}
        
      </div>
      <Reveal animation="fadeIn" delay="0.2s" duration="0.5s" threshold={0.2}>
            <div className="side-badge">{family.side}</div>
          </Reveal>

      {/* Text content */}
      <div className="family-content">
      <Reveal animation="fadeUp" delay="0.2s" duration="0.5s" threshold={0.2}>
            <p className="family-label">{family.label}</p>
          </Reveal>
          <Reveal animation="fadeUp" delay="0.3s" duration="0.5s" threshold={0.2}>
            <h3 className="family-name">{family.familyName}</h3>
          </Reveal>


          <Reveal animation="fadeIn" delay="0.4s" duration="0.5s" threshold={0.2}>
            <div className="content-divider">
              <div className="div-line" />
              <div className="div-diamond" />
              <div className="div-line" />
            </div>
          </Reveal>

          <Reveal animation="fadeUp" delay="0.5s" duration="0.6s" threshold={0.2}>
            <p className="family-bio">{family.bio}</p>
          </Reveal>
        {/* Address block */}
        <Reveal animation="fadeIn" delay="0.6s" duration="0.5s" threshold={0.2}>
            <a
              href={family.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="family-address"
            >
              <span className="address-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span className="address-text">
                {family.address.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </span>
            </a>
          </Reveal>
      </div>
    </div>
  );
}

export default function FamilySection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        /* ── Section ── */
        .family-section {
          background: radial-gradient(ellipse at 50% 0%, #F7F0DC 0%, #FDFAF3 50%, #F0E8D0 100%);
          padding: 90px 24px 110px;
          font-family: 'Cormorant Garamond', serif;
          position: relative;
          overflow: hidden;
        }

        .family-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }

        /* ── Header ── */
        .family-page-header {
          text-align: center;
          margin-bottom: 72px;
          position: relative;
          z-index: 1;
        }

        .family-page-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3.5rem, 8vw, 6rem);
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 8px rgba(139,105,20,0.2));
          line-height: 1.2;
        }

        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .page-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 14px;
        }
        .orn-line {
          height: 1px; width: 80px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .orn-diamond {
          width: 7px; height: 7px;
          background: #C9A84C;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .page-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          letter-spacing: 0.35em;
          color: #8B6914;
          text-transform: uppercase;
        }

        /* ── Cards row ── */
        .family-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 0;
          max-width: 1060px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          align-items: stretch;
        }

        /* Heart divider between cards */
.heart-divider {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 62px;
  height: 62px;
   border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.9rem;
  color: #C9A84C;
  pointer-events: none;

  /* ✨ Animations */
  animation:
    heartBeat 2.2s ease-in-out infinite,
    heartFloat 6s ease-in-out infinite;
}

/* 💓 Heartbeat Pulse */
@keyframes heartBeat {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  14% {
    transform: translate(-50%, -50%) scale(1.15);
  }
  28% {
    transform: translate(-50%, -50%) scale(1);
  }
  42% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  70% {
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 🌟 Floating Motion */
@keyframes heartFloat {
  0%, 100% {
    margin-top: 0px;
  }
  50% {
    margin-top: -6px;
  }
}

        /* ── Single card ── */
        .family-card {
          background: linear-gradient(160deg, #FEFCF5 0%, #FAF3E0 50%, #FDF8ED 100%);
          border: 1px solid rgba(201,168,76,0.28);
          outline: 1px solid rgba(201,168,76,0.1);
          outline-offset: -10px;
          box-shadow:
            0 8px 40px rgba(139,105,20,0.11),
            inset 0 1px 0 rgba(255,255,255,0.9);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;                  /* ← important */
  min-height: 780px;
        }

        .family-card:first-child {
          border-right: none;
        }

        .family-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 20px 60px rgba(139,105,20,0.17),
            inset 0 1px 0 rgba(255,255,255,0.9);
          z-index: 2;
        }

        /* Corner brackets */
        .family-card::before,
        .family-card::after {
          content: '';
          position: absolute;
          width: 20px; height: 20px;
          z-index: 2; pointer-events: none;
        }
        .family-card::before {
          top: 10px; left: 10px;
          border-top: 1.5px solid rgba(201,168,76,0.5);
          border-left: 1.5px solid rgba(201,168,76,0.5);
        }
        .family-card::after {
          bottom: 10px; right: 10px;
          border-bottom: 1.5px solid rgba(201,168,76,0.5);
          border-right: 1.5px solid rgba(201,168,76,0.5);
        }

        /* ── Photo ── */
        .family-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          overflow: hidden;
          flex-shrink: 0;
        }

        .family-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.6s ease;
        }
        .family-card:hover .family-photo {
          transform: scale(1.045);
        }

        .family-photo-fallback {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(245,230,184,0.2));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: rgba(139,105,20,0.45);
          font-style: italic;
          font-size: 0.95rem;
        }

        /* Inner decorative rings over photo */
        .photo-frame-ring {
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(201,168,76,0.18);
          z-index: 1;
          pointer-events: none;
        }
        .ring-2 { inset: 5px; border-color: rgba(201,168,76,0.1); }

        /* Fade bottom of photo into card bg */
        .photo-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60%;
          background: linear-gradient(to top, #FAF3E0 0%, rgba(250,243,224,0.6) 45%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        /* Badge */
        .side-badge {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 3;
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #FDFAF3;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #F0D478, #C9A84C, #8B6914);
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
          padding: 5px 13px;
          box-shadow: 0 2px 12px rgba(139,105,20,0.3);
        }

        /* ── Content ── */
        .family-content {
          padding: 28px 32px 34px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .family-label {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          color: rgba(139,105,20,0.6);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .family-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 400;
          color: #3D2B0E;
          letter-spacing: 0.02em;
          line-height: 1.2;
          margin-bottom: 0;
        }

        .content-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 16px 0 18px;
        }
        .div-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.6), transparent);
        }
        .div-line:last-child {
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.6));
        }
        .div-diamond {
          width: 6px; height: 6px;
          background: #C9A84C;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .family-bio {
          font-style: italic;
          font-size: 1rem;
          color: rgba(61,43,14,0.72);
          line-height: 1.88;
          flex: 1;
          margin-bottom: 24px;
        }

        /* Address */
        .family-address {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-decoration: none;
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.22);
          padding: 13px 15px;
          margin-bottom: 10px;
          transition: background 0.25s, border-color 0.25s;
        }
        .family-address:hover {
          background: rgba(201,168,76,0.12);
          border-color: rgba(201,168,76,0.4);
        }

        .address-icon {
          color: #C9A84C;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .address-text {
          font-size: 0.95rem;
          color: #6B4F1E;
          line-height: 1.65;
        }

        .map-link-row {
          text-align: right;
        }
        .map-link {
          font-family: 'Cinzel', serif;
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          color: #8B6914;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .map-link:hover { color: #C9A84C; }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .family-cards {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
          .family-card:first-child {
            border-right: 1px solid rgba(201,168,76,0.28);
            border-bottom: none;
          }
          .heart-divider { display: none; }
        }

        @media (max-width: 480px) {
          .family-section { padding: 70px 16px 90px; }
          .family-content { padding: 22px 20px 28px; }
          .family-name { font-size: 1.5rem; }
        }
      `}</style>

      <section id="family" className="family-section">

        {/* Header */}
        <Reveal animation="fadeUp" duration="0.9s">
          <div className="family-page-header">
            <h2 className="family-page-title">Our Families</h2>
            <Reveal animation="fadeIn" delay="0.15s" duration="0.7s">
              <div className="page-ornament">
                <div className="orn-line" />
                <div className="orn-diamond" />
                <div className="orn-line" />
              </div>
            </Reveal>
            <Reveal animation="fadeUp" delay="0.25s" duration="0.6s">
              <p className="page-subtitle">Two families, one beautiful beginning</p>
            </Reveal>
          </div>
        </Reveal>

        {/* Cards */}
        <div style={{ position: "relative", maxWidth: "1060px", margin: "0 auto" }}>
          <div className="family-cards">
            {families.map((family) => (
              <FamilyCard key={family.side} family={family} />
            ))}
          </div>

          {/* Central heart badge */}
          <div className="heart-divider">♥</div>
        </div>
        <Reveal animation="fadeIn" delay="0.8s" duration="0.6s">
          <GoldLine delay="0.2s" className="mt-6"/>
        </Reveal>
      </section>
    </>
  );
}