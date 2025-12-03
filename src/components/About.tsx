"use client";

import { motion } from "framer-motion";
import WorldMap from "./WorldMap";

const highlights = [
  { main: "Interlock Studios", sub: "Mark Cuban backed" },
  { main: "Auralis", sub: "1000s of users, 30+ countries" },
  { main: "Patent Pending", sub: "AI CAD automation" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">
            About
          </h2>
          
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              I build what I needed—and scale what others need.
            </p>
            
            <p className="text-base md:text-lg text-muted leading-relaxed mb-10">
              Most of my work starts with something personal: a missing tool, a problem I couldn&apos;t ignore. 
              I build it, use it, and if it works for me, I turn it into something others can rely on too.
            </p>

            {/* Highlights - simple horizontal list */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.main}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-foreground font-medium">{item.main}</span>
                  <span className="text-muted/60">{item.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* World Map Visualization */}
          <WorldMap />
        </motion.div>
      </div>
    </section>
  );
}
