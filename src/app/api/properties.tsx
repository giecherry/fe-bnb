import { apiRequest } from "../../utils/auth";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL || 'http://localhost:1004';

export const getAllProperties = async (): Promise<Property[]> => {
    const response = await fetch(`${API_URL}/properties`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return response.json();
};

export const getPropertyById = async (id: string): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) throw new Error("Failed to fetch property details");
    return response.json();
};

export const deleteProperty = async (id: string): Promise<void> => {
    const response = await apiRequest(`${API_URL}/properties/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete property");
    }
};

