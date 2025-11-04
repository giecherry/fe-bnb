"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "../../api/auth";
import { saveToken } from "../../../utils/auth";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await login({ email, password });
            saveToken(response.token);

            const { role } = response;
            if (role === "user") {
                router.push("/bookings");
            } else if (role === "host") {
                router.push("/host");
            } else if (role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-black mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Btn type="submit" variant="primary" className="w-full">
                        Login
                    </Btn>
                </form>

                <p className="text-sm text-center text-pink-700 mt-4">
                    Don't have an account?{" "}
                    <a href="/auth/register" className="text-pink-500 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;