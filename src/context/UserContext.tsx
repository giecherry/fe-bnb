"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserRole } from "../app/api/auth";

interface UserContextType {
    role: string | null;
    setRole: (role: string | null) => void;
    fetchAndSetRole: () => Promise<void>;
    clearRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<string | null>(null);

    const fetchAndSetRole = async () => {
        try {
            const fetchedRole = await fetchUserRole();
            setRole(fetchedRole);
        } catch (error) {
            console.error("Failed to fetch user role:", error);
            setRole(null);
        }
    };

    const clearRole = () => {
        setRole(null);
    };

    useEffect(() => {
        fetchAndSetRole();
    }, []);

    return (
        <UserContext.Provider value={{ role, setRole, fetchAndSetRole, clearRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};