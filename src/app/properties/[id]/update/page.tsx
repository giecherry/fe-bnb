"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById } from "../../../api/properties";
import { apiRequest } from "../../../../utils/auth";
import Input from "../../../../components/Input";
import Btn from "../../../../components/Btn";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.BACKEND_BASE_URL || 'http://localhost:1004';


export default function UpdatePropertyPage() {
    const params = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        price_per_night: "",
        images: [] as string[],
        availability: false,
    });
    const [imageInput, setImageInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

            if (!propertyId) {
                setError("Property ID is missing.");
                return;
            }

            try {
                const data = await getPropertyById(propertyId);
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    location: data.location || "",
                    price_per_night: data.price_per_night?.toString() || "",
                    images: data.images || [], 
                    availability: data.availability || false, 
                });
            } catch (err: unknown) {
                console.error("Failed to fetch property details:", err);
                setError("Something went wrong. Please try again.");
            }
        };

        fetchProperty();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleAvailability = () => {
        setFormData((prev) => ({ ...prev, availability: !prev.availability }));
    };

    const handleAddImage = () => {
        if (!imageInput.trim()) {
            setError("Please provide a valid image URL.");
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
            const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

            const response = await apiRequest(`${API_URL}/properties/${propertyId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ...formData,
                    price_per_night: parseFloat(formData.price_per_night),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update property.");
            }

            toast.success("Property updated successfully!");
            router.push(`/properties/${propertyId}`);
        } catch (err: unknown) {
            console.error("Failed to update property:", err);
            setError((err as Error).message || "Something went wrong. Please try again.");
            toast.error(error || "Failed to update property.");
        } finally {
            setLoading(false);
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!formData.name) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                <h1 className="text-2xl font-bold text-black mb-6">Update Property</h1>
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

                    {/* Availability Toggle */}
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-bold text-[#ff8faf]">Availability</label>
                        <button
                            type="button"
                            onClick={handleToggleAvailability}
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${formData.availability ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${formData.availability ? "translate-x-6" : "translate-x-0"
                                    }`}
                            ></div>
                        </button>
                        <span className="text-sm text-gray-700">
                            {formData.availability ? "Available" : "Unavailable"}
                        </span>
                    </div>

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
                                        className="w-32 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                    {/* Delete Button */}
                                    <Btn
                                        type="button"
                                        variant="danger"
                                        className="w-24"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Delete
                                    </Btn>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Btn type="submit" variant="primary" className="w-full">
                        {loading ? "Updating Property..." : "Update Property"}
                    </Btn>
                </form>
            </div>
        </div>
    );
}