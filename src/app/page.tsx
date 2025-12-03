import {
  Navigation,
  Hero,
  About,
  Experience,
  Projects,
  Achievements,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative animated-gradient">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
