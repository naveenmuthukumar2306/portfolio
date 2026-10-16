import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CaseStudy from "@/components/CaseStudy";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-cyan-neon/30 selection:text-white">
      {/* Sticky Editorial Navigation */}
      <Navbar />

      {/* Semantic Main Landmark */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudy />
        <Experience />
        <Contact />
      </main>

      {/* Editorial Colophon Footer */}
      <Footer />
    </div>
  );
}
