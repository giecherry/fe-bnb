"use client";

import Btn from "../../components/Btn";

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-pink-50 text-pink-800 rounded-lg">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

            {/* Users Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Btn variant="primary" className="shadow-md">View All Users</Btn>
                    <Btn variant="primary" className="shadow-md">Get User by ID</Btn>
                    <Btn variant="primary" className="shadow-md">Manage Users</Btn>
                    <Btn variant="primary" className="shadow-md">Manage Admins</Btn>
                </div>
            </div>

            {/* Properties Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Btn variant="primary" className="shadow-md">View All Properties</Btn>
                    <Btn variant="primary" className="shadow-md">Get Property by ID</Btn>
                    <Btn variant="primary" className="shadow-md">View Properties by Availability</Btn>
                    <Btn variant="primary" className="shadow-md">View Properties per Host</Btn>
                </div>
            </div>

            {/* Bookings Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Btn variant="primary" className="shadow-md">View All Bookings</Btn>
                    <Btn variant="primary" className="shadow-md">Get Booking by ID</Btn>
                </div>
            </div>
        </div>
    );
}