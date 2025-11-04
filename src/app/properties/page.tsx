"use client";

import { useEffect, useState } from "react";
import { getAllProperties } from "../api/properties";
import PropertyCard from "../../components/PropertyCard";

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllProperties();
                const availableProperties = data.filter((property) => property.availability === true);
                setProperties(availableProperties);
            } catch (err: any) {
                setError(err.message || "Failed to fetch properties");
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-pink-800 mb-6">Available Properties</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}
