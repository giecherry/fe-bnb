"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Btn from "../../../components/Btn";
import Input from "../../../components/Input";
import { isValidUrl } from "../../../utils/general";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL || 'http://localhost:1004';

export default function AddPropertyPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price_per_night: "",
        location: "",
        images: [] as string[],
        availability: true,
    });
    const [imageInput, setImageInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddImage = () => {
        if (!isValidUrl(imageInput)) {
            setError("Please provide a valid URL.");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, imageInput.trim()],
        }));
        setImageInput("");
        setError(null);
    };

    const handleRemoveImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized: No token provided.");
            }

            const payload = {
                ...formData,
                price_per_night: parseFloat(formData.price_per_night),
                availability: true,
            };

            const response = await fetch(`${API_URL}/properties`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create property.");
            }

            router.push("/host");
        } catch (err: unknown) {
            console.error("Error creating property:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-black mb-6">Add a New Property</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Property Name */}
                    <Input
                        type="text"
                        label="Property Name"
                        placeholder="Enter the property name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        required
                    />

                    {/* Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-[#ff8faf]">Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter the property description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="border border-[#ffcedc] rounded-md px-4 py-2 text-black placeholder-[#ffcedc] focus:outline-none focus:ring-2 focus:ring-[#ff8faf] focus:border-[#ff8faf]"
                            rows={4}
                        />
                    </div>

                    {/* Price per Night */}
                    <Input
                        type="number"
                        label="Price per Night ($)"
                        placeholder="Enter the price per night"
                        value={formData.price_per_night}
                        name="price_per_night"
                        onChange={handleChange}
                        required
                    />

                    {/* Location */}
                    <Input
                        type="text"
                        label="Location"
                        placeholder="Enter the property location"
                        value={formData.location}
                        name="location"
                        onChange={handleChange}
                        required
                    />

                    {/* Images */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-[#ff8faf]">Images</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Enter an image URL"
                                value={imageInput}
                                onChange={(e) => setImageInput(e.target.value)}
                                className="flex-1 border border-[#ffcedc] rounded-md px-4 py-2 text-black placeholder-[#ffcedc] focus:outline-none focus:ring-2 focus:ring-[#ff8faf] focus:border-[#ff8faf]"
                            />
                            <Btn
                                type="button"
                                variant="primary"
                                onClick={handleAddImage}
                                className="text-sm"
                            >
                                +
                            </Btn>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {formData.images.map((url, index) => (
                                <div key={index} className="flex flex-col items-center space-y-2">
                                    {/* Image Preview */}
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                    {/* Delete Button */}
                                    <Btn
                                        type="button"
                                        variant="outline"
                                        className="w-24"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Delete
                                    </Btn>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <Btn type="submit" variant="primary" className="w-full">
                        {loading ? "Adding Property..." : "Add Property"}
                    </Btn>
                </form>
            </div>
        </div>
    );
}