"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserBookings } from "../api/bookings";
import { getToken } from "../../utils/auth";

export default function UserPage() {
    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = getToken();
                if (!token) {
                    return;
                }

                const payload = JSON.parse(atob(token.split(".")[1]));
                const userId = payload.sub;

                const data = await getUserBookings(userId);
                setBookings(data);
            } catch (err: unknown) {
                console.error("Failed to fetch bookings:", err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading your profile...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!bookings || bookings.length === 0) {
        return <p className="text-center text-lg text-gray-600">You have no bookings.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-pink-50 text-pink-800 rounded-lg">
            {/* User Profile Section */}
            <section className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-center">Your Profile</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg">
                        <strong>Name:</strong> {bookings[0].user.name}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {bookings[0].user.email}
                    </p>
                    <p className="text-lg">
                        <strong>Role:</strong> {bookings[0].user.role}
                    </p>
                    <p className="text-lg">
                        <strong>Account Created:</strong>{" "}
                        {new Date(bookings[0].user.created_at).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Bookings Section */}
            <section>
                <h1 className="text-4xl font-bold mb-6 text-center">Your Bookings</h1>
                <ul className="space-y-8">
                    {bookings.map((booking) => (
                        <li
                            key={booking.id}
                            className="border border-gray-200 p-6 rounded-lg shadow-md bg-white"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Property Image */}
                                <div className="flex-shrink-0">
                                    <Link href={`/properties/${booking.property.id}`}>
                                        <img
                                            src={
                                                booking.property.images?.[0] ??
                                                "/placeholder-image.jpg"
                                            }
                                            alt={booking.property.name}
                                            className="w-full md:w-64 h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                                        />
                                    </Link>
                                </div>

                                {/* Booking Details */}
                                <div className="flex-1">
                                    <Link href={`/properties/${booking.property.id}`}>
                                        <h2 className="text-2xl font-semibold mb-2 text-pink-700 hover:underline cursor-pointer">
                                            {booking.property.name}
                                        </h2>
                                    </Link>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p>
                                                <strong>Check-in:</strong>{" "}
                                                {new Date(
                                                    booking.check_in_date
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Check-out:</strong>{" "}
                                                {new Date(
                                                    booking.check_out_date
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Total Price:</strong> $
                                                {booking.total_price}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <strong>Price per Night:</strong> $
                                                {booking.property.price_per_night}
                                            </p>
                                            <p>
                                                <strong>Booking Created:</strong>{" "}
                                                {new Date(
                                                    booking.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}