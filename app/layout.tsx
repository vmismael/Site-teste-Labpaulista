import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";
import CookieBanner from "@/components/CookieBanner";
import { SITE_NAME, SITE_DESCRIPTION, UNIDADES } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibmplex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  medicalSpecialty: [
    "Bioquímica",
    "Hematologia",
    "Imunologia",
    "Microbiologia",
    "Biologia Molecular",
  ],
  location: UNIDADES.map((u) => ({
    "@type": "Place",
    name: u.nome,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.endereco,
      addressLocality: u.cidade,
      addressRegion: "SP",
      postalCode: u.cep,
      addressCountry: "BR",
    },
    telephone: u.telefones[0],
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${ibmPlex.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-white text-[#0a0a0a] antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsappFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
