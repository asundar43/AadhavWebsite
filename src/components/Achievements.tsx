"use client";

import { motion } from "framer-motion";
import { ScrollText, FlaskConical, BookOpen, Trophy, Medal, GraduationCap, Sparkles, ExternalLink } from "lucide-react";

const featuredAchievements = [
  {
    icon: FlaskConical,
    title: "Regeneron Science Talent Search Scholar",
    subtitle: "Top 300 / 2,000+ applicants nationwide",
    description: "Selected as a Scholar in America's oldest and most prestigious science research competition. Recognized for original research in computational biology and innovative problem-solving approach.",
    year: "2023",
    highlight: true,
  },
  {
    icon: ScrollText,
    title: "U.S. Patent Pending",
    subtitle: "System and Method for Generating an Appliance",
    description: "Filed a United States Patent for inventing a novel system that automates custom orthotic generation. Patent #18/914313.",
    year: "2024",
    highlight: true,
  },
];

const achievements = [
  {
    icon: BookOpen,
    title: "Published Researcher",
    subtitle: "Journal of Student Research",
    description: "Authored and published peer-reviewed research contributing to the academic discourse in my field of study.",
    year: "2023",
  },
  {
    icon: Trophy,
    title: "TiE Atlanta Finalist",
    subtitle: "Young Entrepreneurs Competition",
    description: "Pitched a startup concept to industry leaders and investors, advancing to the finals of Georgia's premier entrepreneurship competition.",
    year: "2023",
  },
  {
    icon: Medal,
    title: "International STEM Champions",
    subtitle: "Global Competition Recognition",
    description: "Led a team to victory in an international STEM competition, competing against hundreds of teams from around the world.",
    year: "2022",
  },
  {
    icon: GraduationCap,
    title: "Salutatorian",
    subtitle: "McIntosh High School",
    description: "Graduated with the second-highest academic standing in my class while balancing research, entrepreneurship, and extracurriculars.",
    year: "2023",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-sm font-mono text-accent mb-3 tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Recognition & Achievements
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Milestones along the way
          </h2>
        </motion.div>

        {/* Featured Achievements - Large Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass rounded-3xl p-8 h-full border border-accent/20 hover:border-accent/40 transition-all duration-300">
                {/* Year badge */}
                <div className="absolute top-6 right-6">
                  <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {achievement.year}
                  </span>
                </div>
                
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                    <achievement.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 pr-16">
                  {achievement.title}
                </h3>
                <p className="text-sm font-medium text-accent mb-4">
                  {achievement.subtitle}
                </p>
                <p className="text-muted leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Achievements - Compact Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.06] transition-all duration-300 border border-transparent hover:border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors duration-300">
                    <achievement.icon className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-muted">
                    {achievement.year}
                  </span>
                </div>
                
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-accent/80 mb-3">
                  {achievement.subtitle}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm text-muted mt-16 font-mono"
        >
          ...and always working on the next challenge
        </motion.p>
      </div>
    </section>
  );
}
