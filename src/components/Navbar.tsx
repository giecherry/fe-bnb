import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-transparent text-black py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="hover:text-[#ff8faf] transition-colors">
                        <img
                            src="https://i.imgur.com/eGjOPoQ.png"
                            alt="Hembnb Logo"
                            className="h-16 w-16 inline-block mr-2"
                        />
                    </Link>
                </h1>

                {/* Navigation Links */}
                <ul className="flex space-x-8">
                    <li>
                        <Link
                            href="/"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/properties"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
                        >
                            Properties
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/bookings"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
                        >
                            Bookings
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/login"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/auth/register"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
                        >
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}