"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Layers, Cpu, Database, Cloud, Sparkles, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    level: string;
    highlight: string;
    description: string;
    category: string;
  }>({
    name: "FastAPI",
    level: "Advanced",
    highlight: "Async Microservices / OpenAPI",
    description: "Engineering asynchronous Python endpoints, dependency injection, and Pydantic validation for high-throughput enterprise systems.",
    category: "Backend & Distributed Systems",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate cards whenever selectedCategory changes or on initial render
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [selectedCategory]);

  const categories = PORTFOLIO_DATA.skills;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#05070e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>02 // Architecture & Technical Matrix</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Verified Technical Stack
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-sm">
            Interactive specimen inspector: Select any node below to inspect its role in production systems.
          </p>
        </div>

        {/* Live Specimen Inspector HUD (Inspired by Kern Society font specimen tester) */}
        <div className="mb-12 p-6 rounded-sm bg-carbon-850/90 border border-cyan-neon/30 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-neon/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-[11px]">
            <div className="flex items-center space-x-2 text-cyan-neon font-bold tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>SPECIMEN INSPECTOR // NODE: {activeSkill.name.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400">
              <span className="px-2 py-0.5 rounded-xs bg-white/5 border border-white/10">
                LEVEL: {activeSkill.level}
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" /> PROVEN IN PRODUCTION
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
            <div className="md:col-span-5 space-y-2">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                Category // {activeSkill.category}
              </span>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeSkill.name}
              </div>
              <div className="inline-block px-2.5 py-1 rounded-sm bg-cyan-neon/10 border border-cyan-neon/30 font-mono text-xs text-cyan-neon font-semibold">
                {activeSkill.highlight}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3 md:border-l md:border-white/10 md:pl-6">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                Production Implementation Role
              </span>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
                {activeSkill.description}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/[0.08]" role="tablist">
          {categories.map((cat, idx) => (
            <button
              key={cat.title}
              role="tab"
              aria-selected={selectedCategory === idx}
              onClick={() => {
                setSelectedCategory(idx);
                if (cat.skills.length > 0) {
                  setActiveSkill({
                    ...cat.skills[0],
                    category: cat.title,
                  });
                }
              }}
              className={`font-mono text-xs px-4 py-2 rounded-sm transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === idx
                  ? "bg-cyan-neon text-carbon-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  : "bg-carbon-850 hover:bg-carbon-800 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <span>{`[0${idx + 1}]`}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid for Selected Category */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categories[selectedCategory].skills.map((skill) => {
            const isCurrent = activeSkill.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() =>
                  setActiveSkill({
                    ...skill,
                    category: categories[selectedCategory].title,
                  })
                }
                onMouseEnter={() =>
                  setActiveSkill({
                    ...skill,
                    category: categories[selectedCategory].title,
                  })
                }
                className={`p-5 rounded-sm cursor-pointer transition-all duration-300 border ${
                  isCurrent
                    ? "bg-carbon-800 border-cyan-neon shadow-[0_0_20px_rgba(0,240,255,0.15)] -translate-y-1"
                    : "bg-carbon-900/60 hover:bg-carbon-850 border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-zinc-500">{skill.level}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? "bg-cyan-neon animate-ping" : "bg-zinc-600"
                    }`}
                  />
                </div>

                <div className="font-display font-bold text-lg text-white mb-1.5 flex items-center justify-between">
                  <span>{skill.name}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isCurrent ? "text-cyan-neon translate-x-1" : "text-zinc-600"
                    }`}
                  />
                </div>

                <div className="font-mono text-xs text-cyan-neon/90 mb-2 truncate">
                  {skill.highlight}
                </div>

                <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
