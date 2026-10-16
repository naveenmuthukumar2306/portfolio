"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Cpu, Layers, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { getAssetPath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      projectCardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".project-img-wrapper");
        const details = card.querySelector(".project-details-wrapper");

        gsap.from(img, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          clipPath: "inset(0% 100% 0% 0%)",
          opacity: 0,
          scale: 0.95,
          duration: 1.1,
          ease: "power4.out",
        });

        gsap.from(details, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = PORTFOLIO_DATA.projects.filter((p) => p.featured);
  const secondaryProjects = PORTFOLIO_DATA.projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-carbon-950/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>03 // Selected Architecture & Engineering</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Featured Production Platforms
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            SHOWCASING 06 VERIFIED PROJECTS
          </div>
        </div>

        {/* Featured Projects: Alternating Editorial Layout */}
        <div className="space-y-28">
          {featuredProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={project.id}
                ref={(el) => {
                  projectCardsRef.current[idx] = el;
                }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Showcase (7 cols) */}
                <div
                  className={`project-img-wrapper lg:col-span-7 relative group ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative rounded-sm overflow-hidden border border-white/10 bg-carbon-850 p-2 sm:p-3 shadow-2xl transition-all duration-500 group-hover:border-cyan-neon/40">
                    {/* Viewfinder Corners */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-cyan-neon z-20 pointer-events-none" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-cyan-neon z-20 pointer-events-none" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-cyan-neon z-20 pointer-events-none" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-cyan-neon z-20 pointer-events-none" />

                    <div className="relative w-full aspect-[16/10] bg-carbon-900 rounded-sm overflow-hidden">
                      <Image
                        src={getAssetPath(project.image)}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Metadata Overlay Badge */}
                    <div className="mt-2.5 px-3 py-2 bg-carbon-900/90 border border-white/5 rounded-xs flex items-center justify-between font-mono text-[11px] text-zinc-400">
                      <span className="text-cyan-neon font-semibold">{project.category}</span>
                      <span>GENUINE ARCHITECTURE SCREENSHOT</span>
                    </div>
                  </div>
                </div>

                {/* Details Narrative (5 cols) */}
                <div
                  className={`project-details-wrapper lg:col-span-5 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center space-x-3 font-mono text-xs text-zinc-500">
                    <span className="text-cyan-neon font-bold text-sm">{project.number}</span>
                    <span>//</span>
                    <span className="uppercase tracking-widest">{project.category}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="p-4 rounded-sm bg-carbon-900/80 border border-white/[0.08] space-y-2">
                    <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-neon" />
                      <span>Architecture Highlights</span>
                    </div>
                    <p className="font-mono text-xs text-zinc-300 leading-normal">
                      {project.architectureDetails}
                    </p>
                  </div>

                  {/* Metrics if available */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-2.5 bg-carbon-850/60 border border-white/5 rounded-xs"
                        >
                          <span className="text-zinc-500 text-[10px] block truncate">
                            {m.label}
                          </span>
                          <span className="text-white font-semibold truncate block">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-xs bg-white/5 border border-white/10 font-mono text-xs text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links / Action */}
                  <div className="pt-2 flex items-center gap-4">
                    <a
                      href="#casestudy"
                      className="inline-flex items-center space-x-2 font-mono text-xs text-cyan-neon hover:text-white transition-colors"
                    >
                      <span>Read System Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Projects Grid */}
        <div className="mt-32 pt-16 border-t border-white/[0.08]">
          <div className="mb-12">
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-1">
              03.B // Additional Engineering Work
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Systems, Migrations & Real-Time Engines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryProjects.map((project) => (
              <div
                key={project.id}
                className="group p-5 rounded-sm bg-carbon-900/60 border border-white/[0.08] hover:border-cyan-neon/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[16/10] bg-carbon-850 rounded-sm overflow-hidden border border-white/5">
                    <Image
                      src={getAssetPath(project.image)}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                    <span className="text-cyan-neon">{project.number}</span>
                    <span>{project.category}</span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-white group-hover:text-cyan-neon transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-xs bg-white/5 font-mono text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
