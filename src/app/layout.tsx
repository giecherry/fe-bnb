import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      <head>
        <title>Hembnb</title>
        <link rel="icon" href="https://i.imgur.com/eGjOPoQ.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-pink-50 text-[#ff8faf]`}
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
