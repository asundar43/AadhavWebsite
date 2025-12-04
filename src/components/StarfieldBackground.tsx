"use client";

import { useEffect, useState, useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  colorType: number;
}

export function StarfieldBackground({ count = 100 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  // Generate stars once with useMemo (deterministic based on count)
  const stars = useMemo(() => {
    const generatedStars: Star[] = [];
    // Use seeded random for consistent stars
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      generatedStars.push({
        id: i,
        x: seededRandom(i * 1) * 100,
        y: seededRandom(i * 2) * 100,
        size: seededRandom(i * 3) * 3 + 1,
        opacity: seededRandom(i * 4) * 0.6 + 0.4,
        duration: seededRandom(i * 5) * 4 + 3,
        delay: seededRandom(i * 6) * 3,
        colorType: i % 3,
      });
    }
    return generatedStars;
  }, [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get color based on type
  const getStarColor = (colorType: number) => {
    switch (colorType) {
      case 0: return { bg: "rgba(20, 184, 166, 1)", shadow: "0 0 6px rgba(20, 184, 166, 0.8)" };
      case 1: return { bg: "rgba(6, 182, 212, 1)", shadow: "0 0 6px rgba(6, 182, 212, 0.8)" };
      default: return { bg: "rgba(255, 255, 255, 0.9)", shadow: "0 0 4px rgba(255, 255, 255, 0.5)" };
    }
  };

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay - static */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.08) 0%, transparent 50%)",
        }}
      />
      
      {/* Stars using CSS animations */}
      {stars.map((star) => {
        const colors = getStarColor(star.colorType);
        return (
          <div
            key={star.id}
            className="absolute rounded-full star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              background: colors.bg,
              boxShadow: colors.shadow,
              // CSS custom properties for animation
              '--star-opacity': star.opacity,
              '--star-duration': `${star.duration}s`,
              '--star-delay': `${star.delay}s`,
              willChange: 'opacity, transform',
            } as React.CSSProperties}
          />
        );
      })}

      {/* Floating orbs - using CSS animations instead of Framer Motion */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full orb-float-1"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
          left: "5%",
          top: "10%",
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full orb-float-2"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)",
          filter: "blur(70px)",
          right: "10%",
          bottom: "20%",
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full orb-float-3"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          left: "50%",
          top: "60%",
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
