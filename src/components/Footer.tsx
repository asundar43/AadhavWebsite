"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Twitter } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/1Aadhav",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aadhavsundar",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/asundar43",
    icon: Github,
  },
  {
    name: "Email",
    url: "mailto:aadhav@auralis.one",
    icon: Mail,
  },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Recognition", href: "#achievements" },
];

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

function FooterStars({ count = 40 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  const stars = useMemo(() => {
    const generatedStars: Star[] = [];
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      generatedStars.push({
        id: i,
        x: seededRandom(i * 1 + 500) * 100,
        y: seededRandom(i * 2 + 500) * 100,
        size: seededRandom(i * 3 + 500) * 2 + 1,
        opacity: seededRandom(i * 4 + 500) * 0.4 + 0.6, // Higher base opacity (0.6-1.0)
        duration: seededRandom(i * 5 + 500) * 3 + 2, // 2-5s duration
        delay: seededRandom(i * 6 + 500) * 2, // Shorter delay (0-2s)
        colorType: i % 3,
      });
    }
    return generatedStars;
  }, [count]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStarColor = (colorType: number) => {
    switch (colorType) {
      case 0: return { bg: "rgba(20, 184, 166, 1)", shadow: "0 0 6px rgba(20, 184, 166, 0.8)" };
      case 1: return { bg: "rgba(6, 182, 212, 1)", shadow: "0 0 6px rgba(6, 182, 212, 0.8)" };
      default: return { bg: "rgba(255, 255, 255, 1)", shadow: "0 0 4px rgba(255, 255, 255, 0.6)" };
    }
  };

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blurred galaxy glow orbs */}
      <div
        className="absolute rounded-full orb-float-1"
        style={{
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.25) 35%, transparent 65%)",
          filter: "blur(80px)",
          left: "-20%",
          top: "-20%",
        }}
      />
      <div
        className="absolute rounded-full orb-float-2"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, rgba(79, 70, 229, 0.2) 35%, transparent 65%)",
          filter: "blur(75px)",
          right: "-10%",
          top: "10%",
        }}
      />
      <div
        className="absolute rounded-full orb-float-3"
        style={{
          width: "380px",
          height: "380px",
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(126, 34, 206, 0.18) 35%, transparent 65%)",
          filter: "blur(70px)",
          left: "15%",
          bottom: "-25%",
        }}
      />
      <div
        className="absolute rounded-full orb-float-1"
        style={{
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(8, 145, 178, 0.15) 40%, transparent 65%)",
          filter: "blur(65px)",
          right: "20%",
          top: "-15%",
        }}
      />
      <div
        className="absolute rounded-full orb-float-2"
        style={{
          width: "360px",
          height: "360px",
          background: "radial-gradient(circle, rgba(30, 64, 175, 0.5) 0%, rgba(29, 78, 216, 0.18) 35%, transparent 65%)",
          filter: "blur(70px)",
          left: "45%",
          bottom: "-10%",
        }}
      />
      
      {/* Stars */}
      {stars.map((star) => {
        const colors = getStarColor(star.colorType);
        return (
          <div
            key={star.id}
            className="absolute rounded-full footer-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              background: colors.bg,
              boxShadow: colors.shadow,
              '--star-opacity': star.opacity,
              '--star-duration': `${star.duration}s`,
              '--star-delay': `${star.delay}s`,
              animationFillMode: 'both',
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-foreground/5 overflow-hidden">
      {/* Stars background */}
      <FooterStars count={80} />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              Aadhav Sundar
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Building things I wish existed.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted hover:text-accent transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Aadhav Sundar
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
