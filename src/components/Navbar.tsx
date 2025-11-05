"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useUserContext } from "../context/UserContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { role } = useUserContext();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-transparent text-black py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="hover:text-[#ff8faf] transition-colors">
                        <img
                            src="https://i.imgur.com/WTweqkg.png"
                            alt="Hembnb Logo"
                            className="h-18 w-18 inline-block mr-2 hover:scale-110 transition-transform duration-200"
                        />
                    </Link>
                </h1>

                {/* Navigation Links */}
                <ul className="flex space-x-8 items-center">
                    <li className={`relative group ${isActive("/properties") ? "text-[#ff8faf] font-bold" : ""}`}>
                        <Link
                            href="/properties"
                            className="hover:text-black text-[#ff8faf] transition-colors font-medium"
                        >
                            Homes
                        </Link>
                        {isActive("/properties") && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff8faf]"></span>
                        )}
                    </li>
                    {role === "user" && (
                        <li className={`relative group ${isActive("/bookings") ? "text-[#ff8faf] font-bold" : ""}`}>
                            <Link
                                href="/bookings"
                                className="hover:text-black text-[#ff8faf] transition-colors font-medium"
                            >
                                My Bookings
                            </Link>
                            {isActive("/bookings") && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff8faf]"></span>
                            )}
                        </li>
                    )}
                    {role === "admin" && (
                        <li className={`relative group ${isActive("/admin") ? "text-[#ff8faf] font-bold" : ""}`}>
                            <Link
                                href="/admin"
                                className="hover:text-black text-[#ff8faf] transition-colors font-medium"
                            >
                                Dashboard
                            </Link>
                            {isActive("/admin") && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff8faf]"></span>
                            )}
                        </li>
                    )}
                    {role === "host" && (
                        <li className={`relative group ${isActive("/host") ? "text-[#ff8faf] font-bold" : ""}`}>
                            <Link
                                href="/host"
                                className="hover:text-black text-[#ff8faf] transition-colors font-medium"
                            >
                                Dashboard
                            </Link>
                            {isActive("/host") && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff8faf]"></span>
                            )}
                        </li>
                    )}
                    {!role && (
                        <li className={`relative group ${isActive("/auth/login") ? "text-[#ff8faf] font-bold" : ""}`}>
                            <Link
                                href="/auth/login"
                                className="flex items-center hover:text-[#ff8faf] transition-colors font-medium"
                            >
                                <img src="https://i.imgur.com/OiWnaoS.png" className="h-8 w-auto inline-block mr-2" />
                            </Link>
                            {isActive("/auth/login") && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff8faf]"></span>
                            )}
                        </li>
                    )}
                    {role && (
                        <li>
                            <LogoutButton />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}