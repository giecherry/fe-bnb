"use client";

import Link  from "next/link";
import { removeToken } from "../utils/auth";

export default function LogoutButton() {
    const handleLogout = () => {
        removeToken();
        window.location.href = "/";
    };

    return (
        <Link href="/">
            <button onClick={handleLogout}>
                <span
                    className="material-symbols-outlined text-[#ff8faf] text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    title="Logout"
                >
                    logout
                </span>
            </button>
        </Link>
    );
}