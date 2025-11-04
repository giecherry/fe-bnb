"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProperties } from "../api/properties";
import { getToken } from "../../utils/auth";
import Btn from "../../components/Btn"; 

export default function HostDashboard() {
    const [properties, setProperties] = useState<Property[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHostProperties = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = getToken();
                if (!token) {
                    throw new Error("Unauthorized: No token provided.");
                }

                const payload = JSON.parse(atob(token.split(".")[1]));
                const userId = payload.sub;

                const allProperties = await getAllProperties();
                const hostProperties = allProperties.filter(
                    (property) => property.user_id === userId
                );
                        console.log(allProperties);

                setProperties(hostProperties);
            } catch (err: unknown) {
                console.error("Failed to fetch properties:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHostProperties();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-pink-50 text-pink-800 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Your Properties</h1>
                <Link href="/host/add-property">
                    <Btn variant="primary">Add Property</Btn>
                </Link>
            </div>

            {loading && (
                <p className="text-center text-lg text-gray-600">Loading your properties...</p>
            )}

            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (!properties || properties.length === 0) && (
                <p className="text-center text-lg text-gray-600">You have no properties.</p>
            )}

            {!loading && !error && properties && properties.length > 0 && (
                <ul className="space-y-8">
                    {properties.map((property) => (
                        <li
                            key={property.id}
                            className="border border-gray-200 p-6 rounded-lg shadow-md bg-white"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Property Image */}
                                <div className="flex-shrink-0">
                                    <Link href={`/properties/${property.id}`}>
                                        <img
                                            src={property.images?.[0] ?? "/placeholder-image.jpg"}
                                            alt={property.name}
                                            className="w-full md:w-64 h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                        />
                                    </Link>
                                </div>

                                {/* Property Details */}
                                <div className="flex-1">
                                    <Link href={`/properties/${property.id}`}>
                                        <h2 className="text-2xl font-semibold mb-2 text-pink-700 hover:underline cursor-pointer">
                                            {property.name}
                                        </h2>
                                    </Link>
                                    <p className="text-gray-600 mb-4">{property.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p>
                                                <strong>Price per Night:</strong> ${property.price_per_night}
                                            </p>
                                            <p>
                                                <strong>Created At:</strong>{" "}
                                                {new Date(property.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Location:</strong> {property.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}