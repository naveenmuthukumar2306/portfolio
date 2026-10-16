# Naveen Muthukumar — Cinematic Developer Portfolio

A production-ready, cinematic developer portfolio engineered with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**, and **Three.js WebGL**. Inspired by the editorial elegance, variable-space typography, and restrained luxury of the [Kern Society](https://shockingmike.github.io/kern-society/) reference.

Hosted statically on GitHub Pages: [https://naveenmuthukumar2306.github.io/myportfolio/](https://naveenmuthukumar2306.github.io/myportfolio/)

---

## 🚀 Architectural Highlights

- **Next.js 14 App Router Static Export**: Fully compiled to HTML/CSS/JS (`output: 'export'`) for zero-runtime server dependencies, blazing Core Web Vitals, and instant edge delivery.
- **Cinematic 3D WebGL Core**: An interactive Three.js cybernetic icosahedron with orbital wireframe rings and a particle swarm featuring smooth pointer dampening (`lerp`), automatic rendering pause via `IntersectionObserver` when scrolled away, and graceful CSS/SVG fallbacks for non-WebGL environments.
- **GSAP & ScrollTrigger Animation Engine**: Lifecycle-safe timeline choreography utilizing `gsap.context()` with strict cleanup on component unmount, staggered typography reveals, and full `prefers-reduced-motion` compliance.
- **Kern Society-Inspired Editorial Design**:
  - Dark obsidian and deep space navy background palette (`#05070e`, `#0a0e1a`)
  - Vibrant hyper-cyan (`#00f0ff`) and electric violet (`#8b5cf6`) accents
  - Monospace coordinates, system status badges, and fine hairline divider grids
  - Interactive **Tech Stack Specimen Inspector** allowing users to inspect the production role of each technology in real time
- **Preserved Authentic Content**:
  - Full-Stack Developer background (2+ years at iNoesis Technologies Pvt Ltd)
  - 6 verified projects: *eCampusBuddy*, *Digital Twin LMS*, *QuickTest.diy*, *OJAAK*, *Drupal 10 Migration*, and *Dynamic Web Architecture*
  - Dual-Axis status model and capability matrix technical case study
  - Verified education, certifications, and direct resume downloads (`Naveen_Muthukumar_Resume.pdf`)
  - Functional EmailJS contact form (`service_sp2u1h4`, `template_dzqfct9`) with real-time validation and direct email fallback

---

## 🛠️ Tech Stack

| Tier | Technologies |
| :--- | :--- |
| **Framework & Engine** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & Tokens** | Tailwind CSS 3, PostCSS, Custom CSS Variables |
| **Motion & Physics** | GSAP 3, ScrollTrigger, `@gsap/react` |
| **3D Graphics** | Three.js (Procedural geometries, custom lighting, particle buffer) |
| **Icons & Typography** | Lucide React, Google Fonts (`Inter`, `Space Grotesk`, `Space Mono`) |
| **Integrations** | EmailJS Browser SDK |
| **Deployment** | GitHub Actions (`actions/deploy-pages@v4`) to GitHub Pages |

---

## 💻 Local Development

Ensure you have [Node.js](https://nodejs.org/) (v18.17+ or v20+) and [Yarn](https://yarnpkg.com/) installed.

```bash
# Clone the repository
git clone https://github.com/naveenmuthukumar2306/portfolio.git
cd portfolio

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Static Build

To generate the production static export in `out/`:

```bash
# Build for GitHub Pages subdirectory (/myportfolio)
yarn build

# Or build for root/custom domain deployment
NEXT_PUBLIC_BASE_PATH="" yarn build
```

The static files will be exported to the `out/` directory, ready to be served by any static host or GitHub Pages.

---

## 🚢 Automated GitHub Pages Deployment

A GitHub Actions workflow is configured in `.github/workflows/deploy.yml`:
- Triggers on pushes to `main` and `NA_port` branches (or via manual `workflow_dispatch`).
- Installs dependencies and runs `yarn build` with `NEXT_PUBLIC_BASE_PATH=/myportfolio`.
- Packages the `out/` directory as a GitHub Pages artifact and deploys using least-privilege permissions.

---

## 📁 Repository Directory Structure

```text
myportfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages static build & deploy
├── app/
│   ├── globals.css               # Hairline grid, noise overlay, custom scrollbar
│   ├── layout.tsx                # Next.js Metadata, Google Fonts, JSON-LD schema
│   └── page.tsx                  # Semantic main landmark assembling all sections
├── components/
│   ├── About.tsx                 # Tactical viewfinder HUD & architectural pillars
│   ├── CaseStudy.tsx             # eCampusBuddy dual-axis state machine deep dive
│   ├── Contact.tsx               # EmailJS form with validation & mailto fallback
│   ├── Experience.tsx            # iNoesis career timeline, education & certs
│   ├── Footer.tsx                # Editorial colophon & smooth return-to-top
│   ├── Hero.tsx                  # Oversized typography, GSAP reveals, and CTAs
│   ├── Navbar.tsx                # Floating status bar, coordinates, and mobile drawer
│   ├── Projects.tsx              # Alternating editorial showcases with real screenshots
│   ├── Skills.tsx                # Interactive Tech Stack Specimen Inspector
│   └── ThreeCanvas.tsx           # Procedural 3D WebGL core with pointer physics
├── data/
│   └── portfolioData.ts          # Preserved authentic project & bio data
├── legacy_backup/                # Original HTML, CSS, and JS preserved intact
├── lib/
│   └── utils.ts                  # Asset path resolver for GitHub Pages & cn utility
├── public/
│   ├── Naveen_Muthukumar_Resume.pdf
│   └── assets/
│       └── images/               # Screenshots, profile photo, and hero artwork
├── next.config.mjs               # Static export configuration (output: 'export')
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 License & Attribution

© 2026 Naveen Muthukumar. All rights reserved.
Design inspired by the editorial craft of Kern Society.
