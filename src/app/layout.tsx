import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hembnb",
  description: "Find and book unique homestays around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50 text-pink-800`}
      >
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-[calc(100vh-160px)] bg-pink-50">
          {children}
        </main>

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
