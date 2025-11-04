"use client";

import { removeToken } from "../utils/auth";

export default function LogoutButton() {
    const handleLogout = () => {
        removeToken();
        window.location.href = "/";
    };

    return (
        <span
            onClick={handleLogout}
            className="material-symbols-outlined text-[#ff8faf] text-2xl cursor-pointer hover:opacity-80 transition-opacity"
            title="Logout"
        >
            logout
        </span>
    );
}