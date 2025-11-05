"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL || 'http://localhost:1004';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"user" | "host">("user");
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationErrors([]);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name, role }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.warn("Backend error:", errorData);

                if (errorData.errors) {
                    const fieldErrors = errorData.errors.map((err: ValidationError) => err.message);
                    setValidationErrors(fieldErrors);
                } else {
                    throw new Error(errorData.error || "Failed to register");
                }
                return;
            }

            const data = await response.json();

            if (role === "user") {
                router.push("/bookings");
            } else if (role === "host") {
                router.push("/properties");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.warn("Registration error:", err);
                setError(err.message || "An unexpected error occurred");
            } else {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-black mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <Input
                        type="text"
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email Input */}
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password Input */}
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Role Selection */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold font-weight: 700; text-[#ff8faf]">Role</label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`w-full border border-[#ffcedc] rounded-md px-4 py-2 text-center font-medium transition-colors ${role === "user"
                                        ? "bg-[#ffcedc] text-pink-800"
                                        : "bg-white text-black hover:bg-[#ffcedc] hover:text-pink-800"
                                    }`}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("host")}
                                className={`w-full border border-[#ffcedc] rounded-md px-4 py-2 text-center font-medium transition-colors ${role === "host"
                                        ? "bg-[#ffcedc] text-pink-800"
                                        : "bg-white text-black hover:bg-[#ffcedc] hover:text-pink-800"
                                    }`}
                            >
                                Host
                            </button>
                        </div>
                    </div>

                    {/* Validation Errors */}
                    {validationErrors.length > 0 && (
                        <div className="text-pink-800 text-sm space-y-1">
                            {validationErrors.map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                        </div>
                    )}

                    {/* General Error Message */}
                    {error && <p className="text-pink-800 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <Btn type="submit" variant="primary" className="w-full">
                        Register
                    </Btn>
                </form>

                <p className="text-sm text-center text-pink-700 mt-4">
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-pink-500 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
