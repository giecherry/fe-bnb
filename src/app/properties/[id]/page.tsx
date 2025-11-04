"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById, deleteProperty } from "../../api/properties";
import { fetchUserRole } from "../../api/auth";
import BookingForm from "../../../components/BookingForm";
import Btn from "../../../components/Btn";
import Link from "next/link";
import { toast } from "react-toastify";

export default function PropertyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const canUpdateOrDeleteProperty = role === "admin" || (role === "host" && property.user_id === userId);

    const mainImage = property.images ? property.images[0] : null;
    const otherImages = property.images ? property.images.slice(1) : [];

    const handleDeleteProperty = async () => {
        if (!property) return;

        toast(
            ({ closeToast }) => (
                <div className="flex flex-col items-center space-y-4 p-4">
                    <p className="text-lg font-semibold text-[#ff4d6d]">
                        Are you sure you want to delete this property?
                    </p>
                    <div className="flex space-x-4">
                        {/* Confirm Button */}
                        <button
                            className="px-6 py-2 bg-[#ff8faf] text-white rounded-md hover:bg-[#ffcedc] focus:ring-2 focus:ring-[#ffcedc]"
                            onClick={async () => {
                                closeToast(); 
                                setIsDeleting(true);
                                try {
                                    console.log(`Deleting property with ID: ${property.id}`);
                                    await deleteProperty(property.id); 
                                    toast.success("Property deleted successfully!", {
                                        className: "bg-[#ffcedc] text-[#ff4d6d]",
                                    });
                                    router.push("/properties");
                                } catch (err) {
                                    console.error("Failed to delete property:", err);
                                    toast.error("Failed to delete property. Please try again.", {
                                        className: "bg-[#ffcedc] text-[#ff4d6d]",
                                    });
                                } finally {
                                    setIsDeleting(false);
                                }
                            }}
                        >
                            Confirm
                        </button>
                        {/* Cancel Button */}
                        <button
                            className="px-6 py-2 border border-[#ff8faf] text-[#ff8faf] rounded-md hover:bg-[#ffcedc] hover:text-black focus:ring-2 focus:ring-[#ff8faf]"
                            onClick={() => closeToast()} 
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false, 
                closeOnClick: false, 
                draggable: false, 
                position: "top-center", 
                className: "bg-white shadow-lg rounded-lg p-6 border border-[#ffcedc]"
            }
        );
    };

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
                    {!canUpdateOrDeleteProperty && (
                        <div className="mt-6">
                            <BookingForm propertyId={property.id} pricePerNight={property.price_per_night} />
                        </div>
                    )}
                </div>
            </div>

            {/* Update and Delete Buttons */}
            {canUpdateOrDeleteProperty && (
                <div className="mt-6 flex space-x-4">
                    <Link href={`/properties/${property.id}/update`}>
                        <Btn variant="primary">
                            Update Property
                        </Btn>
                    </Link>
                    <Btn
                        variant="danger"
                        onClick={handleDeleteProperty}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Property"}
                    </Btn>
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