export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  architectureDetails: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  tagline: string;
  skills: {
    name: string;
    level: string;
    highlight: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  type: "Degree" | "Diploma" | "Certification";
  year?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Naveen Muthukumar",
    role: "Full-Stack Developer",
    title: "Full-Stack Developer & Systems Architect",
    tagline: "React.js • Next.js • FastAPI • Claude AI • RabbitMQ • Docker • RBAC",
    bio: "Professional Full-Stack Developer with 2+ years of experience engineering scalable, production-grade web applications. Proven expertise in AI-powered feature development, asynchronous messaging systems, and enterprise role-based platform architecture. Dedicated to clean, maintainable, user-centric software.",
    location: "Chennai, Tamil Nadu, India",
    coordinates: "13.0827° N, 80.2707° E",
    email: "naveenmuthukumar2306@gmail.com",
    availability: "Available for innovative engineering challenges",
    yearsExperience: "2+ Years",
    resumePdf: "Naveen_Muthukumar_Resume.pdf",
    socialLinks: {
      github: "https://github.com/naveenmuthukumar2306",
      linkedin: "https://www.linkedin.com/in/naveen-muthukumar/",
      email: "mailto:naveenmuthukumar2306@gmail.com",
    },
    emailJs: {
      publicKey: "vY1XcYrI37nufwTj_",
      serviceId: "service_sp2u1h4",
      templateId: "template_dzqfct9",
    },
  },

  projects: [
    {
      id: "ecampusbuddy",
      number: "01",
      title: "eCampusBuddy — SIS Document Management",
      category: "Enterprise SIS Architecture",
      description:
        "Independently architected a mission-critical document management subsystem for an enterprise Student Information System. Conceived a dual-axis status model and role-based capability matrix that was adopted as the platform-wide engineering standard.",
      architectureDetails:
        "Engineered with Next.js on the frontend, FastAPI asynchronous microservices on the backend, RabbitMQ for decoupled document processing, and Docker containerization. Accelerated development using Claude Code agentic workflows.",
      tags: ["Next.js", "FastAPI", "RabbitMQ", "Docker", "RBAC", "Claude Code"],
      image: "/assets/images/ecampusbuddy.png",
      imageAlt: "eCampusBuddy SIS Document Management Architecture interface",
      featured: true,
      metrics: [
        { label: "Core Model", value: "Dual-Axis Matrix" },
        { label: "Queue", value: "RabbitMQ" },
        { label: "Architecture", value: "Async Microservice" },
      ],
    },
    {
      id: "digital-twin",
      number: "02",
      title: "Digital Twin — AI-Powered LMS",
      category: "Intelligent Learning Systems",
      description:
        "Full-featured enterprise Learning Management System featuring Claude AI-powered assignment creation, automated feedback generation, Firebase Authentication with granular custom RBAC, and an alumni mentorship engagement hub.",
      architectureDetails:
        "Connected Next.js client experiences with high-throughput FastAPI endpoints, streaming Claude AI API completions directly to instructors and students while enforcing security at every boundary.",
      tags: ["Next.js", "FastAPI", "Claude AI", "Firebase RBAC", "Python"],
      image: "/assets/images/digital-twin.png",
      imageAlt: "Digital Twin AI LMS dashboard interface",
      featured: true,
      metrics: [
        { label: "Intelligence", value: "Claude AI API" },
        { label: "Auth Model", value: "Custom RBAC" },
        { label: "Backend", value: "FastAPI Async" },
      ],
    },
    {
      id: "quicktest",
      number: "03",
      title: "QuickTest.diy — AI Quiz Generation Engine",
      category: "Generative AI Web Application",
      description:
        "Interactive platform that dynamically generates comprehensive quizzes and assessments from user-provided source text, documents, or topics with stateful client verification.",
      architectureDetails:
        "Engineered complex frontend state machines, low-latency API integration pipelines, and fluid interactive UX flows built for rapid assessment feedback.",
      tags: ["Next.js", "AI API", "UX Flow", "TypeScript", "Tailwind CSS"],
      image: "/assets/images/quicktest.png",
      imageAlt: "QuickTest.diy Quiz Generation interface",
      featured: true,
      metrics: [
        { label: "Generation", value: "Dynamic Real-Time" },
        { label: "UX Flow", value: "Zero-Latency Steps" },
      ],
    },
    {
      id: "ojaak",
      number: "04",
      title: "OJAAK — Live Bidding Platform",
      category: "Real-Time Commerce",
      description:
        "High-concurrency online auction marketplace with live bidding updates, instant event notifications, and secure user session management.",
      architectureDetails:
        "Built responsive client architecture handling dynamic pricing state updates and authentication rules.",
      tags: ["React.js", "State Machines", "Authentication", "Auction Logic"],
      image: "/assets/images/ojaak.png",
      imageAlt: "OJAAK Bidding Platform interface",
      featured: false,
    },
    {
      id: "drupal-migration",
      number: "05",
      title: "Enterprise Drupal 10 Migration",
      category: "Content Management & Security",
      description:
        "Executed high-integrity data and database schema migration from legacy Drupal 7 to modern Drupal 10 architecture with zero data loss.",
      architectureDetails:
        "Audited relational database tables, translated legacy content taxonomies, and implemented modern security policies.",
      tags: ["Drupal 10", "Migration", "Security Hardening", "PHP"],
      image: "/assets/images/drupal.png",
      imageAlt: "Drupal 10 Migration interface",
      featured: false,
    },
    {
      id: "dynamic-webpage",
      number: "06",
      title: "Dynamic Web Architecture & Custom CMS Widgets",
      category: "Full-Stack Web Engineering",
      description:
        "Developed custom high-performance Elementor component extensions integrated with custom PHP backend services and automated deployment.",
      architectureDetails:
        "Designed modular server-side routines interfacing seamlessly with client-side renderers.",
      tags: ["WordPress", "Elementor", "PHP", "FTP CI/CD"],
      image: "/assets/images/dynamic.png",
      imageAlt: "Dynamic Webpage Architecture overview",
      featured: false,
    },
  ] as Project[],

  skills: [
    {
      title: "Core Languages",
      tagline: "Foundation of all software construction",
      skills: [
        {
          name: "JavaScript (ES6+)",
          level: "Advanced",
          highlight: "Async / Closures / Event Loop",
          description: "Writing modern modular ES2024 code, promises, proxies, and browser runtime performance optimization.",
        },
        {
          name: "TypeScript",
          level: "Advanced",
          highlight: "Strict Typing / Generics",
          description: "Creating resilient type architectures, disciminated unions, and API contract guarantees.",
        },
        {
          name: "Python",
          level: "Proficient",
          highlight: "AsyncIO / Pydantic / Typing",
          description: "Building fast asynchronous REST backends, data structures, and script automation.",
        },
        {
          name: "HTML5 / Semantic Web",
          level: "Advanced",
          highlight: "Landmarks / Accessibility / SEO",
          description: "Crafting structured DOM, accessible keyboard navigation, and semantic SEO trees.",
        },
      ],
    },
    {
      title: "Frontend & Frameworks",
      tagline: "Building responsive, cinematic, zero-friction client experiences",
      skills: [
        {
          name: "Next.js (App Router)",
          level: "Advanced",
          highlight: "Static Export / Hydration / Layouts",
          description: "Architecting App Router layouts, static site exports, dynamic route handlers, and Core Web Vitals excellence.",
        },
        {
          name: "React.js",
          level: "Advanced",
          highlight: "Hooks / Context / Virtual DOM",
          description: "Building composable component hierarchies, custom hooks, and memoized performance trees.",
        },
        {
          name: "Tailwind CSS",
          level: "Advanced",
          highlight: "Design Tokens / JIT / Custom Themes",
          description: "Designing bespoke design systems, responsive typography, and glassmorphic UI tokens.",
        },
        {
          name: "GSAP & Motion",
          level: "Proficient",
          highlight: "ScrollTrigger / Timelines / MatchMedia",
          description: "Crafting orchestrated timeline sequences, responsive matchMedia conditions, and lifecycle cleanup.",
        },
        {
          name: "Three.js",
          level: "Intermediate",
          highlight: "Procedural Shaders / BufferGeometry",
          description: "Integrating interactive 3D WebGL scenes, particle physics, and memory-safe scene lifecycle disposal.",
        },
      ],
    },
    {
      title: "Backend & Distributed Systems",
      tagline: "Scalable APIs, decoupled task queues, and resilient services",
      skills: [
        {
          name: "FastAPI",
          level: "Advanced",
          highlight: "Async Microservices / OpenAPI",
          description: "Engineering asynchronous Python endpoints, dependency injection, and Pydantic validation.",
        },
        {
          name: "REST API Architecture",
          level: "Advanced",
          highlight: "Stateless Design / Versioning",
          description: "Structuring standard HTTP semantics, idempotency, granular error handling, and clean JSON payloads.",
        },
        {
          name: "RabbitMQ",
          level: "Proficient",
          highlight: "Message Queuing / Decoupled Tasks",
          description: "Configuring exchanges, persistent queues, and worker consumers for asynchronous heavy workloads.",
        },
      ],
    },
    {
      title: "DevOps & AI Architecture",
      tagline: "Modern deployment pipelines, containerization, and intelligent automation",
      skills: [
        {
          name: "Docker",
          level: "Proficient",
          highlight: "Multi-Stage Builds / Compose",
          description: "Containerizing services for consistent parity across development, staging, and production.",
        },
        {
          name: "CI/CD & Git Pipelines",
          level: "Proficient",
          highlight: "GitHub Actions / Automation",
          description: "Automating static export validation, linting gates, and deployment to GitHub Pages.",
        },
        {
          name: "Claude AI Integration",
          level: "Advanced",
          highlight: "Prompt Workflows / LLM Agents",
          description: "Integrating Anthropic Claude API for dynamic content creation, grading rubrics, and automated developer tooling.",
        },
        {
          name: "RBAC & Security",
          level: "Advanced",
          highlight: "Capability Matrices / Firebase Auth",
          description: "Designing dual-axis authorization models, JWT verification, and multi-tenant permission layers.",
        },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      period: "Aug 2023 — Present",
      role: "Software Developer",
      company: "iNoesis Technologies Pvt Ltd",
      location: "Chennai, India",
      description:
        "Core engineer developing high-impact educational technology platforms, Student Information Systems (SIS), and AI-augmented Learning Management Systems (LMS).",
      responsibilities: [
        "Architected and implemented mission-critical SIS Document Management system using Next.js and FastAPI with RabbitMQ.",
        "Created an industry-grade dual-axis document status model and capability authorization matrix now standard across systems.",
        "Integrated Claude AI APIs to power automated assignment generation and adaptive feedback in the Digital Twin LMS.",
        "Implemented secure Firebase Authentication and fine-grained custom Role-Based Access Control (RBAC).",
        "Applied Docker containerization, automated GitHub CI/CD workflows, and pre-commit verification pipelines.",
      ],
      technologies: ["Next.js", "FastAPI", "RabbitMQ", "Docker", "Claude AI", "Firebase RBAC", "Tailwind CSS", "Git"],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University of Madras",
      type: "Degree",
    },
    {
      degree: "Diploma in Electrical & Electronics Engineering",
      institution: "Department of Technical Education",
      type: "Diploma",
    },
  ] as EducationItem[],

  certifications: [
    {
      degree: "Full Stack Developer (MERN Stack)",
      institution: "Professional Technical Certification",
      type: "Certification",
    },
    {
      degree: "Dynamic Webpage Development",
      institution: "Web Architecture Certification",
      type: "Certification",
    },
  ] as EducationItem[],
};
