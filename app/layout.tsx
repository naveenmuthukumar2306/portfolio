import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const siteUrl = "https://naveenmuthukumar2306.github.io/myportfolio";

export const viewport: Viewport = {
  themeColor: "#05070e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
    template: `%s | ${PORTFOLIO_DATA.personal.name}`,
  },
  description:
    "Production portfolio of Naveen Muthukumar — Full-Stack Developer specializing in Next.js, FastAPI, Claude AI integrations, RabbitMQ asynchronous architectures, and enterprise RBAC platforms.",
  keywords: [
    "Naveen Muthukumar",
    "Full-Stack Developer",
    "Next.js Developer",
    "FastAPI Python",
    "Claude AI Developer",
    "RabbitMQ Architecture",
    "Docker Microservices",
    "RBAC Security",
    "Software Engineer Chennai",
    "Web Development Portfolio",
  ],
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: siteUrl }],
  creator: PORTFOLIO_DATA.personal.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
    description:
      "Full-Stack Developer with 2+ years of production experience in Next.js, FastAPI, Claude AI integrations, RabbitMQ, and enterprise SIS platforms.",
    siteName: `${PORTFOLIO_DATA.personal.name} Portfolio`,
    images: [
      {
        url: "assets/images/hero-abstract-art.jpg",
        width: 1200,
        height: 675,
        alt: `${PORTFOLIO_DATA.personal.name} — Full-Stack Developer & Systems Architect`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.title}`,
    description:
      "Full-Stack Developer with 2+ years of production experience in Next.js, FastAPI, Claude AI, RabbitMQ, and Docker.",
    images: ["assets/images/hero-abstract-art.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2305070e"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="52" font-weight="bold" fill="%2300f0ff">NM</text></svg>',
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: PORTFOLIO_DATA.personal.name,
      jobTitle: PORTFOLIO_DATA.personal.role,
      description: PORTFOLIO_DATA.personal.bio,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "India",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "University of Madras",
        },
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "FastAPI",
        "Python",
        "TypeScript",
        "RabbitMQ",
        "Docker",
        "Claude AI Integration",
        "Role-Based Access Control (RBAC)",
      ],
      sameAs: [
        PORTFOLIO_DATA.personal.socialLinks.github,
        PORTFOLIO_DATA.personal.socialLinks.linkedin,
      ],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-background text-foreground selection:bg-cyan-neon/30 selection:text-white relative">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
