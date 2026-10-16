"use client";

import React, { useRef, useEffect } from "react";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(timelineRef.current?.querySelectorAll(".timeline-card") || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#05070e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>05 // Career Timeline & Credentials</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Professional Journey & Education
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            AUG 2023 — PRESENT // CHENNAI
          </div>
        </div>

        <div ref={timelineRef} className="space-y-16">
          {/* Professional Work Experience */}
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-neon" />
              <span>Full-Time Engineering Positions</span>
            </div>

            <div className="space-y-6">
              {PORTFOLIO_DATA.experience.map((item) => (
                <div
                  key={item.company}
                  className="timeline-card p-6 sm:p-8 rounded-sm bg-carbon-850/80 border border-white/10 hover:border-cyan-neon/30 transition-all duration-300 relative overflow-hidden group shadow-xl"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-neon group-hover:w-1.5 transition-all" />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/[0.07]">
                    <div>
                      <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                        {item.role}
                      </div>
                      <div className="font-mono text-base text-cyan-neon mt-1 font-semibold flex items-center gap-2">
                        <span>{item.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 text-xs flex items-center gap-1 font-normal">
                          <MapPin className="w-3 h-3 text-cyan-neon" /> {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-cyan-neon/10 border border-cyan-neon/30 font-mono text-xs text-cyan-neon font-bold self-start">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed py-5 font-light">
                    {item.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-2.5 pb-6">
                    <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                      Key Deliverables & Architectural Impact:
                    </span>
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 text-zinc-300 text-xs sm:text-sm font-light"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-neon shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-1.5">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-xs bg-white/5 border border-white/10 font-mono text-xs text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Education Card */}
            <div className="timeline-card p-6 sm:p-8 rounded-sm bg-carbon-900/60 border border-white/10 space-y-6">
              <div className="font-mono text-xs text-cyan-neon uppercase tracking-widest flex items-center gap-2 pb-3 border-b border-white/[0.07]">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Education</span>
              </div>

              <div className="space-y-5">
                {PORTFOLIO_DATA.education.map((edu) => (
                  <div key={edu.degree} className="space-y-1">
                    <div className="font-mono text-[10px] text-cyan-neon uppercase tracking-wider">
                      {edu.type}
                    </div>
                    <div className="font-display font-bold text-lg text-white">
                      {edu.degree}
                    </div>
                    <div className="font-mono text-xs text-zinc-400">
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="timeline-card p-6 sm:p-8 rounded-sm bg-carbon-900/60 border border-white/10 space-y-6">
              <div className="font-mono text-xs text-electric-violet uppercase tracking-widest flex items-center gap-2 pb-3 border-b border-white/[0.07]">
                <Award className="w-4 h-4" />
                <span>Verified Certifications</span>
              </div>

              <div className="space-y-5">
                {PORTFOLIO_DATA.certifications.map((cert) => (
                  <div key={cert.degree} className="space-y-1">
                    <div className="font-mono text-[10px] text-electric-violet uppercase tracking-wider">
                      {cert.type}
                    </div>
                    <div className="font-display font-bold text-lg text-white">
                      {cert.degree}
                    </div>
                    <div className="font-mono text-xs text-zinc-400">
                      {cert.institution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
