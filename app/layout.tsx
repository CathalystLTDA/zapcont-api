/* eslint-disable @typescript-eslint/no-unused-vars */
 
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vercel + Neon",
  description: "Use Neon with Vercel",
};

export default function RootLayout({
  children,
  types = null,
}: {
  children: React.ReactNode;
  types: React.ReactNode; // now required
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
