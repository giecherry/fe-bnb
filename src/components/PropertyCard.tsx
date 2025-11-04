import Link from "next/link";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="border border-[#ffcedc] rounded-lg p-4 shadow-md">
            {/* Display the first image */}
            {property.images && property.images.length > 0 && (
                <img
                    src={property.images[0]}
                    alt={`${property.name} image`}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />
            )}
            <h2 className="text-lg font-bold text-pink-800">{property.name}</h2>
            <p className="text-gray-700">{property.location}</p>
            <p className="text-gray-700">Price: ${property.price_per_night}/night</p>
            <Link href={`/properties/${property.id}`}>
                <button className="mt-4 bg-[#ff8faf] text-white px-4 py-2 rounded-md">
                    View Details
                </button>
            </Link>
        </div>
    );
}