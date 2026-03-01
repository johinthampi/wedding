"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home", showInAdmin: true },
  // { href: "/story", label: "Our Story" },
  { href: "#events", label: "Events" },
  { href: "#family", label: "Family" },
  // { href: "/gallery", label: "Gallery" },
  { href: "/admin", label: "Admin", showInAdmin: true },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  const visibleLinks = isAdminPage
  ? LINKS.filter(link => link.showInAdmin)
  : LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');

        /* ── Root ── */
        .nb {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease;
        }
        .nb.top {
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nb.solid {
          background: rgba(253,250,243,0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,76,0.25);
          box-shadow: 0 4px 28px rgba(139,105,20,0.1);
        }

        /* ── Inner bar ── */
        .nb-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 28px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .nb-logo {
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          line-height: 1;
          text-decoration: none;
          background: linear-gradient(135deg, #8B6914 0%, #C9A84C 28%, #F5E6B8 50%, #C9A84C 72%, #8B6914 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: nbShimmer 5s ease-in-out infinite;
          filter: drop-shadow(0 1px 8px rgba(139,105,20,0.3));
          flex-shrink: 0;
          transition: filter 0.3s;
        }
        .nb-logo:hover { filter: drop-shadow(0 2px 14px rgba(201,168,76,0.55)); }

        @keyframes nbShimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* ── Desktop links ── */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
        }

        .nb-link {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 16px;
          white-space: nowrap;
          transition: color 0.25s;
        }

        /* colour adapts to scroll state */
        .nb.top    .nb-link         { color: rgba(245,230,184,0.82); }
        .nb.top    .nb-link:hover   { color: #F5E6B8; }
        .nb.top    .nb-link.active  { color: #F5E6B8; }
        .nb.solid  .nb-link         { color: rgba(107,79,30,0.7); }
        .nb.solid  .nb-link:hover   { color: #8B6914; }
        .nb.solid  .nb-link.active  { color: #8B6914; }

        /* animated underline */
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 16px; right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-link:hover::after, .nb-link.active::after { transform: scaleX(1); }

        /* Diamond separator */
        .nb-sep {
          width: 4px; height: 4px;
          background: rgba(201,168,76,0.4);
          transform: rotate(45deg);
          flex-shrink: 0;
          margin: 0 2px;
        }
        .nb.top .nb-sep { background: rgba(245,230,184,0.3); }

        /* ── RSVP pill button ── */
        .nb-rsvp {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          text-decoration: none;
          color: #1a0e00 !important;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #F0D478, #C9A84C, #8B6914);
          background-size: 200% 100%;
          padding: 10px 22px;
          margin-left: 14px;
          animation: nbShimmer 4s ease-in-out infinite;
          box-shadow: 0 2px 14px rgba(139,105,20,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
          transition: transform 0.25s, box-shadow 0.25s;
          white-space: nowrap;
        }
        .nb-rsvp:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,105,20,0.5), inset 0 1px 0 rgba(255,255,255,0.25);
        }

        /* ── Hamburger ── */
        .nb-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-shrink: 0;
        }
        .nb-burger-bar {
          display: block;
          width: 22px;
          height: 1.5px;
          border-radius: 2px;
          background: #C9A84C;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease;
          transform-origin: center;
        }
        .nb-burger.open .nb-burger-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-burger.open .nb-burger-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-burger.open .nb-burger-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .nb-drawer {
          position: fixed;
          top: 70px; left: 0; right: 0;
          z-index: 49;
          background: rgba(253,250,243,0.97);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(201,168,76,0.22);
          box-shadow: 0 12px 40px rgba(139,105,20,0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 22px 0 30px;
          gap: 0;
          /* animation */
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
          transition: opacity 0.35s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-drawer.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .nb-drawer-link {
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(107,79,30,0.7);
          padding: 15px 48px;
          width: 100%;
          text-align: center;
          transition: color 0.2s, background 0.2s;
        }
        .nb-drawer-link:hover { color: #8B6914; background: rgba(201,168,76,0.05); }
        .nb-drawer-link.active { color: #C9A84C; }

        .nb-drawer-sep {
          width: 36px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent);
          margin: 2px 0;
        }

        .nb-drawer-rsvp {
          margin-top: 14px;
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          color: #1a0e00;
          background: linear-gradient(135deg, #8B6914, #C9A84C, #F0D478, #C9A84C, #8B6914);
          background-size: 200% 100%;
          padding: 13px 52px;
          animation: nbShimmer 4s ease-in-out infinite;
          box-shadow: 0 3px 18px rgba(139,105,20,0.32);
        }

        /* ── Responsive ── */
        @media (max-width: 780px) {
          .nb-links { display: none; }
          .nb-rsvp  { display: none; }
          .nb-burger { display: flex; }
          .nb-inner { padding: 0 18px; }
        }
      `}</style>

      {/* ── Nav bar ── */}
      <nav
  className={`nb ${
    pathname.startsWith("/admin")
      ? "solid"
      : scrolled
      ? "solid"
      : "top"
  }`}
>
        <div className="nb-inner">

          {/* Logo */}
          <Link href="/" className="nb-logo">Betty &amp; Athul</Link>

          {/* Desktop links */}
          <ul className="nb-links">
  {visibleLinks.map((link, i) => (
    <React.Fragment key={link.href}>
      <li>
        <a
          href={link.href}
          className={`nb-link ${pathname === link.href ? "active" : ""}`}
        >
          {link.label}
        </a>
      </li>

      {i < visibleLinks.length - 1 && (
        <div className="nb-sep" />
      )}
    </React.Fragment>
  ))}
</ul>

          {/* RSVP CTA */}
          <a href="#rsvp" className="nb-rsvp" style={{display:"none"}}>RSVP</a>
          {/* shown via CSS on desktop only — re-expose below */}
          {!isAdminPage && (
  <a href="#rsvp" className="nb-rsvp">
    RSVP
  </a>
)}

          {/* Hamburger */}
          <button
            className={`nb-burger ${open ? "open" : ""}`}
            onClick={() => setOpen(p => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="nb-burger-bar" />
            <span className="nb-burger-bar" />
            <span className="nb-burger-bar" />
          </button>

        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`nb-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      {visibleLinks.map((link, i) => (
  <React.Fragment key={link.href}>
    <Link
      href={link.href}
      className={`nb-drawer-link ${pathname === link.href ? "active" : ""}`}
      onClick={() => setOpen(false)}
    >
      {link.label}
    </Link>

    {i < visibleLinks.length - 1 && (
      <div className="nb-drawer-sep" />
    )}
  </React.Fragment>
))}
       {!isAdminPage && (
  <Link
    href="#rsvp"
    className="nb-drawer-rsvp"
    onClick={() => setOpen(false)}
  >
    RSVP
  </Link>
)}
      </div>
    </>
  );
}