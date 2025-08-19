"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Sliders } from "lucide-react";

type Listing = {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  location: {
    street: string;
    district: string;
    city: string;
    country: string;
  };
  rating: number;
  reviews: any[];
  type?: string;
};

const propertyTypes = [
  { id: "all", name: "Tất cả" },
  { id: "villa", name: "Biệt thự" },
  { id: "apartment", name: "Căn hộ" },
  { id: "penthouse", name: "Penthouse" },
  { id: "home", name: "Nhà riêng" },
];

const locations = [
  { id: "all", name: "Tất cả" },
  { id: "danang", name: "Đà Nẵng" },
  { id: "hochiminh", name: "TP. Hồ Chí Minh" },
  { id: "phuquoc", name: "Phú Quốc" },
  { id: "nhatrang", name: "Nha Trang" },
  { id: "dalat", name: "Đà Lạt" },
  { id: "hoian", name: "Hội An" },
];

export default function AirbnbPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
        <Image
          src="/images/airbnb/hero-image.jpg"
          alt="Luxury Airbnb Properties"
          width={1400}
          height={500}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6">
          <h1 className="text-5xl font-bold mb-6 text-center" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            Airbnb Luxury Collection
          </h1>
          <p className="text-xl max-w-2xl text-center mb-8" style={{ textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}>
            Khám phá những địa điểm nghỉ dưỡng tuyệt vời tại Việt Nam với dịch vụ đẳng cấp 5 sao.
          </p>
          <div className="bg-white rounded-full p-2 flex items-center w-full max-w-xl" style={{ boxShadow: "0 5px 20px rgba(0,0,0,0.2)" }}>
            <Search className="text-gray-400 ml-2 mr-2" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm, loại hình nhà ở..."
              className="flex-grow bg-transparent border-none focus:outline-none text-gray-800 py-2 px-2"
            />
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition-all">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl font-bold mb-4 md:mb-0 text-gray-900">Danh sách bất động sản</h2>
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
            <Sliders size={18} />
            <span>Bộ lọc</span>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Loại bất động sản</h3>
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((type) => (
              <button key={type.id} className="px-4 py-2 rounded-full border border-gray-300 hover:border-black hover:bg-gray-50">
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Địa điểm</h3>
          <div className="flex flex-wrap gap-3">
            {locations.map((location) => (
              <button key={location.id} className="px-4 py-2 rounded-full border border-gray-300 hover:border-black hover:bg-gray-50">
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <Link href={`/airbnb/${listing.slug}`} key={listing._id} className="group">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full">
                <Image
                  src={listing.images?.[0] || "/images/placeholder.jpg"}
                  alt={listing.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                  {listing.type || "Loại khác"}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-black">{listing.name}</h3>
                  <div className="flex items-center">
                    <Star className="text-black w-5 h-5 mr-1" />
                    <span>{listing.rating || 0}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <p>{listing.location.city}, {listing.location.country}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-900 font-semibold">
                    {listing.price.toLocaleString()} VND
                    <span className="text-gray-600 font-normal">/đêm</span>
                  </p>
                  <p className="text-gray-500 text-sm">{listing.reviews?.length || 0} đánh giá</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Bạn muốn đăng ký bất động sản của mình?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ đăng ký bất động sản của bạn lên nền tảng Airbnb.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium"
        >
          Liên hệ ngay
        </Link>
      </div>
    </div>
  );
}
