import Link from "next/link";
import Btn from "./Btn";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

    return (
        <div className="rounded-lg py-4">
            {/* Display the first image */}
            {property.images && property.images.length > 0 && (
                <img
                    src={property.images[0]}
                    alt={`${property.name} image`}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")} 
                />
            )}
            <h2 className="text-lg font-bold text-[#000000]">{property.name}</h2>
            <p className="text-gray-600">{property.description}</p>
            <p className="text-gray-600">{property.location}</p>

            {/* Price and Rating Row */}
            <div className="flex items-center justify-between mt-2">
                <p className="text-gray-900 font-semibold">{property.price_per_night}$/night</p>
                <div className="flex items-center">
                    <span className="text-yellow-400 material-symbols-outlined">star</span>
                    <span className="ml-1 text-gray-700">{rating}</span>
                </div>
            </div>

            <Link href={`/properties/${property.id}`}>
                <Btn className="mt-4 bg-[#ff8faf] text-white px-4 py-2 rounded-md">
                    Book
                </Btn>
            </Link>
        </div>
    );
}