"use client";

import { removeToken } from "../utils/auth";

export default function LogoutButton() {
    const handleLogout = () => {
        removeToken();
        window.location.href = "/";
    };

    return (
        <button onClick={handleLogout} className="bg-[#ff8faf] text-white px-4 py-2 rounded-md">
            Logout
        </button>
    );
}