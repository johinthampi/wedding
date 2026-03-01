"use client";
import { useState, useEffect } from "react";


const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id   : i,
  left : 3 + (i * 6.1) % 94,
  delay: (i * 0.6) % 11,
  dur  : 10 + (i * 1.1) % 8,
  size : 5 + (i * 2.8) % 11,
  rot  : (i * 43) % 360,
}));

export default function EnvelopeLoader({ children }) {
  const [phase, setPhase] = useState("sealed");
  const [mounted, setMounted] = useState(false);
  const [hasSeen, setHasSeen] = useState(true); // default true = skip

  useEffect(() => {
    setMounted(true);

    // Only show envelope if not seen in this browser tab/session
    const seen = sessionStorage.getItem("envelopeSeen");
    if (!seen) {
      setHasSeen(false);
      sessionStorage.setItem("envelopeSeen", "true");

      const t = setTimeout(() => setPhase("hint"), 1100);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClick = () => {
    if (["shake", "opening", "card", "exit", "done"].includes(phase)) return;
    setPhase("shake");
    setTimeout(() => setPhase("opening"), 420);
    setTimeout(() => setPhase("card"), 1100);
    setTimeout(() => setPhase("exit"), 2900);
    setTimeout(() => setPhase("done"), 3850);
  };

  if (!mounted) return null;

  // Skip envelope completely if already seen this session
  if (hasSeen) {
    return <>{children}</>;
  }

  // Normal envelope logic
  if (phase === "done") return <>{children}</>;

  const isOpening = ["opening", "card", "exit"].includes(phase);
  const isCard = ["card", "exit"].includes(phase);
  const isExit = phase === "exit";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        /* ── Overlay ── */
        .el-ov {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: radial-gradient(ellipse at 50% 38%,
            #F9F2E2 0%, #EEE2C6 45%, #DFD0AC 100%);
          cursor: pointer; overflow: hidden;
          opacity: 1;
          transition: opacity 1s cubic-bezier(0.4,0,0.2,1);
        }
        .el-ov.exit { opacity: 0; pointer-events: none; }

        /* Paper grain */
        .el-ov::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
          opacity:0.5;
        }

        /* ── Gold petals ── */
        .el-pt {
          position:absolute; pointer-events:none; will-change:transform;
          border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;
          background:rgba(201,168,76,0.17);
          animation:elPt linear infinite;
        }
        @keyframes elPt {
          0%   { transform:translateY(-20px) rotate(var(--pr)); opacity:0; }
          8%   { opacity:1; }
          90%  { opacity:0.5; }
          100% { transform:translateY(106vh) rotate(calc(var(--pr) + 230deg)); opacity:0; }
        }

        /* ── Scene ── */
        .el-scene {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1100px;
  margin-top: 200px;   /* 👈 push down */
}

        /* ── Envelope wrapper ── */
        .el-env {
          position:relative;
          width: min(500px, 92vw);
          aspect-ratio: 1.5 / 1;
          animation: elFloat 4s ease-in-out infinite;
        }
        .el-env.shake   { animation: elShake 0.38s ease-in-out forwards; }
        .el-env.opening,
        .el-env.card,
        .el-env.exit    { animation: none; }

        @keyframes elFloat {
          0%,100% { transform:translateY(0)    rotate(-0.8deg); }
          50%     { transform:translateY(-11px) rotate( 0.8deg); }
        }
        @keyframes elShake {
          0%   { transform:rotate(-1deg)   translateX(0); }
          20%  { transform:rotate(-2.5deg) translateX(-7px); }
          45%  { transform:rotate( 2.5deg) translateX( 8px); }
          65%  { transform:rotate(-1.5deg) translateX(-5px); }
          82%  { transform:rotate( 1deg)   translateX( 4px); }
          100% { transform:rotate(0deg)    translateX(0); }
        }

        /* ── Envelope BODY ── */
        .el-body {
          position:absolute; inset:0;
          background:linear-gradient(170deg, #FEFAF0 0%, #F5E9CE 55%, #EDE0B5 100%);
          border:1.5px solid rgba(201,168,76,0.4);
          border-radius:3px;
          box-shadow:
            0 22px 70px rgba(100,70,10,0.2),
            0 6px 18px rgba(100,70,10,0.1),
            inset 0 2px 0 rgba(255,250,225,0.9),
            inset 0 -1px 0 rgba(139,105,20,0.1);
          overflow:hidden;
        }

        /* Inside of envelope — darker gold, shows when flap opens */
        .el-body-inside {
          position:absolute; inset:0;
          background:linear-gradient(170deg, #E6D5A5 0%, #CEBC80 100%);
          opacity:0;
          transition:opacity 0.35s ease 0.2s;
        }
        .el-env.opening .el-body-inside,
        .el-env.card    .el-body-inside,
        .el-env.exit    .el-body-inside { opacity:1; }

        /* V-fold left triangle */
        .el-vl {
          position:absolute; bottom:0; left:0; width:0; height:0;
          border-bottom:solid rgba(139,105,20,0.11);
          border-right: solid transparent;
          border-bottom-width: calc(min(360px,86vw) * 0.31);
          border-right-width:  calc(min(360px,86vw) * 0.5);
          pointer-events:none;
        }
        /* V-fold right triangle */
        .el-vr {
          position:absolute; bottom:0; right:0; width:0; height:0;
          border-bottom:solid rgba(139,105,20,0.08);
          border-left: solid transparent;
          border-bottom-width: calc(min(360px,86vw) * 0.31);
          border-left-width:   calc(min(360px,86vw) * 0.5);
          pointer-events:none;
        }
        /* Centre crease */
        .el-crease {
          position:absolute; bottom:0; left:50%;
          transform:translateX(-50%);
          width:1.5px; height:31%;
          background:linear-gradient(to top, rgba(139,105,20,0.22), transparent);
        }

        /* ── FLAP (folds open with 3D rotateX) ── */
        .el-flap-wrap {
          position:absolute; top:0; left:0; right:0;
          height:50%;
          transform-origin:top center;
          transform-style:preserve-3d;
          z-index:10;
          transform:rotateX(0deg);
          transition:transform 0.72s cubic-bezier(0.38,0,0.1,1);
        }
        .el-env.opening .el-flap-wrap,
        .el-env.card    .el-flap-wrap,
        .el-env.exit    .el-flap-wrap { transform:rotateX(-176deg); }

        /* Front face of flap */
        .el-flap {
          position:absolute; inset:0;
          background:linear-gradient(170deg, #F5EDD5 0%, #EAE0B5 55%, #DDD0A0 100%);
          clip-path:polygon(0% 0%, 100% 0%, 50% 95%);
          border-bottom:1px solid rgba(201,168,76,0.28);
        }
        /* Back face of flap (inside of lid, shows when folded) */
        .el-flap::after {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(170deg, #C8B878 0%, #AE9858 100%);
          clip-path:polygon(0% 0%, 100% 0%, 50% 95%);
          transform:rotateX(180deg) translateZ(1px);
          backface-visibility:visible;
        }

        /* ── GOLD WAX SEAL — your SVG ── */
        .el-seal {
          position:absolute;
          top:44%; left:50%;
          transform:translate(-50%, -50%);
          z-index:20;
          /* comfortable reading size */
         width: clamp(160px, 34vw, 220px);
height: clamp(160px, 34vw, 220px);
          cursor:pointer;
          user-select:none;
          pointer-events:none;
          /* golden glow around the seal */
          filter:
            drop-shadow(0 4px 20px rgba(139,105,20,0.6))
            drop-shadow(0 0 8px rgba(201,168,76,0.3));
          animation:sealGlow 2.6s ease-in-out infinite;
          transition:
            transform 0.4s cubic-bezier(0.34,1.2,0.64,1),
            opacity   0.28s ease,
            filter    0.3s ease;
        }
        @keyframes sealGlow {
          0%,100% {
            filter:
              drop-shadow(0 4px 20px rgba(139,105,20,0.55))
              drop-shadow(0 0 6px rgba(201,168,76,0.2));
          }
          50% {
            filter:
              drop-shadow(0 6px 30px rgba(201,168,76,0.9))
              drop-shadow(0 0 16px rgba(201,168,76,0.45))
              drop-shadow(0 2px 6px rgba(80,50,5,0.4));
          }
        }
        /* Crack and vanish when opening */
        .el-env.opening .el-seal,
        .el-env.card    .el-seal,
        .el-env.exit    .el-seal {
          transform:translate(-50%, -50%) scale(0.05) rotate(50deg);
          opacity:0;
          animation:none;
          filter:none;
        }

        /* ── INVITATION CARD ── */
        .el-card {
          position:absolute;
          bottom:5%; left:11%; right:11%;
          height:90%;
          background:linear-gradient(168deg, #FFFDF8 0%, #FEF7E6 50%, #F8EDD0 100%);
          border:1px solid rgba(201,168,76,0.32);
          box-shadow:
            0 -6px 30px rgba(139,105,20,0.2),
            0  4px 16px rgba(0,0,0,0.18),
            inset 0 1px 0 rgba(255,255,240,0.95);
          z-index:1;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          padding:18px 14px; border-radius:2px;
          clip-path:inset(110% 0 0 0);
          transform:translateY(0);
          transition:none;
        }
        .el-env.card .el-card,
        .el-env.exit .el-card {
          clip-path:inset(0% 0 0 0);
          transform:translateY(-106%);
          transition:
            clip-path 0.6s cubic-bezier(0.22,1,0.36,1) 0.08s,
            transform  0.72s cubic-bezier(0.22,1,0.36,1) 0.08s;
        }

        /* Card corner brackets */
        .el-cc { position:absolute; width:18px; height:18px; pointer-events:none; }
        .el-cc.tl { top:9px;    left:9px;    border-top:1.5px solid rgba(201,168,76,0.5); border-left:1.5px solid rgba(201,168,76,0.5); }
        .el-cc.tr { top:9px;    right:9px;   border-top:1.5px solid rgba(201,168,76,0.5); border-right:1.5px solid rgba(201,168,76,0.5); }
        .el-cc.bl { bottom:9px; left:9px;    border-bottom:1.5px solid rgba(201,168,76,0.5); border-left:1.5px solid rgba(201,168,76,0.5); }
        .el-cc.br { bottom:9px; right:9px;   border-bottom:1.5px solid rgba(201,168,76,0.5); border-right:1.5px solid rgba(201,168,76,0.5); }

        /* Card text */
        .el-c-pre {
          font-family:'Cinzel',serif;
          font-size:clamp(0.38rem,1.5vw,0.5rem);
          letter-spacing:0.4em; text-transform:uppercase;
          color:rgba(139,105,20,0.6); margin-bottom:8px;
        }
        .el-c-names {
          font-family:'Great Vibes',cursive;
          font-size:clamp(1.5rem,6vw,2.3rem);
          background:linear-gradient(135deg,#8B6914,#C9A84C,#F5E6B8,#C9A84C,#8B6914);
          background-size:200% 100%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:cShimmer 3s ease-in-out infinite;
          line-height:1.1; margin-bottom:3px;
        }
        @keyframes cShimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .el-c-orn { display:flex; align-items:center; gap:7px; margin:7px 0 9px; }
        .el-c-line { width:26px; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent); }
        .el-c-gem { width:4px; height:4px; background:#C9A84C; transform:rotate(45deg); box-shadow:0 0 5px rgba(201,168,76,0.6); }
        .el-c-date {
          font-family:'Cinzel',serif; font-size:clamp(0.42rem,1.6vw,0.55rem);
          letter-spacing:0.3em; text-transform:uppercase;
          color:rgba(107,79,30,0.72); margin-bottom:3px;
        }
        .el-c-loc {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:clamp(0.62rem,2.2vw,0.78rem);
          color:rgba(107,79,30,0.58); letter-spacing:0.04em;
        }

        /* ── Hint text ── */
        .el-hint {
          margin-top:34px;
          font-family:'Cinzel',serif;
          font-size:clamp(0.52rem,1.8vw,0.65rem);
          letter-spacing:0.42em; text-transform:uppercase;
          color:rgba(139,105,20,0.58);
          display:flex; align-items:center; gap:10px;
          opacity:0; transform:translateY(8px);
          transition:opacity 0.65s ease, transform 0.65s ease;
          pointer-events:none;
        }
        .el-hint.vis  { opacity:1; transform:translateY(0); }
        .el-hint.hide { opacity:0; transform:translateY(-6px); }
        .el-hint-dot {
          width:4px; height:4px; border-radius:50%;
          background:rgba(201,168,76,0.55);
          animation:hDot 1.6s ease-in-out infinite;
        }
        @keyframes hDot { 0%,100%{transform:scale(1);opacity:.45} 50%{transform:scale(1.7);opacity:1} }
        .el-hint-dot:nth-child(2){animation-delay:.18s}
        .el-hint-dot:nth-child(3){animation-delay:.36s}
      `}</style>

      {/* ── Overlay ── */}
      <div
        className={`el-ov${isExit ? " exit" : ""}`}
        onClick={handleClick}
        role="button"
        aria-label="Tap to open your wedding invitation"
      >
        {/* Falling gold petals */}
        {PETALS.map(p => (
          <div key={p.id} className="el-pt" style={{
            left:`${p.left}%`,
            width:`${p.size}px`,
            height:`${p.size * 1.6}px`,
            animationDelay:`${p.delay}s`,
            animationDuration:`${p.dur}s`,
            "--pr":`${p.rot}deg`,
          }}/>
        ))}

        <div className="el-scene">
          <div className={`el-env ${phase}`}>

            {/* ① Invitation card — hidden inside, slides up on open */}
            <div className="el-card">
              <span className="el-cc tl"/><span className="el-cc tr"/>
              <span className="el-cc bl"/><span className="el-cc br"/>
              <p className="el-c-pre">You are invited to</p>
              <h1 className="el-c-names">Betty &amp; Athul</h1>
              <div className="el-c-orn">
                <div className="el-c-line"/>
                <div className="el-c-gem"/>
                <div className="el-c-line"/>
              </div>
              <p className="el-c-date">December 12 · 2026</p>
              <p className="el-c-loc">St. Mary's Church, Kochi</p>
            </div>

            {/* ② Envelope body (cream CSS) */}
            <div className="el-body">
              <div className="el-body-inside"/>
              <div className="el-vl"/>
              <div className="el-vr"/>
              <div className="el-crease"/>
            </div>

            {/* ③ Flap triangle — folds back 3D */}
            <div className="el-flap-wrap">
              <div className="el-flap"/>
            </div>

            {/* ④ Your gold wax seal SVG — sits over flap/body join */}
            <img
              src="/goldseal.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="el-seal"
            />

          </div>

          {/* "Tap to open" hint */}
          <p className={`el-hint${phase==="hint"?" vis":isOpening?" hide":""}`}>
            <span className="el-hint-dot"/>
            <span className="el-hint-dot"/>
            <span className="el-hint-dot"/>
            <span style={{marginLeft:"4px"}}>Tap to open</span>
          </p>
        </div>
      </div>

      {/* Page content — rendered but hidden until animation done */}
      <div style={{ visibility: phase === "done" ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}

