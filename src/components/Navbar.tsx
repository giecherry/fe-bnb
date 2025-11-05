"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { fetchUserRole } from "../app/api/auth";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [role, setRole] = useState<string | null>("loading");
    const pathname = usePathname(); 
    useEffect(() => {
        const getUserRole = async () => {
            const fetchedRole = await fetchUserRole();
            setRole(fetchedRole);
        };
        getUserRole();
    }, []);
    const isActive = (path: string) => pathname === path;

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
                    <li className={`relative group ${isActive("/properties") ? "text-[#ff8faf] font-bold" : ""}`}>
                        <Link
                            href="/properties"
                            className="hover:text-[#ff8faf] transition-colors font-medium"
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
                                className="hover:text-[#ff8faf] transition-colors font-medium"
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
                                className="hover:text-[#ff8faf] transition-colors font-medium"
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
                                className="hover:text-[#ff8faf] transition-colors font-medium"
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
                                <span className="material-symbols-outlined text-[#ff8faf] text-2xl cursor-pointer hover:opacity-80 transition-opacity">
                                    login
                                </span>
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