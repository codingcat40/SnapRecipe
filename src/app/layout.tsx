import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapRecipe — Scan any Food Photo, Get the Full Recipe & Macros",
  description:
    "Upload any food photo and instantly get ingredients, cooking steps, calories, protein, carbs and fat. Free AI-powered recipe scanner — no sign up needed.",
  keywords: [
    "scan food photo get recipe",
    "photo to recipe AI",
    "identify dish from photo recipe",
    "recreate restaurant dish at home",
    "what recipe is this food",
    "food image to ingredients",
    "scan meal get macros",
    "calories from food photo",
    "AI recipe generator from photo",
    "food photo nutrition calculator",
  ],
  openGraph: {
    title: "SnapRecipe — Scan any dish, get the full recipe + macros",
    description:
      "Upload a food photo and instantly get ingredients, steps, calories and macros. Free, no sign up.",
    url: "https://your-domain.vercel.app",
    siteName: "SnapRecipe",
    type: "website",
    images: [
      {
        url: "https://your-domain.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapRecipe — AI food photo to recipe scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapRecipe — Scan any dish, get the full recipe",
    description: "Upload a food photo, get ingredients + macros instantly. Free AI tool.",
    images: ["https://your-domain.vercel.app/og-image.png"],
  },
  metadataBase: new URL("https://your-domain.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}