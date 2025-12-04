"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useState, createContext, useContext } from "react";

// Mouse context to share mouse position across components
const MouseContext = createContext<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
} | null>(null);

function useMousePosition() {
  const context = useContext(MouseContext);
  if (!context) throw new Error("useMousePosition must be used within MouseProvider");
  return context;
}

function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const { mouseX, mouseY } = useMousePosition();
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);
  
  // Offset to center the glow on cursor
  const glowX = useTransform(cursorXSpring, (v) => v - 200);
  const glowY = useTransform(cursorYSpring, (v) => v - 200);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        top: 0,
        left: 0,
        x: glowX,
        y: glowY,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(6, 182, 212, 0.08) 30%, transparent 70%)",
        filter: "blur(40px)",
        borderRadius: "50%",
      }}
    />
  );
}

// Animated aurora/gradient blobs with mouse parallax
function AuroraBackground() {
  const { mouseX, mouseY } = useMousePosition();
  
  // Create smooth spring animations for mouse movement
  const springConfig = { damping: 40, stiffness: 90 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  // Different parallax intensities for each orb (creates depth)
  // Values are relative to center of screen, normalized
  const orb1X = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-80, 80]);
  const orb1Y = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-60, 60]);
  
  const orb2X = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [60, -60]);
  const orb2Y = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [40, -40]);
  
  const orb3X = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-40, 40]);
  const orb3Y = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [50, -50]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Large animated gradient orbs - with mouse parallax */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          left: "-25%",
          top: "-20%",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [1, 1.3, 0.85, 1.15, 1],
          opacity: [0.8, 1, 0.7, 0.9, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)",
          filter: "blur(70px)",
          right: "-15%",
          top: "10%",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [1, 0.75, 1.2, 0.9, 1],
          opacity: [0.7, 0.9, 0.6, 1, 0.7],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
          filter: "blur(75px)",
          left: "20%",
          bottom: "-15%",
          x: orb3X,
          y: orb3Y,
        }}
        animate={{
          scale: [1, 1.4, 0.7, 1.1, 1],
          opacity: [0.6, 0.8, 1, 0.7, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Animated lines radiating from center with mouse interaction
function RadialLines() {
  const lines = Array.from({ length: 16 }, (_, i) => i);
  const { mouseX, mouseY } = useMousePosition();
  
  // Smooth spring for rotation based on mouse
  const springConfig = { damping: 50, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  // Subtle rotation offset based on mouse position
  const rotationOffset = useTransform(
    mouseXSpring,
    [0, typeof window !== 'undefined' ? window.innerWidth : 1920],
    [-8, 8]
  );
  
  // Parallax for the rings
  const ringX = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]);
  const ringY = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-15, 15]);
  
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ rotate: rotationOffset }}
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
      {/* Slow rotating glow ring with mouse parallax */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border border-teal-500/10"
        style={{ x: ringX, y: ringY }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
        style={{ 
          x: useTransform(ringX, v => v * -0.7), 
          y: useTransform(ringY, v => v * -0.7) 
        }}
        animate={{ 
          rotate: -360,
          scale: [1, 0.95, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 960);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 540);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Initialize to center on mount
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
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
            initial={{ opacity: 0, y: 30 }}
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
    </MouseContext.Provider>
  );
}
