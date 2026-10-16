"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Shield, Sparkles, Network, Terminal, CheckCircle2, MapPin, Briefcase } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { getAssetPath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(imageWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textContentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-carbon-950/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>01 // Developer Identity</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              About & Architectural Philosophy
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            EXPERIENCE: 2+ YEARS PRODUCTION
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Profile Frame & Tactical Viewfinder */}
          <div ref={imageWrapRef} className="lg:col-span-5 relative group">
            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-carbon-850 p-3 shadow-2xl">
              {/* Corner HUD Reticles */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-cyan-neon z-20 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-cyan-neon z-20 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-cyan-neon z-20 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-cyan-neon z-20 pointer-events-none" />

              <div className="relative w-full aspect-[4/5] bg-carbon-900 rounded-sm overflow-hidden">
                <Image
                  src={getAssetPath("assets/images/profile.png")}
                  alt="Naveen Muthukumar portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070e] via-transparent to-transparent opacity-80" />

                {/* Subtle Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-neon/5 to-transparent h-16 w-full animate-scanline pointer-events-none opacity-40" />

                {/* Tactical Tag on Photo */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-carbon-900/90 backdrop-blur-md border border-white/10 rounded-sm font-mono text-[11px] text-zinc-300">
                  <div className="flex items-center justify-between text-cyan-neon font-semibold pb-1 border-b border-white/10">
                    <span>NAVEEN MUTHUKUMAR</span>
                    <span>ACTIVE</span>
                  </div>
                  <div className="pt-1.5 flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-neon" /> Chennai, India
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-zinc-400" /> iNoesis Tech
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Under Image */}
            <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-xs">
              <div className="p-3 bg-carbon-850/80 border border-white/[0.07] rounded-sm">
                <span className="text-zinc-500 block text-[10px]">PRODUCTION EXPERIENCE</span>
                <span className="text-white font-bold text-base">2+ Years</span>
              </div>
              <div className="p-3 bg-carbon-850/80 border border-white/[0.07] rounded-sm">
                <span className="text-zinc-500 block text-[10px]">SYSTEM CORE</span>
                <span className="text-cyan-neon font-bold text-base">FastAPI + Next</span>
              </div>
            </div>
          </div>

          {/* Narrative & Engineering Pillars */}
          <div ref={textContentRef} className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Architecting scalable web platforms with a focus on maintainability, performance, and user impact.
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                {PORTFOLIO_DATA.personal.bio}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Currently driving core features at{" "}
                <span className="text-white font-semibold">iNoesis Technologies</span>, my daily work involves designing scalable FastAPI endpoints, orchestrating asynchronous worker queues with RabbitMQ, and deploying resilient Next.js frontend architectures with fine-grained access control.
              </p>
            </div>

            {/* 4 Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-carbon-900/60 border border-white/[0.08] hover:border-cyan-neon/30 transition-colors rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-base">Full-Stack Precision</h4>
                <p className="font-mono text-xs text-zinc-400 leading-normal">
                  End-to-end type safety with Next.js App Router, React, and Python FastAPI microservices with OpenAPI guarantees.
                </p>
              </div>

              <div className="p-5 bg-carbon-900/60 border border-white/[0.08] hover:border-electric-violet/40 transition-colors rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-electric-violet/10 border border-electric-violet/30 flex items-center justify-center text-electric-violet mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-base">AI-Augmented Systems</h4>
                <p className="font-mono text-xs text-zinc-400 leading-normal">
                  Production integration of Anthropic Claude AI for intelligent quiz & assignment generation, using Claude Code for agentic workflows.
                </p>
              </div>

              <div className="p-5 bg-carbon-900/60 border border-white/[0.08] hover:border-cyan-neon/30 transition-colors rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon mb-3">
                  <Network className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-base">Decoupled Queues</h4>
                <p className="font-mono text-xs text-zinc-400 leading-normal">
                  Implementing RabbitMQ message brokers and asynchronous background workers to ensure zero-latency client interactions.
                </p>
              </div>

              <div className="p-5 bg-carbon-900/60 border border-white/[0.08] hover:border-emerald-400/40 transition-colors rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-base">Enterprise RBAC</h4>
                <p className="font-mono text-xs text-zinc-400 leading-normal">
                  Conceived a dual-axis document status model and capability matrix adopted as a platform standard in educational SIS.
                </p>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="p-4 bg-carbon-850 border border-white/[0.08] rounded-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-neon" /> Clean Code & Maintainability
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-neon" /> Zero-Crash Production Deployments
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-neon" /> User-Centric Ergonomics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
