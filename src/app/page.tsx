import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

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
