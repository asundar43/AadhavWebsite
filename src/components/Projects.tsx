"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "BranchGPT",
    description: "Branch your AI conversations. Explore different responses without starting over.",
    url: "https://branchgpt.org",
    tags: ["LLM", "AI", "SaaS"],
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "Auralis",
    description: "Technology company hub. Building products that solve real problems.",
    url: "https://auralis.one",
    tags: ["Platform", "Tech"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Aetheris",
    description: "DAO transparency tool. Built for Eigen Games @ ETHDenver 2025.",
    url: "https://github.com/asundar43/Aetheris-GovAI",
    tags: ["Blockchain", "Ethereum"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Orthostride",
    description: "AI-powered custom orthotics. Patent pending.",
    url: "#",
    tags: ["HealthTech", "AI", "CAD"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono text-accent mb-12 tracking-wider uppercase"
        >
          Projects
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Arrow icon */}
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-foreground/50" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-foreground/5 text-muted/80 border border-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
