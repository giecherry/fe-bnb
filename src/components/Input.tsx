import React from "react";

interface InputProps {
    type?: string; 
    placeholder?: string; 
    value?: string; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    className?: string; 
    label?: string; 
    required?: boolean; 
    disabled?: boolean; 
}

export default function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    className = "",
    label,
    required = false,
    disabled = false,
}: InputProps) {
    return (
        <div className="flex flex-col space-y-2">
            {label && (
                <label
                    className="text-sm font-medium text-pink-800"
                    htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
                >
                    {label}
                </label>
            )}

            <input
                id={label?.toLowerCase().replace(/\s+/g, "-")}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`border rounded-md px-4 py-2 text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-pink-100 disabled:cursor-not-allowed ${className}`}
            />
        </div>
    );
}
