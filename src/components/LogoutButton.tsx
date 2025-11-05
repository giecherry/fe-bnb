"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "../utils/auth";
import { useUserContext } from "../context/UserContext";

export default function LogoutButton() {
    const router = useRouter();
    const { clearRole } = useUserContext();

    const handleLogout = () => {
        removeToken();
        clearRole();
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