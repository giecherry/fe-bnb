import { toast } from "react-toastify";

export const saveToken = (token: string): void => {
  if (!token) {
    console.error("Cannot save an empty token.");
    throw new Error("Token is required to save.");
  }
  try {
    sessionStorage.setItem("token", token);
  } catch (err) {
    console.error("Failed to save token:", err);
    throw new Error("Failed to save token.");
  }
};

export const getToken = (): string => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.warn("No token found.");
    return "";
  }
  return token;
};

export const removeToken = (): void => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.warn("No token found to remove.");
      return;
    }
    sessionStorage.removeItem("token");
  } catch (err) {
    console.error("Failed to remove token:", err);
    throw new Error("Failed to remove token.");
  }
}

export const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), 
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Token is expired or invalid
      toast.error("Your session has expired. Please log in again.");
      removeToken(); 
      window.location.href = "/auth/login";
      throw new Error("Unauthorized: Token has expired.");
    }

    return response;
  } catch (err) {
    console.error("API request failed:", err);
    toast.error("An error occurred. Please try again.");
    throw err;
  }
};
