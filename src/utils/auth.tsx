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
    window.location.href = "/auth/login?sessionExpired=true";
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
};
