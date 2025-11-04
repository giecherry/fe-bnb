"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { fetchUserRole } from "../app/api/auth";

export default function Navbar() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const getUserRole = async () => {
            const fetchedRole = await fetchUserRole();
            setRole(fetchedRole);
        };

        getUserRole();
    }, []);

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
                    {role === "user" && (
                        <li>
                            <Link
                                href="/bookings"
                                className="hover:text-[#ff8faf] transition-colors font-medium"
                            >
                                My Bookings
                            </Link>
                        </li>
                    )}
                    {role === "admin" && (
                        <li>
                            <Link
                                href="/admin"
                                className="hover:text-[#ff8faf] transition-colors font-medium"
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                    )}
                    {role === "host" && (
                        <li>
                            <Link
                                href="/host"
                                className="hover:text-[#ff8faf] transition-colors font-medium"
                            >
                                Host Dashboard
                            </Link>
                        </li>
                    )}
                    {!role && (
                        <>
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
                        </>
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


