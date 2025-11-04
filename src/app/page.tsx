import Btn from "../components/Btn";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 bg-pink-50">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hembnb</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover and book unique homestays around the world.
        </p>
        <div className="flex gap-4">
          <Link href="/properties">
            <Btn variant="primary">
              Browse
            </Btn>
          </Link>
        </div>
      </main>
    </div>
  );
}
