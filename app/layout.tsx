import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KingMorph — Personalized Morphology-Based Training",
  description:
    "King Morph combines AI-driven coaching, personalized morphology-based training, and premium performance apparel into one ecosystem. Stop following generic programs and start seeing real results.",
  keywords: [
    "fitness",
    "morphology",
    "training",
    "nutrition",
    "workout",
    "personalized",
    "AI coaching",
  ],
};

import { CartProvider } from "./context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
