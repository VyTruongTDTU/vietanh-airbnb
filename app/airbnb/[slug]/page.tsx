"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// Update the import path below to the correct relative path if needed
import BookingModal from "../../components/BookingModal";

type Host = {
  name: string;
  avatar: string;
  response_time: string;
};

type Booking = {
  airbnb_link: string;
  phone: string;
  facebook: string;
};

type Location = {
  street: string;
  district: string;
  city: string;
  country: string;
};

type Listing = {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  description: string;
  price: number;
  location: Location;
  amenities: string[];
  host: Host;
  booking: Booking;
};

interface PageProps {
  params: { slug?: string } | Promise<{ slug?: string }>;
}

async function fetchListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/listings/slug/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    return (await res.json()) as Listing;
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}

export default function ListingPage({ params }: PageProps) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      const slug = resolvedParams.slug;
      if (!slug) {
        notFound();
        return;
      }
      const fetched = await fetchListingBySlug(slug);
      if (!fetched) {
        notFound();
        return;
      }
      setListing(fetched);
    })();
  }, [params]);

  if (!listing) return null;

  const {
    name,
    location,
    images,
    description,
    amenities,
    host,
    booking,
    price,
  } = listing;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <Link
        href="/airbnb"
        className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Quay lại danh sách Airbnb
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{name}</h1>
      <p className="text-gray-600 mb-6">
        {location.street}, {location.district}, {location.city},{" "}
        {location.country}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="relative h-96 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
          <Image
            src={images?.[0] || "/images/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((img, idx) => (
            <div
              key={idx}
              className="relative h-44 overflow-hidden rounded-xl border"
            >
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              About this place
            </h2>
            <p className="text-gray-600">{description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Amenities
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-gray-700">
              {amenities.map((item, idx) => (
                <li key={idx}>✓ {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Host</h2>
            <div className="flex items-center">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border">
                <Image
                  src={host.avatar}
                  alt={host.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{host.name}</h3>
                <p className="text-gray-600">
                  Response time: {host.response_time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-8">
            <div className="mb-4 text-xl font-bold text-black">
              {price.toLocaleString("vi-VN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              VND{" "}
              <span className="text-sm text-gray-500">/ 1 đêm</span>
            </div>

            <div className="space-y-4">
              <a
                href={booking?.airbnb_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#FF5A5F] text-white text-center py-3 rounded-md hover:bg-[#FF385F] transition-all"
              >
                Book on Airbnb
              </a>

              <a
                href={`tel:${booking?.phone || ""}`}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-md hover:bg-green-700 transition-all"
              >
                Call Host
              </a>

              <a
                href={booking?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-all"
              >
                Message on Facebook
              </a>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 transition-all"
              >
                Đặt phòng trực tiếp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        pricePerNight={price}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        name={listing.name}
        listingId={listing._id}
      />
    </div>
  );
}
