"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Partner & Head of Engineering",
    company: "Interlock Studios",
    period: "July 2025 – Present",
    description: "Building the future of media. Backed by Mark Cuban and Atlanta Ventures.",
    tags: ["Media", "Engineering"],
  },
  {
    title: "Founder",
    company: "Auralis Technologies",
    period: "Apr 2025 – Present",
    description: "1000s of users in 30+ countries across the world.",
    tags: ["AI", "SaaS"],
  },
  {
    title: "Founder & CEO",
    company: "Stride Labs",
    period: "May 2023 – Apr 2025",
    description: "Built Orthostride—AI that automates custom orthotic design. Partnered with PE-backed industry leaders, trained on thousands of real medical scans. 100x faster output. Patent pending.",
    tags: ["HealthTech", "AI/ML", "Patent"],
  },
  {
    title: "Builder",
    company: "buildspace",
    period: "Jun 2024 – Jul 2024",
    description: "nights & weekends s5. Backed by YC and a16z.",
    tags: ["Community"],
  },
  {
    title: "Fellow",
    company: "Startup Exchange",
    period: "Feb 2024 – Apr 2024",
    description: "Met with GT Alumni Entrepreneurs—YC Founders, Thiel Fellows.",
    tags: ["Fellowship"],
  },
  {
    title: "Founder/CEO",
    company: "HOVER Aerial Cinematography",
    period: "May 2023 – Aug 2023",
    description: "International award-winning UAS (Drone) Engineer and Pilot.",
    tags: ["Drones", "Media"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono text-accent mb-12 tracking-wider uppercase"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-4 top-2 -translate-x-1/2">
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(20,184,166,0.5)]" />
                </div>

                <div className="glass glass-hover rounded-2xl p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-accent text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-muted mt-1 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-muted text-sm mb-3">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-foreground/5 text-muted border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
