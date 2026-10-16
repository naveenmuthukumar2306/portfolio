"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Download, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { getAssetPath } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "01. Identity", href: "#about" },
  { label: "02. Skills", href: "#skills" },
  { label: "03. Projects", href: "#projects" },
  { label: "04. Architecture", href: "#casestudy" },
  { label: "05. Timeline", href: "#experience" },
  { label: "06. Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // ScrollSpy
      const sections = ["about", "skills", "projects", "casestudy", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05070e]/90 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-2xl shadow-black/50"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#home"
          className="group flex items-center space-x-3 text-left focus-visible:ring-1 focus-visible:ring-cyan-neon"
          aria-label="Naveen Muthukumar Portfolio - Return to top"
        >
          <div className="w-8 h-8 rounded-sm bg-carbon-800 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-cyan-neon group-hover:border-cyan-neon/50 transition-colors">
            NM
          </div>
          <div>
            <div className="font-display font-bold tracking-tight text-white text-sm sm:text-base group-hover:text-cyan-neon transition-colors">
              NAVEEN MUTHUKUMAR
            </div>
            <div className="font-mono text-[10px] text-zinc-400 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>13°N 80°E // CHENNAI</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-carbon-900/60 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href={getAssetPath(PORTFOLIO_DATA.personal.resumePdf)}
            download={PORTFOLIO_DATA.personal.resumePdf}
            className="flex items-center space-x-1.5 font-mono text-xs bg-carbon-800 hover:bg-carbon-700 text-zinc-300 hover:text-white px-3.5 py-2 rounded-sm border border-white/10 hover:border-cyan-neon/40 transition-all duration-200"
            aria-label="Download Naveen Muthukumar Resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-cyan-neon" />
            <span>Resume.pdf</span>
          </a>

          <a
            href="#contact"
            className="flex items-center space-x-1 font-mono text-xs bg-cyan-neon hover:bg-cyan-300 text-carbon-950 font-semibold px-4 py-2 rounded-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <span>Let&apos;s Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-sm bg-carbon-850 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-neon/40 focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-neon" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-[#05070e]/95 backdrop-blur-2xl z-40 md:hidden flex flex-col justify-between p-6 border-t border-white/10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-4 pt-4">
            <div className="font-mono text-[11px] text-cyan-neon uppercase tracking-widest border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Navigation Directory</span>
              <span>06 Sections</span>
            </div>
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 rounded-md font-display text-lg text-zinc-200 hover:text-cyan-neon hover:bg-white/5 border-b border-white/5 transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-zinc-500">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-3 pb-8">
            <a
              href={getAssetPath(PORTFOLIO_DATA.personal.resumePdf)}
              download={PORTFOLIO_DATA.personal.resumePdf}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-carbon-800 text-zinc-200 rounded-sm border border-white/10 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download className="w-4 h-4 text-cyan-neon" />
              <span>Download Resume PDF</span>
            </a>
            <a
              href="#contact"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-cyan-neon text-carbon-950 font-bold rounded-sm font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
