"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasStarted = useRef(false);

  const startMusic = async () => {
    if (!audioRef.current || hasStarted.current) return;
    try {
      await audioRef.current.play();
      hasStarted.current = true;
      setIsPlaying(true);
    } catch (err) {
      console.log("Autoplay blocked:", err);
    }
  };

  useEffect(() => {
    startMusic();
    const handleInteraction = () => { startMusic(); };
    const events = ["scroll", "touchstart", "click", "keydown", "mousemove"];
    events.forEach((e) =>
      window.addEventListener(e, handleInteraction, { once: true, passive: true })
    );
    return () => {
      events.forEach((e) => window.removeEventListener(e, handleInteraction));
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        hasStarted.current = true;
      }).catch(console.log);
    }
  };

  return (
    <>
      <style>{`
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7), 0 0 0 0 rgba(212,175,55,0.4), 0 4px 24px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(212,175,55,0.15), 0 0 0 20px rgba(212,175,55,0.05), 0 4px 24px rgba(0,0,0,0.4); }
        }
        @keyframes ripple {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes soundBars {
          0%, 100% { transform: scaleY(0.4); }
          50%       { transform: scaleY(1); }
        }
        @keyframes nudge {
          0%   { transform: translateY(0) scale(1); }
          15%  { transform: translateY(-4px) scale(1.07); }
          30%  { transform: translateY(0) scale(1); }
          45%  { transform: translateY(-2px) scale(1.03); }
          60%  { transform: translateY(0) scale(1); }
          100% { transform: translateY(0) scale(1); }
        }

        .music-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px 10px 14px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-family: 'Georgia', serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff8e7;
          background: linear-gradient(135deg, #1a1208 0%, #2d1f06 50%, #1a1208 100%);
          border: 1px solid rgba(212,175,55,0.5);
          transition: transform 0.2s ease, border-color 0.3s ease;
          overflow: visible;
        }

        .music-btn::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(212,175,55,0.6), rgba(255,236,170,0.3), rgba(212,175,55,0.6));
          z-index: -1;
          opacity: 0.6;
        }

        .music-btn:not(.playing) {
          animation: goldPulse 2.5s ease-in-out infinite, nudge 3s ease-in-out infinite;
        }

        .music-btn.playing {
          animation: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .music-btn:hover {
          transform: scale(1.06) !important;
          border-color: rgba(212,175,55,0.9);
          animation: none !important;
        }

        .music-btn:active {
          transform: scale(0.97) !important;
        }

        /* Ripple rings (only when not playing, to invite click) */
        .ripple-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 1.5px solid rgba(212,175,55,0.5);
          animation: ripple 2.5s ease-out infinite;
          pointer-events: none;
        }
        .ripple-ring:nth-child(2) { animation-delay: 0.8s; }
        .music-btn.playing .ripple-ring { display: none; }

        /* Icon wrapper */
        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }

        /* Animated sound bars (playing state) */
        .sound-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 16px;
        }
        .bar {
          width: 3px;
          border-radius: 2px;
          background: linear-gradient(to top, #d4af37, #fff8e7);
          transform-origin: bottom;
        }
        .bar:nth-child(1) { height: 60%; animation: soundBars 0.8s ease-in-out infinite; animation-delay: 0s; }
        .bar:nth-child(2) { height: 100%; animation: soundBars 0.8s ease-in-out infinite; animation-delay: 0.15s; }
        .bar:nth-child(3) { height: 70%; animation: soundBars 0.8s ease-in-out infinite; animation-delay: 0.3s; }
        .bar:nth-child(4) { height: 45%; animation: soundBars 0.8s ease-in-out infinite; animation-delay: 0.45s; }

        /* Label */
        .btn-label {
          background: linear-gradient(90deg, #d4af37, #fff8e7, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          white-space: nowrap;
        }
      `}</style>

      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className={`music-btn ${isPlaying ? "playing" : ""}`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {/* Ripple rings (invite to click) */}
        <span className="ripple-ring" />
        <span className="ripple-ring" />

        {/* Icon */}
        <span className="icon-wrap">
          {isPlaying ? (
            /* Animated sound bars while playing */
            <span className="sound-bars">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          ) : (
            /* Music note icon when paused */
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#fff8e7" />
                </linearGradient>
              </defs>
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </span>

        {/* Label */}
        <span className="btn-label">
          {isPlaying ? "Now Playing" : "Play Music"}
        </span>
      </button>
    </>
  );
}