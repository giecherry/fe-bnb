import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../app/api/bookings";
import { getToken } from "../utils/auth";

interface BookingFormProps {
    propertyId: string;
    pricePerNight: number;
}

export default function BookingForm({ propertyId, pricePerNight }: BookingFormProps) {
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const calculateTotalPrice = () => {
        if (!checkInDate || !checkOutDate) return 0;
        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) return 0;
        const diffInTime = checkOutDate.getTime() - checkInDate.getTime();
        if (diffInTime <= 0) return 0; 
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        return diffInDays * pricePerNight;
    };

    // Dynamic validation using useEffect
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!checkInDate || !checkOutDate) {
            setError(null);
            return;
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);

        if (checkIn < today) {
            setError("Check-in date cannot be in the past.");
            return;
        }

        if (checkOut < today) {
            setError("Check-out date cannot be in the past.");
            return;
        }

        if (checkIn >= checkOut) {
            setError("Check-in date cannot be later than or equal to the check-out date.");
            return;
        }

        setError(null);
    }, [checkInDate, checkOutDate]); 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationErrors([]);

        if (error) return;

        try {
            const token = getToken();
            if (!token) {
                setError("You must be logged in to make a booking.");
                return;
            }

            const requestData = {
                property_id: propertyId,
                check_in_date: checkInDate
                    ? `${checkInDate.getFullYear()}-${String(checkInDate.getMonth() + 1).padStart(2, "0")}-${String(checkInDate.getDate()).padStart(2, "0")}`
                    : "",
                check_out_date: checkOutDate
                    ? `${checkOutDate.getFullYear()}-${String(checkOutDate.getMonth() + 1).padStart(2, "0")}-${String(checkOutDate.getDate()).padStart(2, "0")}`
                    : "",
            };

            const response = await createBooking(requestData);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend Error:", errorData);

                if (errorData.errors) {
                    const fieldErrors = errorData.errors.map((err: ValidationError) => err.message);
                    setValidationErrors(fieldErrors);
                } else if (errorData.error) {
                    setError(errorData.error);
                } else {
                    setError("Something went wrong. Please try again.");
                }
                return;
            }
            setCheckInDate(null);
            setCheckOutDate(null);
            alert("Thanks for booking! You will receive an email confirmation shortly.");
        } catch (err: unknown) {
            console.error("Unexpected Error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full">
                <label className="block text-sm font-medium text-pink-800 mb-2">Check-in Date</label>
                <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    className="border border-[#ffcedc] rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff8faf] focus:border-[#ff8faf] hover:border-[#ff8faf] transition-all"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    required
                    minDate={new Date()} // Restrict past dates
                />
            </div>
            <div className="w-full">
                <label className="block text-sm font-medium text-pink-800 mb-2">Check-out Date</label>
                <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    className="border border-[#ffcedc] rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#ff8faf] focus:border-[#ff8faf] hover:border-[#ff8faf] transition-all"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    required
                    minDate={new Date()} // Restrict past dates
                />
            </div>
            <div className="w-full">
                <p className="text-lg text-gray-700">
                    Total Price: <span className="font-bold">${calculateTotalPrice()}</span>
                </p>
            </div>
            {validationErrors.length > 0 && (
                <div className="text-pink-800 text-sm space-y-1">
                    {validationErrors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="bg-[#ff8faf] text-white px-4 py-3 w-full rounded-md hover:bg-[#ffcedc] transition-all font-medium"
            >
                Book Now
            </button>
        </form>
    );
}