"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById } from "../../api/properties";
import { apiRequest } from "../../../utils/auth";
import Input from "../../../components/Input";
import Btn from "../../../components/Btn";
import { toast } from "react-toastify";

export default function UpdatePropertyPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        price_per_night: "",
        images: "", 
    });
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
                setProperty(data);
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    location: data.location || "",
                    price_per_night: data.price_per_night?.toString() || "",
                    images: data.images?.join(", ") || "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const propertyId = Array.isArray(params.id) ? params.id[0] : params.id;

            const response = await apiRequest(`${process.env.BACKEND_BASE_URL || "http://localhost:1004"}/properties/${propertyId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    ...formData,
                    price_per_night: parseFloat(formData.price_per_night),
                    images: formData.images.split(",").map((url) => url.trim()),
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
    if (!property) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-pink-50 text-pink-800 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Update Property</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    label="Property Name"
                    placeholder="Enter the property name"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    required
                />
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
                <Input
                    type="text"
                    label="Location"
                    placeholder="Enter the property location"
                    value={formData.location}
                    name="location"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="number"
                    label="Price per Night ($)"
                    placeholder="Enter the price per night"
                    value={formData.price_per_night}
                    name="price_per_night"
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    label="Images (Comma-Separated URLs)"
                    placeholder="Enter image URLs separated by commas"
                    value={formData.images}
                    name="images"
                    onChange={handleChange}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="text-center">
                    <Btn type="submit" variant="primary" disabled={loading}>
                        {loading ? "Updating Property..." : "Update Property"}
                    </Btn>
                </div>
            </form>
        </div>
    );
}