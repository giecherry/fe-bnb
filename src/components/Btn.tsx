import React from "react";

interface BtnProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: "primary" | "secondary" | "outline" | "danger"; 
}

export default function Btn({
    children,
    onClick,
    className = "",
    type = "button",
    disabled = false,
    variant = "primary",
}: BtnProps) {
    const baseStyles =
        "px-4 py-2 rounded-md font-bold focus:outline-none transition-colors duration-200";
    const variantStyles = {
        primary:
            "bg-[#ff8faf] text-white hover:bg-[#ffcedc] focus:ring-2 focus:ring-[#ffcedc]",
        secondary:
            "bg-[#ffcedc] text-[#ff8faf] hover:bg-[#ff8faf] hover:text-white focus:ring-2 focus:ring-[#ff8faf]",
        outline:
            "border border-[#ff8faf] text-[#ff8faf] hover:bg-[#ffcedc] focus:ring-2 focus:ring-[#ff8faf]",
        danger:
            "border border-[#ff4d6d] text-[#ff4d6d] hover:bg-[#ffcedc] hover:text-black focus:ring-2 focus:ring-[#ff8faf]",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
        >
            {children}
        </button>
    );
}
