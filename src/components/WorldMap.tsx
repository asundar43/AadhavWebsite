"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with the map
const WorldMapChart = dynamic(
  () => import("react-svg-worldmap").then((mod) => mod.default),
  { ssr: false }
);

// Country data - normalized values for better visibility
// Using sqrt scale so low-user countries still show up bright
const countryData = [
  { country: "us", value: 100 },
  { country: "pl", value: 90 },
  { country: "in", value: 50 },
  { country: "ca", value: 45 },
  { country: "de", value: 45 },
  { country: "it", value: 45 },
  { country: "gb", value: 40 },
  { country: "au", value: 35 },
  { country: "is", value: 30 },
  { country: "es", value: 30 },
  { country: "gr", value: 28 },
  { country: "nl", value: 28 },
  { country: "no", value: 28 },
  { country: "pk", value: 28 },
  { country: "br", value: 25 },
  { country: "cl", value: 25 },
  { country: "eg", value: 25 },
  { country: "id", value: 25 },
  { country: "mx", value: 25 },
  { country: "ma", value: 25 },
  { country: "ro", value: 25 },
  { country: "ru", value: 25 },
  { country: "za", value: 25 },
  { country: "ch", value: 25 },
  { country: "ae", value: 25 },
  { country: "at", value: 20 },
  { country: "be", value: 20 },
  { country: "bg", value: 20 },
  { country: "co", value: 20 },
  { country: "dk", value: 20 },
  { country: "ie", value: 20 },
  { country: "jo", value: 20 },
  { country: "kw", value: 20 },
  { country: "ly", value: 20 },
  { country: "lt", value: 20 },
  { country: "lu", value: 20 },
  { country: "mt", value: 20 },
  { country: "mr", value: 20 },
  { country: "nz", value: 20 },
  { country: "ng", value: 20 },
  { country: "py", value: 20 },
  { country: "ph", value: 20 },
  { country: "pt", value: 20 },
  { country: "qa", value: 20 },
  { country: "sa", value: 20 },
  { country: "tr", value: 20 },
  { country: "ug", value: 20 },
  { country: "hu", value: 20 },
  { country: "iq", value: 20 },
  { country: "th", value: 20 },
];

export default function WorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass rounded-2xl p-6 md:p-8 mt-8 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h3 className="font-mono text-xs text-muted uppercase tracking-wider">
            Global Reach — Auralis
          </h3>
        </div>
        <p className="text-xs text-muted">
          Thousands of users across <span className="text-accent">50+ countries</span>
        </p>
      </div>

      {/* Full-width World Map */}
      <div className="relative w-full flex justify-center">
        <WorldMapChart
          color="#5eead4"
          size="responsive"
          data={countryData}
          backgroundColor="transparent"
          borderColor="#0a0a0a"
          strokeOpacity={1}
          frame={false}
          tooltipTextFunction={() => ""}
        />
      </div>
    </motion.div>
  );
}
