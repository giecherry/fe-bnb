"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPropertyById } from "../../api/properties";
import { fetchUserRole } from "../../api/auth"; 
import BookingForm from "../../../components/BookingForm";
import Btn from "../../../components/Btn";
import Link from "next/link";

export default function PropertyDetailPage() {
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

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
            } catch (err: unknown) {
                console.error("Failed to fetch property details:", err);
                setError("Something went wrong. Please try again.");
            }
        };

        const fetchUserDetails = async () => {
            try {
                const userRole = await fetchUserRole();
                setRole(userRole);

                // Decode the token to get the user ID
                const token = sessionStorage.getItem("token");
                if (token) {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    setUserId(payload.sub);
                }
            } catch (err) {
                console.error("Failed to fetch user role:", err);
            }
        };

        fetchProperty();
        fetchUserDetails();
    }, [params.id]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!property) return <p>Loading...</p>;

    // Check if the user is authorized to update the property
    const canUpdateProperty = role === "admin" || (role === "host" && property.user_id === userId);

    // Main image and thumbnails
    const mainImage = property.images ? property.images[0] : null;
    const otherImages = property.images ? property.images.slice(1) : [];

    return (
        <div className="container mx-auto p-6 relative">
            <h1 className="text-3xl font-bold text-pink-800 mb-6">{property.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Images Section */}
                <div>
                    {/* Main Image */}
                    {mainImage && (
                        <img
                            src={mainImage}
                            alt={`${property.name} main image`}
                            className="w-full h-96 object-cover rounded-md shadow-md mb-4"
                            onClick={() => setSelectedImage(mainImage)} // Open modal
                        />
                    )}

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-4">
                        {otherImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${property.name} image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md shadow-md cursor-pointer"
                                onClick={() => setSelectedImage(image)} // Open modal
                            />
                        ))}
                    </div>
                </div>

                {/* Property Details and Booking Form */}
                <div className="flex flex-col justify-between w-full md:w-[90%] mx-auto">
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700">{property.description}</p>
                        <p className="text-lg text-gray-700">Location: {property.location}</p>
                        <p className="text-lg text-gray-700">Price per night: ${property.price_per_night}</p>
                    </div>
                    <div className="mt-6">
                        <BookingForm propertyId={property.id} pricePerNight={property.price_per_night} />
                    </div>
                </div>
            </div>

            {/* Update Property Button */}
            {canUpdateProperty && (
                <div className="mt-6">
                    <Link href={`/properties/${property.id}/update`}>
                        <Btn variant="primary">
                            Update Property
                        </Btn>
                    </Link>
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-[#ffffff37] backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)} // Close modal on background click
                >
                    <div className="relative">
                        <button
                            className="absolute top-2 right-2 text-black text-2xl"
                            onClick={() => setSelectedImage(null)} // Close modal
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Expanded view"
                            className="max-w-3xl max-h-[80vh] rounded-md shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}