export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        .footer {
          position: relative;
          background: linear-gradient(180deg, #F7F0DC 0%, #FDFAF3 30%, #F0E8D0 100%);
          font-family: 'Cormorant Garamond', serif;
          overflow: hidden;
        }

        /* Subtle texture */
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
        }


        @keyframes footerGlow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(201,168,76,0.45)) drop-shadow(0 2px 4px rgba(139,105,20,0.3)); }
          50%     { filter: drop-shadow(0 0 16px rgba(201,168,76,0.75)) drop-shadow(0 2px 8px rgba(139,105,20,0.5)); }
        }


        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 680px;
          margin: 0 auto;
          padding: 52px 24px 48px;
          text-align: center;
        }

        /* Names */
        .footer-names {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 7vw, 5rem);
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #8B6914 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: shimmer 4s ease-in-out infinite;
          margin-bottom: 6px;
          line-height: 1.1;
          filter: drop-shadow(0 2px 6px rgba(139,105,20,0.15));
        }

        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }

        /* Ornament */
        .footer-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 18px 0 22px;
        }
        .orn-line {
          height: 1px; width: 70px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .orn-diamond {
          width: 7px; height: 7px;
          background: #C9A84C;
          transform: rotate(45deg);
          box-shadow: 0 0 8px rgba(201,168,76,0.7);
          flex-shrink: 0;
        }
        .orn-dot {
          width: 4px; height: 4px;
          background: rgba(201,168,76,0.55);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* Message */
        .footer-message {
          font-style: italic;
          font-size: clamp(1rem, 2.2vw, 1.15rem);
          color: rgba(61,43,14,0.7);
          line-height: 1.8;
          margin-bottom: 28px;
          letter-spacing: 0.02em;
        }

        /* Date & location row */
        .footer-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 32px;
        }

        .footer-detail-item {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          color: #8B6914;
          text-transform: uppercase;
        }

        .footer-detail-sep {
          width: 5px; height: 5px;
          background: #C9A84C;
          transform: rotate(45deg);
          opacity: 0.6;
          flex-shrink: 0;
        }

        /* Thin gold rule */
        .footer-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 20%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.5) 80%, transparent);
          margin-bottom: 22px;
          position: relative;
        }
        .footer-rule::after {
          content: '◆';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          color: #C9A84C;
          font-size: 0.45rem;
          background: #F7F0DC;
          padding: 0 8px;
          line-height: 1;
        }

        /* Copyright */
        .footer-copy {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(139,105,20,0.5);
          text-transform: uppercase;
        }

        .footer-copy a {
          color: rgba(139,105,20,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-copy a:hover { color: #C9A84C; }

        @media (max-width: 480px) {
          .footer-details { flex-direction: column; gap: 8px; }
          .footer-detail-sep { display: none; }
        }
      `}</style>

      <footer className="footer">


        <div className="footer-inner">

          {/* Names */}
          <h2 className="footer-names">Betty &amp; Athul</h2>

          {/* Ornament */}
          <div className="footer-ornament">
            <div className="orn-line" />
            <div className="orn-dot" />
            <div className="orn-diamond" />
            <div className="orn-dot" />
            <div className="orn-line" />
          </div>

          {/* Message */}
          <p className="footer-message">
            Thank you for being a part of our journey and sharing<br />
            in the joy of our most special day.
          </p>

          {/* Date & location */}
          <div className="footer-details">
            <span className="footer-detail-item">April 23, 2026</span>
            <div className="footer-detail-sep" />
            <span className="footer-detail-item">Kochi, Kerala</span>
            <div className="footer-detail-sep" />
            <span className="footer-detail-item">PetRose Event Centre</span>
          </div>

          {/* Divider */}
          <div className="footer-rule" />

          {/* Copyright */}
          <p className="footer-copy">
            © {new Date().getFullYear()} Betty &amp; Athul · Made By JOHIN THAMPI
          </p>

        </div>
      </footer>
    </>
  );
}