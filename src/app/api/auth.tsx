import { getToken } from "../../utils/auth";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL || 'http://localhost:1004';

export const login = async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(errorData.error || 'Failed to log in');
    }

    return response.json();
};

export const fetchUserRole = async (): Promise<string | null> => {
    const token = getToken();
    if (!token) {
        console.warn("No token found. User is not authenticated.");
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Failed to fetch user role:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data.role;
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
};

