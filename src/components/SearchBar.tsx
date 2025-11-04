import { useState } from "react";

interface SearchBarProps {
    placeholder?: string; 
    onSearch?: (query: string) => void;
    className?: string; 
}

export default function SearchBar({
    placeholder = "Search...",
    onSearch,
    className = "",
}: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch?.(query);
    };

    return (
        <div className={`flex items-center border bg-white border-[#ff8faf] rounded-lg p-2 my-4 ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="flex-grow px-4 py-2 rounded-lg outline-none text-black"
            />
            <button
                onClick={handleSearch}
                className="bg-[#ff8faf] text-white px-4 py-2 rounded-lg ml-2 hover:bg-[#ffcedc] transition-colors"
            >
                Search
            </button>
        </div>
    );
}