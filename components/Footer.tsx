"use client";

import React from "react";
import { ArrowUp, Terminal, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-16 border-t border-white/[0.08] bg-[#030408] font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Colophon Line */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.05]">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-sm bg-carbon-800 border border-white/10 flex items-center justify-center font-bold text-cyan-neon text-xs">
              NM
            </div>
            <div>
              <span className="text-white font-display font-bold block text-sm">
                NAVEEN MUTHUKUMAR
              </span>
              <span className="text-zinc-500 text-[11px]">
                Full-Stack Developer & Systems Architect // Chennai, India
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>STATIC ARCHITECTURE 100% SECURE</span>
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-cyan-neon/40 text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Scroll back to top of the page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-neon" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[11px] text-zinc-500">
          <div>
            <span className="text-zinc-400 block mb-2 font-semibold">CORE ARCHITECTURE</span>
            <p className="leading-relaxed">
              Engineered with Next.js App Router, TypeScript, Three.js WebGL, and GSAP ScrollTrigger.
            </p>
          </div>

          <div>
            <span className="text-zinc-400 block mb-2 font-semibold">HOSTING INFRASTRUCTURE</span>
            <p className="leading-relaxed">
              Static export build compiled to HTML/CSS/JS and deployed through automated GitHub Actions.
            </p>
          </div>

          <div>
            <span className="text-zinc-400 block mb-2 font-semibold">COORDINATES & TIME</span>
            <p className="leading-relaxed">
              {PORTFOLIO_DATA.personal.coordinates}
              <br />
              Timezone: IST (UTC+05:30)
            </p>
          </div>

          <div>
            <span className="text-zinc-400 block mb-2 font-semibold">LEGAL & REPO</span>
            <p className="leading-relaxed">
              © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All verified projects and rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
