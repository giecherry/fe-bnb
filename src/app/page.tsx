import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Btn from "../components/Btn";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to FE-BnB</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your bookings and properties with ease.
        </p>
        <div className="flex gap-4">
          <Btn variant="primary">
            Browse
          </Btn>
        </div>
      </main>
    </div>
  );
}
