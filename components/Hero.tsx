"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Download, Terminal, Cpu, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { getAssetPath } from "@/lib/utils";

// Lazy-load Three.js canvas on client side only to avoid blocking initial render
const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-20" aria-hidden="true">
      <div className="w-48 h-48 rounded-full border border-cyan-neon/20 animate-pulse" />
    </div>
  ),
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          titleLine1Ref.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
            skewY: 3,
          },
          "-=0.5"
        )
        .from(
          titleLine2Ref.current,
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
            skewY: -3,
          },
          "-=0.85"
        )
        .from(
          subtextRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          ctaGroupRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          metadataRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-electric-violet/10 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-neon/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Top Metadata Strip */}
      <div
        ref={badgeRef}
        className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/[0.08] relative z-10 font-mono text-[11px] text-zinc-400"
      >
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
            LIVE // v2.0 SYSTEM
          </span>
          <span className="hidden sm:inline-block text-zinc-500">|</span>
          <span className="hidden sm:inline-block tracking-wider">
            {PORTFOLIO_DATA.personal.coordinates}
          </span>
        </div>

        <div className="flex items-center space-x-4 tracking-wider text-zinc-400">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>FASTAPI + NEXT.JS ARCHITECTURE</span>
          </span>
          <span className="hidden md:inline-block text-zinc-600">/</span>
          <span className="hidden md:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ENTERPRISE RBAC</span>
          </span>
        </div>
      </div>

      {/* Main Hero Stage */}
      <div className="w-full max-w-7xl mx-auto my-auto py-12 sm:py-16 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow Label */}
          <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-cyan-neon tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>Senior Full-Stack Engineer // Distributed Systems & AI</span>
          </div>

          {/* Oversized Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] text-white">
            <span ref={titleLine1Ref} className="block overflow-hidden">
              NAVEEN
            </span>
            <span
              ref={titleLine2Ref}
              className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-electric-blue to-electric-violet"
            >
              MUTHUKUMAR
            </span>
          </h1>

          {/* Subtitle / Architectural Focus */}
          <div ref={subtextRef} className="space-y-3 pt-2">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-light text-zinc-200 tracking-tight max-w-3xl leading-snug">
              Building resilient production platforms with{" "}
              <span className="text-white font-medium">React.js</span>,{" "}
              <span className="text-white font-medium">Next.js</span>, and{" "}
              <span className="text-white font-medium">FastAPI</span>.
              Specialized in Claude AI-augmented workflows, RabbitMQ message queues, and granular role-based architectures.
            </p>

            <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-2xl">
              2+ years engineering mission-critical SIS document architectures, LMS platforms, and high-concurrency microservices in Chennai, India.
            </p>
          </div>

          {/* Action Call To Actions */}
          <div
            ref={ctaGroupRef}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center space-x-3 bg-cyan-neon hover:bg-cyan-300 text-carbon-950 font-mono font-bold text-sm px-6 py-3.5 rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="#casestudy"
              className="inline-flex items-center space-x-2 bg-carbon-850 hover:bg-carbon-800 text-white font-mono text-sm px-6 py-3.5 rounded-sm border border-white/10 hover:border-cyan-neon/40 transition-all duration-300"
            >
              <span>SIS Architecture Study</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-neon" />
            </a>

            <a
              href={getAssetPath(PORTFOLIO_DATA.personal.resumePdf)}
              download={PORTFOLIO_DATA.personal.resumePdf}
              className="inline-flex items-center space-x-2 bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white font-mono text-sm px-5 py-3.5 rounded-sm border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Technical Ticker & Scroll Indicator */}
      <div
        ref={metadataRef}
        className="w-full max-w-7xl mx-auto pt-6 border-t border-white/[0.08] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500"
      >
        <div className="flex items-center gap-6">
          <div>
            <span className="text-zinc-600 block text-[10px]">STACK TIERS</span>
            <span className="text-zinc-300">FastAPI • Next.js • RabbitMQ</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-zinc-600 block text-[10px]">ROLE SPEC</span>
            <span className="text-zinc-300">Software Developer @ iNoesis</span>
          </div>
          <div className="hidden md:block">
            <span className="text-zinc-600 block text-[10px]">AVAILABILITY</span>
            <span className="text-cyan-neon">Active For High-Impact Teams</span>
          </div>
        </div>

        <a
          href="#about"
          className="flex items-center space-x-2 text-zinc-400 hover:text-cyan-neon transition-colors group cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span className="tracking-widest text-[11px] uppercase">Scroll to inspect</span>
          <div className="w-4 h-7 rounded-full border border-zinc-600 flex items-start justify-center p-1 group-hover:border-cyan-neon transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-cyan-neon animate-bounce" />
          </div>
        </a>
      </div>
    </header>
  );
}
