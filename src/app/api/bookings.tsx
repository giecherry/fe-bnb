import { getToken, removeToken } from "../../utils/auth";

const API_URL = process.env.BACKEND_BASE_URL || "http://localhost:1004";

export const createBooking = async (data: {
    property_id: string;
    check_in_date: string;
    check_out_date: string;
}) => {
    const token = getToken();
    if (!token) {
        throw new Error("Unauthorized: No token provided.");
    }

    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    return response;
};

export const getUserBookings = async (userId: string) => {
    const token = getToken();
    if (!token) {
        removeToken();
        window.location.href = "/auth/login"; 
        throw new Error("You must be logged in to view your bookings.");
    }

    const response = await fetch(`${API_URL}/bookings/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!response.ok) {
        const authError = response.headers.get("X-Auth-Error");
        if (authError) {
            console.error("Authentication Error:", authError);

            if (authError === "Token expired") {
                removeToken();
                window.location.href = "/auth/login";
                throw new Error("Your session has expired. Please log in again.");
            }

            if (authError === "Invalid token") {
                removeToken();
                window.location.href = "/auth/login";
                throw new Error("Invalid token. Please log in again.");
            }
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            console.error("Backend Error (JSON):", errorData);

            if (errorData.error === "Token expired") {
                removeToken();
                window.location.href = "/auth/login";
                throw new Error("Your session has expired. Please log in again.");
            }

            if (errorData.error === "Invalid token") {
                removeToken();
                window.location.href = "/auth/login";
                throw new Error("Invalid token. Please log in again.");
            }

            throw new Error(errorData.error || "Failed to fetch bookings.");
        } else {
            const errorText = await response.text();
            console.error("Backend Error (Text):", errorText);
            throw new Error(errorText || "Failed to fetch bookings.");
        }
    }

    return response.json();
};

