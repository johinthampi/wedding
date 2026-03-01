"use client";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  useScrollReveal — core hook
//  Returns a ref to attach to any element + whether it's visible
// ─────────────────────────────────────────────────────────────────────────────
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, stop observing
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ─────────────────────────────────────────────────────────────────────────────
//  Reveal — wrap ANY element/section with a scroll animation
//
//  Props:
//    animation  — "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight"
//                 | "fadeIn" | "scaleUp" | "flipUp" | "slideUp"
//    delay      — CSS delay string e.g. "0.2s" (default "0s")
//    duration   — CSS duration string e.g. "0.8s" (default "0.75s")
//    threshold  — IntersectionObserver threshold (default 0.15)
//    className  — extra classes to forward
//    style      — extra inline styles
//    children
// ─────────────────────────────────────────────────────────────────────────────
export function Reveal({
  animation  = "fadeUp",
  delay      = "0s",
  duration   = "0.75s",
  threshold  = 0.15,
  className  = "",
  style      = {},
  children,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const HIDDEN = {
    fadeUp    : "opacity:0; transform:translateY(48px)",
    fadeDown  : "opacity:0; transform:translateY(-48px)",
    fadeLeft  : "opacity:0; transform:translateX(-56px)",
    fadeRight : "opacity:0; transform:translateX(56px)",
    fadeIn    : "opacity:0",
    scaleUp   : "opacity:0; transform:scale(0.88)",
    flipUp    : "opacity:0; transform:perspective(600px) rotateX(18deg) translateY(30px)",
    slideUp   : "opacity:0; transform:translateY(80px)",
  };

  const VISIBLE = {
    fadeUp    : "opacity:1; transform:translateY(0)",
    fadeDown  : "opacity:1; transform:translateY(0)",
    fadeLeft  : "opacity:1; transform:translateX(0)",
    fadeRight : "opacity:1; transform:translateX(0)",
    fadeIn    : "opacity:1",
    scaleUp   : "opacity:1; transform:scale(1)",
    flipUp    : "opacity:1; transform:perspective(600px) rotateX(0deg) translateY(0)",
    slideUp   : "opacity:1; transform:translateY(0)",
  };

  const EASING = {
    fadeUp    : "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeDown  : "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeLeft  : "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeRight : "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeIn    : "ease",
    scaleUp   : "cubic-bezier(0.34, 1.56, 0.64, 1)",
    flipUp    : "cubic-bezier(0.22, 1, 0.36, 1)",
    slideUp   : "cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const hiddenStyles  = Object.fromEntries(HIDDEN[animation].split(";").map(s => { const [k,...v]=s.trim().split(":"); return [k.trim(), v.join(":").trim()]; }).filter(([k])=>k));
  const visibleStyles = Object.fromEntries(VISIBLE[animation].split(";").map(s => { const [k,...v]=s.trim().split(":"); return [k.trim(), v.join(":").trim()]; }).filter(([k])=>k));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(isVisible ? visibleStyles : hiddenStyles),
        transition: `opacity ${duration} ${delay} ${EASING[animation]}, transform ${duration} ${delay} ${EASING[animation]}`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  RevealGroup — stagger children automatically
//
//  Props:
//    animation    — same options as Reveal
//    staggerDelay — seconds between each child (default 0.12)
//    baseDelay    — starting delay in seconds (default 0)
//    duration     — CSS duration string
//    threshold
//    className / style  — applied to the wrapper div
//    children
// ─────────────────────────────────────────────────────────────────────────────
export function RevealGroup({
  animation    = "fadeUp",
  staggerDelay = 0.12,
  baseDelay    = 0,
  duration     = "0.7s",
  threshold    = 0.12,
  className    = "",
  style        = {},
  children,
}) {
  const childArray = Array.isArray(children) ? children.flat() : [children];

  return (
    <div className={className} style={style}>
      {childArray.map((child, i) => (
        <Reveal
          key={i}
          animation={animation}
          delay={`${baseDelay + i * staggerDelay}s`}
          duration={duration}
          threshold={threshold}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  GoldLine — animated horizontal gold divider that draws itself in on scroll
// ─────────────────────────────────────────────────────────────────────────────
export function GoldLine({ delay = "0s", className = "" }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height         : "1px",
        background     : "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        transformOrigin: "left center",
        transform      : isVisible ? "scaleX(1)" : "scaleX(0)",
        opacity        : isVisible ? 1 : 0,
        transition     : `transform 1s ${delay} cubic-bezier(0.22,1,0.36,1), opacity 0.4s ${delay} ease`,
        willChange     : "transform, opacity",
      }}
    />
  );
}