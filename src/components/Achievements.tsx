"use client";

import { motion } from "framer-motion";
import { ScrollText, FlaskConical, BookOpen, Sparkles, ExternalLink, Plane, Rocket, Award, Lightbulb } from "lucide-react";

const featuredAchievements = [
  {
    icon: Lightbulb,
    title: "Georgia Tech InVenture Prize Finalist",
    subtitle: "Emmy Award-winning innovation competition",
    description: "Competed in Georgia Tech's premier student innovation competition, broadcast live on PBS. The InVenture Prize showcases groundbreaking inventions and entrepreneurship from Georgia Tech students.",
    year: "2025",
    highlight: true,
    link: "https://www.gpb.org/events/education/2025/03/12/2025-georgia-tech-inventure-prize#t=1h1m20s",
  },
  {
    icon: FlaskConical,
    title: "Regeneron Science Talent Search Scholar",
    subtitle: "America's most prestigious science competition",
    description: "Selected among America's top teen scientists in the nation's oldest and most prestigious high school science competition (formerly Intel STS, Westinghouse STS). Recognized for original materials science research.",
    year: "2023",
    highlight: true,
    link: "https://www.societyforscience.org/regeneron-sts/2023-scholars/#:~:text=Aadhav%20Sundar%2C%20Age:%2017",
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
    icon: Plane,
    title: "International UAS4STEM Champions",
    subtitle: "Skydio · AMA · EAA AirVenture",
    description: "Led McIntosh Aeronautics (sponsored by Airbus) to 1st place at the world's largest aviation event in a search-and-rescue autonomous drone competition.",
    year: "2022",
    link: "https://www.gpb.org/blogs/education-matters/2022/08/15/mcintosh-high-school-wins-first-place-at-national-drone",
  },
  {
    icon: Award,
    title: "Yale Science & Engineering Award",
    subtitle: "Georgia Science & Engineering Fair",
    description: "Most Outstanding STEM Exhibit at the 75th Georgia Science Fair. Also received Best in Category (Materials Science) and 1st Honors.",
    year: "2023",
    link: "https://ysea.org/community-engagement/science-fair-award-isef/",
  },
  {
    icon: Rocket,
    title: "2nd Place Startup Exchange",
    subtitle: "Southeast Pitch Competition",
    description: "Selected as the 2nd best startup pitch throughout the Southeast at Startup Exchange Summit.",
    year: "2024",
  },
  {
    icon: BookOpen,
    title: "Published Researcher",
    subtitle: "Journal of Student Research",
    description: "Authored peer-reviewed research in materials science as a high school student.",
    year: "2022",
    link: "https://doi.org/10.47611/jsrhs.v11i3.2797",
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
                {achievement.link && (
                  <a 
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm text-accent hover:text-accent-secondary transition-colors duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View more
                  </a>
                )}
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
                {achievement.link && (
                  <a 
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-accent/70 hover:text-accent transition-colors duration-200"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View more
                  </a>
                )}
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
