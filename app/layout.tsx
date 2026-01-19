import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AuroraChatWidget } from "@/components/FloatingChatWidget";
import { AtlasChatWidget } from "@/components/AtlasChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://nicheai-nx5p.vercel.app";
const SITE_NAME = "NicheAI";
const SITE_DESCRIPTION = "NicheAI combines quantum-powered AI companions (Aurora & Atlas) with the LUXBIN gasless blockchain. Experience Light Language translation, quantum cryptography, and emotional AI intelligence. Zero gas fees, infinite possibilities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NicheAI - Quantum AI Meets Blockchain Innovation | LUXBIN",
    template: "%s | NicheAI"
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "niche",
    "NicheAI",
    "niche AI",
    "niche blockchain",
    "niche crypto",
    "quantum AI",
    "quantum internet",
    "quantum blockchain",
    "blockchain",
    "LUXBIN",
    "LUX token",
    "gasless blockchain",
    "AI companions",
    "Aurora AI",
    "Atlas AI",
    "Light Language",
    "quantum computing",
    "quantum cryptography",
    "Web3",
    "cryptocurrency",
    "decentralized AI",
    "Substrate blockchain",
    "photonic computing",
    "diamond NV center",
    "emotional AI",
    "quantum network",
    "quantum communication"
  ],
  authors: [{ name: "NicheAI", url: SITE_URL }],
  creator: "NicheAI",
  publisher: "NicheAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "NicheAI - Quantum AI Meets Blockchain Innovation",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/nicheai-logo.jpg",
        width: 1200,
        height: 630,
        alt: "NicheAI - Quantum AI Platform",
      },
      {
        url: "/nicheai-logo.jpg",
        width: 600,
        height: 600,
        alt: "NicheAI Logo",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "NicheAI - Quantum AI Meets Blockchain",
    description: SITE_DESCRIPTION,
    images: ["/nicheai-logo.jpg"],
    creator: "@NicheAI",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/nicheai-logo.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "google5f97aa0960b84bb3"
    // yandex: "your-yandex-code",
    // bing: "your-bing-code",
  },

  // Category
  category: "technology",

  // Other
  other: {
    'base:app_id': '695963dcc63ad876c9081f62',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#667eea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "NicheAI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/nicheai-logo.jpg`,
        width: 512,
        height: 512,
      },
      description: SITE_DESCRIPTION,
      sameAs: [
        "https://github.com/mermaidnicheboutique-code/nicheai",
        "https://www.nxgntools.com/tools/nicheai",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "NicheAI",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description: "Quantum-enhanced AI platform with blockchain integration",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "150",
      },
    },
    {
      "@type": "Product",
      name: "LUXBIN Token (LUX)",
      description: "Native token of the LUXBIN gasless Layer 1 blockchain",
      brand: {
        "@type": "Brand",
        name: "NicheAI",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress wallet extension errors in development
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('chrome.runtime.sendMessage') ||
                      args[0]?.includes?.('Extension ID')) {
                    return; // Suppress wallet extension errors
                  }
                  originalError(...args);
                };
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>
          {children}
          <AuroraChatWidget />
          <AtlasChatWidget />
        </Providers>
      </body>
    </html>
  );
}
