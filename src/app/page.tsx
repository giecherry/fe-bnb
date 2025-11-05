"use client";
import Link from "next/link";
import { getAllProperties } from "../app/api/properties";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await getAllProperties();
        const shuffled = properties.sort(() => 0.5 - Math.random());
        setFeaturedProperties(shuffled.slice(0, 8)); // Display 8 properties for a 4x8 grid
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Millie Doe",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Maria",
      text: "This was the best vacation rental experience I've ever had!",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Jane",
      text: "The property was stunning and the service was excellent!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Alice",
      text: "Highly recommend Hembnb for your next getaway!",
    },
    {
      id: 4,
      name: "Emily Davis",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Emily",
      text: "A wonderful stay with all the comforts of home!",
    },
    {
      id: 5,
      name: "Sophia Brown",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Sofie",
      text: "Beautiful location and fantastic amenities!",
    },
    {
      id: 6,
      name: "Olivia Wilson",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Marta",
      text: "The host was incredibly accommodating and friendly!",
    },
    {
      id: 7,
      name: "Ava Martinez",
      profilePic: "https://avatar.iran.liara.run/public/girl?username=Ava",
      text: "I felt right at home from the moment I arrived.",
    },
  ];

  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 bg-pink-50">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hembnb</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover and book unique homestays around the world.
        </p>

        {/* Featured Properties Section */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {loading ? (
            <Loading message="Fetching properties..." />
          ) : (
            <div className="grid grid-cols-8 gap-4 py-4 group relative">
              {featuredProperties
                .flatMap((property) => property.images)
                .slice(0, 32)
                .map((image, index) => (
                  <Link
                    key={index}
                    href={`/properties/${featuredProperties[Math.floor(index / featuredProperties.length)].id}`}
                  >
                    <div className="relative bg-white shadow-lg cursor-pointer transition-transform duration-200 rounded-lg hover:scale-125 overflow-visible hover:z-10">
                      <img
                        src={image || "https://placehold.co/600x400"}
                        alt={`Property Image ${index + 1}`}
                        className="w-full h-32 object-cover group-hover:blur-[1px] hover:blur-none rounded-lg"
                      />
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <section className="w-full bg-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Guests Say
          </h2>
          <div className="flex justify-between gap-4 px-4">
            {testimonials
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col items-center bg-[#ffcedc9b] p-6 rounded-lg shadow-md w-full"
                >
                  <img
                    src={testimonial.profilePic}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4 border-4 border-white"
                  />
                  <h3 className="font-semibold text-lg text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-center">{testimonial.text}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
