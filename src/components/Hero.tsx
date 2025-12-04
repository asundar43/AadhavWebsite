"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

// Animated aurora/gradient blobs - using CSS animations with mouse parallax via CSS variables
function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Store normalized mouse position (0-1)
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    // Throttled update using RAF
    const updateParallax = () => {
      if (containerRef.current) {
        const { x, y } = mouseRef.current;
        // Convert to parallax offset (-1 to 1 range, centered)
        const offsetX = (x - 0.5) * 2;
        const offsetY = (y - 0.5) * 2;
        
        containerRef.current.style.setProperty('--mouse-x', `${offsetX * 80}px`);
        containerRef.current.style.setProperty('--mouse-y', `${offsetY * 60}px`);
        containerRef.current.style.setProperty('--mouse-x-inv', `${offsetX * -60}px`);
        containerRef.current.style.setProperty('--mouse-y-inv', `${offsetY * -40}px`);
        containerRef.current.style.setProperty('--mouse-x-small', `${offsetX * 40}px`);
        containerRef.current.style.setProperty('--mouse-y-small', `${offsetY * 50}px`);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}>
      {/* Large animated gradient orbs - with CSS animations and mouse parallax */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full aurora-orb-1"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          left: "-25%",
          top: "-20%",
          transform: "translate(var(--mouse-x, 0), var(--mouse-y, 0))",
          willChange: "transform, opacity",
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full aurora-orb-2"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)",
          filter: "blur(70px)",
          right: "-15%",
          top: "10%",
          transform: "translate(var(--mouse-x-inv, 0), var(--mouse-y-inv, 0))",
          willChange: "transform, opacity",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full aurora-orb-3"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
          filter: "blur(75px)",
          left: "20%",
          bottom: "-15%",
          transform: "translate(var(--mouse-x-small, 0), var(--mouse-y-small, 0))",
          willChange: "transform, opacity",
        }}
      />
      
      {/* Noise texture overlay - static */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Cursor glow effect - optimized with RAF throttling
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize to center
    positionRef.current = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    // Direct cursor tracking - no lag
    const animate = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${positionRef.current.x - 200}px, ${positionRef.current.y - 200}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0"
      style={{
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.08) 30%, transparent 70%)",
        filter: "blur(40px)",
        borderRadius: "50%",
        willChange: "transform",
      }}
    />
  );
}

// Animated lines radiating from center - optimized with CSS
function RadialLines() {
  const lines = Array.from({ length: 16 }, (_, i) => i);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseXRef = useRef(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX / window.innerWidth;
    };

    const updateRotation = () => {
      if (containerRef.current) {
        // Subtle rotation based on mouse X position
        const rotation = (mouseXRef.current - 0.5) * 16; // -8 to 8 degrees
        containerRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      rafRef.current = requestAnimationFrame(updateRotation);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateRotation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {lines.map((i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"
          style={{
            width: "200%",
            transformOrigin: "center",
            rotate: `${i * 11.25}deg`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: [0, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.06,
            ease: "easeOut",
            opacity: {
              duration: 3,
              delay: i * 0.06,
              times: [0, 0.3, 1],
            }
          }}
        />
      ))}
      {/* Slow rotating glow ring - using CSS animation */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full border border-teal-500/10 rotate-ring"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10 rotate-ring-reverse"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const scrollToContent = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      {/* Aurora gradient background */}
      {mounted && <AuroraBackground />}
      
      {/* Radial lines */}
      {mounted && <RadialLines />}
      
      {/* Cursor glow effect */}
      {mounted && <CursorGlow />}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Radial gradient vignette - lighter to show background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(3, 3, 3, 0.6) 100%)",
        }}
      />
      
      {/* Bottom vignette - darker near scroll button */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 15%, transparent 35%)",
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Location indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <MapPin className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
          <span className="text-xs tracking-[0.2em] uppercase text-white/70 font-light">
            Atlanta
          </span>
          <span className="w-4 h-[1px] bg-white/30" />
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400 font-light">
            Georgia Tech
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 text-white"
        >
          Aadhav Sundar
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-muted font-light"
        >
          Building things I wish existed
        </motion.p>
      </div>

      {/* Scroll prompt */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-20"
      >
        <span className="text-sm text-muted/70 tracking-widest uppercase group-hover:text-accent transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-2 rounded-full border border-muted/30 group-hover:border-accent/50 transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-muted/50 group-hover:text-accent transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
