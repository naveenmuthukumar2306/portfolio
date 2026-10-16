"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Github, Linkedin, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email format.";
    }
    if (!formData.message.trim()) {
      errs.message = "Message content is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_name: PORTFOLIO_DATA.personal.name,
      };

      await emailjs.send(
        PORTFOLIO_DATA.personal.emailJs.serviceId,
        PORTFOLIO_DATA.personal.emailJs.templateId,
        templateParams,
        PORTFOLIO_DATA.personal.emailJs.publicKey
      );

      setSubmitStatus("success");
      setStatusMessage("Message transmitted successfully. I will respond to your inquiry promptly.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS submission failure:", err);
      setSubmitStatus("error");
      setStatusMessage(
        "Transmission error occurred. Please reach out directly at naveenmuthukumar2306@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative border-t border-white/[0.08] bg-[#05070e]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
              <span>06 // Secure Transmission & Inquiry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Initiate Contact
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            RESPONSE TIME: WITHIN 24 HOURS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Have a challenging system to architect or a team looking for full-stack impact?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                Based in <span className="text-cyan-neon font-semibold">Chennai, India (UTC+5:30)</span>.
                Available for engineering roles, technical architecture collaborations, and ambitious full-stack systems.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href={PORTFOLIO_DATA.personal.socialLinks.email}
                className="flex items-center space-x-3 p-4 bg-carbon-850 border border-white/10 hover:border-cyan-neon/40 rounded-sm transition-all text-zinc-200 group"
              >
                <div className="w-8 h-8 rounded-sm bg-cyan-neon/10 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-zinc-500 text-[10px] block">DIRECT EMAIL</span>
                  <span className="text-white group-hover:text-cyan-neon transition-colors truncate block">
                    {PORTFOLIO_DATA.personal.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-3 p-4 bg-carbon-850 border border-white/10 rounded-sm text-zinc-200">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">GEOGRAPHIC COORDINATES</span>
                  <span className="text-white">Chennai, Tamil Nadu, India (13°N 80°E)</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-3">
                Verified Social Profiles
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={PORTFOLIO_DATA.personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-cyan-neon/40 rounded-sm text-zinc-300 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-carbon-850 hover:bg-carbon-800 border border-white/10 hover:border-cyan-neon/40 rounded-sm text-zinc-300 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive EmailJS Form */}
          <div className="lg:col-span-7 bg-carbon-850/90 p-6 sm:p-8 rounded-sm border border-white/10 shadow-2xl relative">
            <div className="font-mono text-xs text-cyan-neon uppercase tracking-widest pb-4 mb-6 border-b border-white/10 flex items-center justify-between">
              <span>Encrypted Message Dispatch</span>
              <span>EmailJS API Gateway</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs text-zinc-300 block"
                >
                  Your Name <span className="text-cyan-neon">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  placeholder="e.g. Elena Vance"
                  className={`w-full px-4 py-3 bg-carbon-900 border rounded-sm text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors ${
                    errors.name ? "border-rose-500" : "border-white/10 focus:border-cyan-neon"
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="font-mono text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-xs text-zinc-300 block"
                >
                  Your Email Address <span className="text-cyan-neon">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="e.g. elena@company.com"
                  className={`w-full px-4 py-3 bg-carbon-900 border rounded-sm text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors ${
                    errors.email ? "border-rose-500" : "border-white/10 focus:border-cyan-neon"
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="font-mono text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-xs text-zinc-300 block"
                >
                  Project Details or Message <span className="text-cyan-neon">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Outline your engineering requirements, project scope, or opportunity..."
                  className={`w-full px-4 py-3 bg-carbon-900 border rounded-sm text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors resize-none ${
                    errors.message ? "border-rose-500" : "border-white/10 focus:border-cyan-neon"
                  }`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="font-mono text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Status Alert */}
              {submitStatus !== "idle" && (
                <div
                  className={`p-4 rounded-sm font-mono text-xs flex items-start gap-2.5 ${
                    submitStatus === "success"
                      ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                      : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                  }`}
                  role="status"
                >
                  {submitStatus === "success" ? (
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-cyan-neon hover:bg-cyan-300 text-carbon-950 font-mono font-bold text-sm rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Transmitting via EmailJS..." : "Dispatch Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
