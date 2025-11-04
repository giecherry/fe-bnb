const API_URL = process.env.BACKEND_BASE_URL || "http://localhost:1004";

export const getAllProperties = async (): Promise<Property[]> => {
    const response = await fetch(`${API_URL}/properties`);
    if (!response.ok) throw new Error("Failed to fetch properties");
    return response.json();
};

export const getPropertyById = async (id: string): Promise<Property> => {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) throw new Error("Failed to fetch property details");
    return response.json();
};