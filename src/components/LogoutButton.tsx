"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "../utils/auth";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push("/"); 
    };

    return (
        <button onClick={handleLogout}>
            <span
                className="material-symbols-outlined text-[#ff8faf] text-2xl cursor-pointer hover:opacity-80 transition-opacity"
                title="Logout"
            >
                logout
            </span>
        </button>
    );
}