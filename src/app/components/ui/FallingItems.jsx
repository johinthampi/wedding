"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FallingItems({
  leafCount = 15,
  flowerCount = 10,
  minSize = 30,
  maxSize = 70,
  minDuration = 8,
  maxDuration = 18,
  // New props for golden particles
  enableGoldenParticles = true,
  particleCount = 90,
}) {
  // Canvas ref for golden particles
  const canvasRef = useRef(null);
  // State for SVG items
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    checkMobile(); // run once
    window.addEventListener("resize", checkMobile);
  
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ─── Falling golden petals + sparkles + leaves (Canvas version) ─────────────
  useEffect(() => {
    if (!enableGoldenParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const GOLD_PALETTE = [
      [201, 168, 76],   // gold
      [240, 212, 120],  // light gold
      [245, 230, 184],  // champagne
      [139, 105, 20],   // dark gold
      [255, 245, 200],  // cream
      [218, 180, 80],   // mid gold
    ];

    class Particle {
      constructor(scatter = false) {
        this.init(scatter);
      }

      init(scatter = false) {
        this.x = Math.random() * W;
        this.y = scatter ? Math.random() * H : -30;
        this.originX = this.x;

        // Speed varies by type
        this.speedY = Math.random() * 1.0 + 0.3;
        this.swayAmp = Math.random() * 35 + 12;
        this.swayFreq = Math.random() * 0.018 + 0.006;
        this.t = Math.random() * Math.PI * 2; // phase

        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.055;
        this.alpha = Math.random() * 0.55 + 0.25;

        const c = GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)];
        this.r = c[0]; this.g = c[1]; this.b = c[2];

        const roll = Math.random();
        if (roll < 0.45) this.type = 'petal';
        else if (roll < 0.72) this.type = 'sparkle';
        else if (roll < 0.88) this.type = 'leaf';
        else this.type = 'circle';

        this.size = this.type === 'circle'
          ? Math.random() * 2.5 + 1
          : Math.random() * 7 + 3;
      }

      update() {
        this.t += this.swayFreq;
        this.x = this.originX + Math.sin(this.t) * this.swayAmp;
        this.y += this.speedY;
        this.angle += this.spin;
        if (this.y > H + 30) this.init(false);
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.alpha;

        const col = `rgba(${this.r},${this.g},${this.b},`;

        if (this.type === 'petal') this.drawPetal(col);
        if (this.type === 'sparkle') this.drawSparkle(col);
        if (this.type === 'leaf') this.drawLeaf(col);
        if (this.type === 'circle') this.drawCircle(col);

        ctx.restore();
      }

      drawPetal(col) {
        const s = this.size;
        ctx.fillStyle = `${col}${this.alpha})`;
        ctx.strokeStyle = `rgba(255,245,200,${this.alpha * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.55, s * 1.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // centre vein
        ctx.strokeStyle = `rgba(255,255,220,${this.alpha * 0.3})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.2);
        ctx.lineTo(0, s * 1.2);
        ctx.stroke();
      }

      drawSparkle(col) {
        const s = this.size * 0.85;
        ctx.fillStyle = `${col}${this.alpha})`;
        // 4-pointed star
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? s : s * 0.35;
          const a = (i / 8) * Math.PI * 2;
          i === 0
            ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
            : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        // soft glow halo
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2);
        grd.addColorStop(0, `rgba(255,245,180,${this.alpha * 0.55})`);
        grd.addColorStop(1, 'rgba(255,245,180,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, s * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      drawLeaf(col) {
        const s = this.size * 1.15;
        ctx.fillStyle = `${col}${this.alpha * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.85, -s * 0.15, s * 0.85, s * 0.55, 0, s * 0.75);
        ctx.bezierCurveTo(-s * 0.85, s * 0.55, -s * 0.85, -s * 0.15, 0, -s);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,200,${this.alpha * 0.35})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.85);
        ctx.lineTo(0, s * 0.65);
        ctx.stroke();
      }

      drawCircle(col) {
        ctx.fillStyle = `${col}${this.alpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Scatter some particles at start so screen isn't empty
    const COUNT = isMobile
  ? Math.min(Math.floor(W / 20), 25)
  : Math.min(Math.floor(W / 11), particleCount);
    const particles = Array.from({ length: COUNT }, () => new Particle(true));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [enableGoldenParticles, particleCount]);

  // ─── SVG Items (leaves and flowers) ─────────────────────────────
  useEffect(() => {
    const generateItems = (count, type) =>
      Array.from({ length: count }).map((_, i) => ({
        id: `${type}-${i}-${Date.now()}`,
        type,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: minDuration + Math.random() * (maxDuration - minDuration),
        size: minSize + Math.random() * (maxSize - minSize),
        opacity: 0.6 + Math.random() * 0.4,
      }));

      const leaves = generateItems(isMobile ? 4 : leafCount, "leaf");
      const flowers = generateItems(isMobile ? 2 : flowerCount, "flower");

    setItems([...leaves, ...flowers]);
  }, [leafCount, flowerCount, minSize, maxSize, minDuration, maxDuration]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Canvas for golden particles */}
      {enableGoldenParticles && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
      )}

      {/* SVG items (leaves and flowers) */}
      {items.map((item) => (
        <img
          key={item.id}
          src={item.type === "leaf" ? "/leaf.svg" : "/rose.svg"}
          alt={item.type}
          className="floating-item"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            width: `${item.size}px`,
            opacity: item.opacity,
            position: "absolute",
            top: "-120px",
          }}
        />
      ))}

      <style jsx>{`
        .floating-item {
          position: absolute;
          pointer-events: none;
          will-change: transform;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}