import { getToken, removeToken } from "../../utils/auth";
import { apiRequest } from "../../utils/auth";

const API_URL = process.env.BACKEND_BASE_URL || "http://localhost:1004";

export const createBooking = async (data: {
    property_id: string;
    check_in_date: string;
    check_out_date: string;
}) => {
    const response = await apiRequest(`${API_URL}/bookings`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
    });

    return response;
};

export const getUserBookings = async (userId: string) => {
    const response = await apiRequest(`${API_URL}/bookings/${userId}`, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
};

