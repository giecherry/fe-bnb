const API_URL = process.env.BACKEND_BASE_URL || 'http://localhost:1004';

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