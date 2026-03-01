"use client";
import React from "react";
import FallingItems from "../ui/FallingItems";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        .hero-section {
          position: relative;
          height: 100svh;
          min-height: 620px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow-x: hidden; 
  overflow-y: hidden;
        }

        // .hero-bg {
        //   position: absolute;
        //   inset: 0;
        //   background-image: url('/hero1.jpeg');
        //   background-size: cover;
        //   background-position: center top;
        //   transform: scale(1.06);
        //   animation: slowZoom 18s ease-in-out infinite alternate;
        //   z-index: 0;
        // }
        @keyframes slowZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1.13); }
        }

        .hero-overlay-dark {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(10,6,2,0.48) 0%, rgba(20,12,4,0.32) 45%, rgba(10,6,2,0.58) 100%);
          z-index: 1;
        }
        .hero-overlay-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(55,25,4,0.58) 100%);
          z-index: 2;
        }

        /* Floral borders */
        .hero-frame-top {
          position: absolute; top: 0; left: 0; width: 100%;
          z-index: 6; pointer-events: none; line-height: 0;
          // filter: drop-shadow(0 0 12px rgba(201,168,76,0.6)) drop-shadow(0 3px 8px rgba(139,105,20,0.45));
          // animation: frameGlow 5s ease-in-out infinite;
        }
        
        // @keyframes frameGlow {
        //   0%,100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.5)) drop-shadow(0 2px 5px rgba(139,105,20,0.4)); }
        //   50%      { filter: drop-shadow(0 0 20px rgba(201,168,76,0.8)) drop-shadow(0 3px 12px rgba(139,105,20,0.55)); }
        // }
        .hero-frame-top img, {
          width: 100%; display: block; object-fit: cover; max-height: 160px;
        }

        /* Content */
        .hero-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center;
          padding: 0 24px;
        }

        /* Improved pretitle readability */
        .hero-pretitle {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.85rem, 2vw, 1.1rem);
          letter-spacing: 0.45em;
          color: #FDFAF3;
          text-transform: uppercase;
          margin-bottom: 20px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.5);
          background: linear-gradient(135deg, #FFFFFF 0%, #F5E6B8 50%, #FFFFFF 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeUp 1.2s 0.1s ease both, gradientShift 6s ease-in-out infinite;
          font-weight: 500;
          position: relative;
          display: inline-block;
          padding: 0 8px;
        }

        .hero-pretitle::before,
        .hero-pretitle::after {
          content: '✦';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #C9A84C;
          font-size: 0.8rem;
          opacity: 0.6;
          text-shadow: 0 0 8px rgba(201,168,76,0.8);
        }

        .hero-pretitle::before {
          left: -20px;
        }

        .hero-pretitle::after {
          right: -20px;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-names {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(4.5rem, 12vw, 10rem);
          color: #FDFAF3;
          font-weight: 400; line-height: 1; margin: 0; letter-spacing: 3px;
          text-shadow: 0 2px 40px rgba(201,168,76,0.45), 0 0 80px rgba(201,168,76,0.15);
          animation: fadeUp 1.2s 0.25s ease both;
        }
        .hero-amp {
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 25%, #F5E6B8 50%, #C9A84C 75%, #8B6914 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s ease-in-out infinite; display: inline-block;
        }
        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .hero-ornament {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0 24px;
          animation: fadeUp 1.2s 0.4s ease both;
        }
        .orn-line  { height:1px; width:65px; background: linear-gradient(90deg,transparent,rgba(201,168,76,0.85),transparent); }
        .orn-diamond { width:8px;height:8px;background:#C9A84C;transform:rotate(45deg);box-shadow:0 0 10px rgba(201,168,76,0.8);flex-shrink:0; }
        .orn-dot   { width:4px;height:4px;background:rgba(201,168,76,0.55);transform:rotate(45deg);flex-shrink:0; }

        .hero-date {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.85rem, 2vw, 1rem); 
          letter-spacing: 0.4em;
          color: #FDFAF3; 
          text-transform: uppercase; 
          margin-bottom: 8px;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          animation: fadeUp 1.2s 0.52s ease both;
        }
        .hero-location {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(1.2rem, 2.5vw, 1.4rem); 
          color: #FDFAF3;
          margin-bottom: 48px; 
          letter-spacing: 0.05em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          animation: fadeUp 1.2s 0.64s ease both;
        }

        .hero-actions {
          display: flex; gap: 18px; flex-wrap: wrap; justify-content: center;
          animation: fadeUp 1.2s 0.8s ease both;
        }
        .btn-gold {
          font-family:'Cinzel',serif; font-size:0.7rem; letter-spacing:0.32em; text-transform:uppercase;
          color:#1a0e00;
          background:linear-gradient(135deg,#8B6914,#C9A84C,#F0D478,#C9A84C,#8B6914);
          background-size:200% 100%; border:none; padding:15px 40px;
          text-decoration:none; display:inline-block;
          box-shadow:0 4px 26px rgba(139,105,20,0.5),inset 0 1px 0 rgba(255,255,255,0.3);
          transition:background-position .5s,transform .25s,box-shadow .25s; cursor:pointer;
        }
        .btn-gold:hover { background-position:100% 0; transform:translateY(-3px); box-shadow:0 12px 38px rgba(139,105,20,0.65),inset 0 1px 0 rgba(255,255,255,0.3); }

        .btn-outline {
          font-family:'Cinzel',serif; font-size:0.7rem; letter-spacing:0.32em; text-transform:uppercase;
          color:#FDFAF3; background:rgba(0,0,0,0.3);
          border:1px solid rgba(201,168,76,0.7); padding:14px 40px;
          text-decoration:none; display:inline-block; backdrop-filter:blur(6px);
          transition:border-color .3s,background .3s,transform .25s,color .3s; cursor:pointer;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .btn-outline:hover { border-color:rgba(201,168,76,0.9); background:rgba(201,168,76,0.15); color:#FFFFFF; transform:translateY(-3px); }

        .hero-scroll {
          position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
          z-index:10; display:flex; flex-direction:column; align-items:center; gap:8px;
          animation: fadeUp 1.6s 1.2s ease both;
        }
        .scroll-label { font-family:'Cinzel',serif; font-size:0.52rem; letter-spacing:0.4em; color:rgba(245,230,184,0.8); text-transform:uppercase; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
        .scroll-bar   { width:1px; height:38px; background:linear-gradient(to bottom,rgba(245,230,184,0.9),transparent); animation:scrollPulse 2.2s ease-in-out infinite; }
        @keyframes scrollPulse {
          0%,100% { opacity:.35; transform:scaleY(.9); }
          50%     { opacity:1;   transform:scaleY(1.1); }
        }

        @media (max-width:500px) {
          .hero-actions { flex-direction:column; align-items:center; }
          .btn-gold,.btn-outline { width:230px; text-align:center; }
          .orn-line { width:42px; }
          .hero-frame-top img { max-height:60px; }
          .hero-pretitle::before,
          .hero-pretitle::after {
            display: none;
          }
        }



.hero-names {
  //letter-spacing: 1px;   /* script fonts shouldn't have 3px spacing */
   padding: 0 0.15em;     /* give breathing room */
}

.hero-amp {
letter-spacing: 10px;
  display: inline-block;
  padding: 0 0.08em;     /* prevent side clipping */
}

.hero-bg-image {
  object-fit: cover;
  object-position: center top;
  transform: scale(1.06);
  animation: slowZoom 18s ease-in-out infinite alternate;
  z-index: 0;
}
      `}</style>

      <section className="hero-section">
        {/* BG layers */}
        {/* <div className="hero-bg" /> */}
        <Image
  src="/hero1.jpeg"
  alt="Wedding Background"
  fill
  priority
  quality={80}
  sizes="100vw"
  className="hero-bg-image"
/>
        <div className="hero-overlay-dark" />
        <div className="hero-overlay-vignette" />

        {/* ✨ Falling items - now handles both SVG and golden particles */}
        <FallingItems
          leafCount={15}
          flowerCount={10}
          enableGoldenParticles={true}
          particleCount={90}
        />

        {/* Floral borders */}
        <div className="hero-frame-top">
          <img src="/seamlessbordercopy.svg" alt="" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="hero-content">
          <p className="hero-pretitle">We are getting engaged</p>

          <h1 className="hero-names">
            Betty <span className="hero-amp">&amp;</span> Athul
          </h1>

          <div className="hero-ornament">
            <div className="orn-line" />
            <div className="orn-dot" />
            <div className="orn-diamond" />
            <div className="orn-dot" />
            <div className="orn-line" />
          </div>

          <p className="hero-date">April 23 · 2026</p>
          <p className="hero-location">PetRose Event Centre, Kochi, Kerala</p>

          <div className="hero-actions">
            <a href="/wedding.ics" download className="btn-gold">
              Save the Date
            </a>
            <a
              href="https://maps.app.goo.gl/DfRS3xi8feNoBDgd7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View Location
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>
    </>
  );
}