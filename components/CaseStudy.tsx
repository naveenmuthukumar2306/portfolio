"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Network, ShieldAlert, Cpu, CheckCircle2, ArrowRight, GitBranch } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIPELINE_STAGES = [
  {
    step: "01",
    name: "Client Ingestion",
    tech: "Next.js 14 App Router",
    desc: "Optimistic UI renders upload progress. Chunked multipart stream sends document with cryptographic client hash.",
  },
  {
    step: "02",
    name: "API & Capability Gate",
    tech: "FastAPI + Pydantic",
    desc: "Validates payload schema, decodes JWT, and verifies actor rights against the Dual-Axis Capability Matrix.",
  },
  {
    step: "03",
    name: "Message Broker Queue",
    tech: "RabbitMQ Event Bus",
    desc: "Decouples synchronous HTTP from background processing by dispatching persistent task events with dead-letter fallback.",
  },
  {
    step: "04",
    name: "Asynchronous Worker",
    tech: "Dockerized Python Workers",
    desc: "Performs OCR text extraction, watermarking, security virus scans, and immutable audit logging.",
  },
  {
    step: "05",
    name: "State Transition & Real-time Update",
    tech: "Relational DB & SSE",
    desc: "Atomic status advancement across the lifecycle matrix. Client dashboard receives live completion event.",
  },
];

export default function CaseStudy() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="casestudy"
      ref={sectionRef}
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#060810]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>04 // Technical Deep-Dive & Architecture Case Study</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              The Dual-Axis Status Engine
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            SYSTEM: eCampusBuddy SIS PLATFORM
          </div>
        </div>

        <div ref={contentRef} className="space-y-16">
          {/* Executive Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs text-cyan-neon uppercase tracking-wider">
                The Engineering Challenge
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Eliminating Race Conditions in Enterprise SIS Document Workflows
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                In student information systems, academic documents pass through multiple administrative tiers (Students, Faculty, Department Heads, Registrars). Naive boolean states like <code className="text-cyan-neon bg-cyan-neon/10 px-1 py-0.5 rounded text-xs font-mono">is_approved</code> lead to concurrency collisions and authorization leaks when reviews occur in parallel.
              </p>
            </div>

            <div className="lg:col-span-7 bg-carbon-850 p-6 sm:p-8 rounded-sm border border-white/10 space-y-4 shadow-xl">
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Architectural Solution: Dual-Axis Model</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                I engineered a formal dual-axis state machine separating the <strong className="text-white">Document Lifecycle Axis</strong> (Draft → Under Verification → Department Certified → Registrar Sealed) from the <strong className="text-white">Actor Capability Axis</strong> (who can transition which state under which cryptographic prerequisites).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-carbon-900 border border-white/5 rounded-xs">
                  <span className="text-zinc-500 block text-[10px]">LIFECYCLE STATES</span>
                  <span className="text-cyan-neon font-bold">5 Deterministic</span>
                </div>
                <div className="p-3 bg-carbon-900 border border-white/5 rounded-xs">
                  <span className="text-zinc-500 block text-[10px]">PERMISSIONS MATRIX</span>
                  <span className="text-electric-violet font-bold">Strict Role RBAC</span>
                </div>
                <div className="p-3 bg-carbon-900 border border-white/5 rounded-xs">
                  <span className="text-zinc-500 block text-[10px]">IMPACT</span>
                  <span className="text-emerald-400 font-bold">System-Wide Std</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Pipeline Architecture Flow */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
              <div className="font-mono text-xs text-zinc-300 tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-neon" />
                <span>INTERACTIVE ASYNCHRONOUS PIPELINE FLOW</span>
              </div>
              <span className="font-mono text-xs text-zinc-500">
                Click any node to inspect data flow
              </span>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveStage(idx)}
                    className={`p-4 rounded-sm text-left transition-all duration-300 border ${
                      isActive
                        ? "bg-carbon-800 border-cyan-neon shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        : "bg-carbon-900/60 hover:bg-carbon-850 border-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-2">
                      <span className={isActive ? "text-cyan-neon font-bold" : "text-zinc-500"}>
                        {stage.step}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase">STAGE</span>
                    </div>
                    <div className="font-display font-bold text-sm text-white mb-1">
                      {stage.name}
                    </div>
                    <div className="font-mono text-[11px] text-cyan-neon/80 truncate">
                      {stage.tech}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Deep Detail Card */}
            <div className="p-6 sm:p-8 bg-carbon-850/90 border border-cyan-neon/30 rounded-sm space-y-3 shadow-2xl relative overflow-hidden">
              <div className="font-mono text-xs text-cyan-neon uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>
                  STAGE {PIPELINE_STAGES[activeStage].step} SPECIFICATION // {PIPELINE_STAGES[activeStage].tech}
                </span>
              </div>
              <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                {PIPELINE_STAGES[activeStage].name}
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-4xl font-light">
                {PIPELINE_STAGES[activeStage].desc}
              </p>
            </div>
          </div>

          {/* AI-Augmented Workflow Callout */}
          <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-xs text-electric-violet uppercase tracking-widest flex items-center gap-2 font-bold">
                <GitBranch className="w-4 h-4" />
                <span>AI Agent-Driven Engineering Workflow</span>
              </div>
              <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                Prototyping with Claude Code Agents
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Leveraged Anthropic&apos;s Claude Code agentic workflows to rapidly formulate edge-case test suites for the state machine, validating concurrent transition handling and reducing architecture iteration cycles by 40%.
              </p>
            </div>
            <div className="px-4 py-2 rounded-sm bg-white/5 border border-white/10 font-mono text-xs text-zinc-300 whitespace-nowrap">
              STRICT PII & RBAC VERIFIED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
