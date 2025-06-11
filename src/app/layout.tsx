import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "TriCore Information Technology Solutions",
  description: "Innovative IT solutions for the digital future",
  icons: {
    icon: '/images/Tricore-Logo-Icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
