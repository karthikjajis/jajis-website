import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Armchair,
  Clock,
  Wifi,
  Car,
  Snowflake,
  Package,
  ShieldCheck,
  Sun,
} from "lucide-react";

import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";

import { API } from "../config/api";

import food1 from "../assets/img/foodcourt-1.webp";
import food2 from "../assets/img/foodcourt-2.webp";
import food3 from "../assets/img/foodcourt-3.webp";

export default function FoodCourt() {
  const [menuData, setMenuData] = useState({ page: "", data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const amenities = [
    {
      title: "VIP SEATING",
      desc: "Exclusive private dining areas",
      icon: <Armchair className="w-10 h-10 mb-4" />,
    },
    {
      title: "FAST SERVICE",
      desc: "Quick order processing",
      icon: <Clock className="w-10 h-10 mb-4" />,
    },
    {
      title: "FREE WiFi",
      desc: "High-speed internet access",
      icon: <Wifi className="w-10 h-10 mb-4" />,
    },
    {
      title: "PARKING",
      desc: "Ample parking space available",
      icon: <Car className="w-10 h-10 mb-4" />,
    },
    {
      title: "AC DINING",
      desc: "Climate controlled comfort",
      icon: <Snowflake className="w-10 h-10 mb-4" />,
    },
    {
      title: "TAKEAWAY",
      desc: "Convenient pickup service",
      icon: <Package className="w-10 h-10 mb-4" />,
    },
    {
      title: "SANITIZED",
      desc: "Highest hygiene standards",
      icon: <ShieldCheck className="w-10 h-10 mb-4" />,
    },
    {
      title: "24/7 OPEN",
      desc: "Always here for you",
      icon: <Sun className="w-10 h-10 mb-4" />,
    },
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await API.get("food-court/"); // /api/food-court/
        const raw = res.data || {};
        const items = Array.isArray(raw.data) ? raw.data : [];

        const normalized = items.map((item) => {
          let image = item.image || "";
          // If backend returns relative path like "/media/...",
          // prefix with current origin so it works in production too.
          if (image.startsWith("/"))
            image = `${window.location.origin}${image}`;
          return { ...item, image };
        });

        setMenuData({ page: raw.page || "Food Menu", data: normalized });
      } catch (err) {
        console.error("Failed to fetch food menu:", err);
        setError("Could not load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const scrollMenu = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center border-b border-white"
        style={{
          backgroundImage: `url(${food1})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative text-center text-white px-6 max-w-4xl">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide leading-tight">
            FOOD COURT
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-light mb-6 opacity-90">
            "Where Culinary Dreams Come True"
          </p>

          {/* CTA Buttons */}

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Extra Info */}
        </div>
      </section>

      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${food2})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative">
              <img
                src={food3}
                alt="Jaji’s Food Court Interior"
                className="w-full h-[400px] md:h-[550px] object-cover shadow-2xl rounded-2xl transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 border-4 border-white -m-4 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Right: Text */}
            <div className="space-y-6 text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide border-b-4 border-white inline-block pb-2">
                ABOUT US
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-200 text-justify">
                Welcome to <span className="font-bold">Jaji’s Food Court</span>,
                Located inside the prestigious Ashramam Maidanam, Jaji’s Food
                Court is a vibrant open-air dining destination in the heart of
                Kollam. Serving delicious South Indian dishes, Chinese
                favorites, fresh juices, and more, it’s the perfect spot for
                families, tourists, and evening visitors.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-200 text-justify">
                Our signature Q Chai Tea is also available online through Swiggy
                and Zomato, bringing the taste of Jaji’s straight to your
                doorstep.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-6">
                {[
                  { value: "15+", label: "RESTAURANTS" },
                  { value: "500+", label: "DAILY VISITORS" },
                  { value: "50+", label: "MENU ITEMS" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center border border-white/40 rounded-xl p-4"
                  >
                    <div className="text-3xl font-bold">{item.value}</div>
                    <div className="text-sm tracking-wider text-gray-300">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call-to-action */}
              <a
                href="#menu"
                className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-xl shadow-lg transition-all hover:bg-gray-200"
              >
                EXPLORE MENU
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="relative min-h-screen py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              {menuData.page}
            </h2>
            <div className="w-32 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl text-gray-200">
              Exquisite dining experience awaits you
            </p>
          </div>

          {/* Scrollable Menu */}
          <div className="relative">
            <button
              onClick={() => scrollMenu("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-black p-3 rounded-full hover:bg-gray-200 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            >
              {menuData.data.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-80 bg-white text-black group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/320x320?text=No+Image")
                      }
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all"></div>
                  </div>
                  <div className="p-6 ">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold">₹{item.price}</span>
                      <a
                        href="tel:"
                        className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                      >
                        ORDER
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollMenu("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white text-black p-3 rounded-full hover:bg-gray-200 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section
        className="relative min-h-screen py-24"
        style={{
          backgroundImage: `url(${food2})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-5xl font-extrabold text-white tracking-wide">
              PREMIUM AMENITIES
            </h2>
            <div className="mt-4 w-32 h-1 mx-auto bg-white"></div>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              A curated selection of world-class amenities designed to elevate
              your lifestyle.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="group relative border border-white/20 bg-white/5 backdrop-blur-lg 
                     rounded-2xl p-10 text-center shadow-lg 
                     transition-all duration-500 hover:-translate-y-3 
                     hover:bg-white hover:text-black"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6 text-5xl text-white group-hover:text-black transition-colors duration-300">
                  {amenity.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white group-hover:text-black mb-3">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 group-hover:text-gray-700 leading-relaxed">
                  {amenity.desc}
                </p>

                {/* White border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/40 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-wider">
          VISIT US TODAY
        </h2>

        <Link
          to="/contact"
          className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
