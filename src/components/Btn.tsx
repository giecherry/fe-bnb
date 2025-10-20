import React from "react";

interface BtnProps {
    children: React.ReactNode; 
    onClick?: () => void; 
    className?: string;
    type?: "button" | "submit" | "reset"; 
    disabled?: boolean; 
    variant?: "primary" | "secondary" | "outline";
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
        "px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-200";
    const variantStyles = {
        primary:
            "bg-pink-500 text-white hover:bg-pink-600 focus:ring-2 focus:ring-pink-300",
        secondary:
            "bg-pink-100 text-pink-800 hover:bg-pink-200 focus:ring-2 focus:ring-pink-300",
        outline:
            "border border-pink-500 text-pink-500 hover:bg-pink-50 focus:ring-2 focus:ring-pink-300",
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
