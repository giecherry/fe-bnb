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
    name?: string;
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
    name, 
}: InputProps) {
    return (
        <div className="flex flex-col space-y-2">
            {label && (
                <label
                    className="text-sm font-bold text-[#ff8faf]"
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
                name={name} 
                className={`border border-[#ffcedc] rounded-md px-4 py-2 text-black placeholder-[#ffcedc] focus:outline-none focus:ring-2 focus:ring-[#ff8faf] focus:border-[#ff8faf] disabled:bg-[#ffcedc] disabled:cursor-not-allowed ${className}`}
            />
        </div>
    );
}
