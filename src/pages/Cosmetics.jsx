import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";

import AboutImg from "../assets/img/images-cosmatics.webp";
import { Link } from "react-router-dom";

// Import required icons
import {
  FaRegSmile,
  FaEye,
  FaKissWinkHeart,
  FaSpa,
  FaPaintBrush,
  FaSprayCan,
  FaSun,
  FaTint,
  FaHandSparkles,
} from "react-icons/fa";

export default function Cosmetics() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("cosmetics/"); // /api/cosmetics/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching cosmetics data:", err);
        setError("Failed to load cosmetics page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {/* Hero Banner Section with Fixed Background */}
      <div
        className="relative h-[60vh] w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29zbWV0aWN8ZW58MHx8MHx8fDA%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1
              className="text-5xl md:text-7xl font-bold mb-2 text-white"
            >
              Cosmetics
            </h1>
            <p
              className="text-xl md:text-2xl max-w-3xl mb-6 text-gray-300"
            >
              Where Beauty Meets Excellence - Professional Services Since 2002
            </p>
            <div
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/products"
                className="px-8 py-3 border border-white rounded-full font-semibold hover:bg-white hover:text-black transform hover:-translate-y-1 transition-all"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-32 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE FIRST ON MOBILE */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square  overflow-hidden">
                <img
                  src={AboutImg}
                  alt="About our brand"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* TEXT SECOND ON MOBILE */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-thin mb-8 tracking-wide">
                About Our Brand
              </h2>
              <div className="w-24 h-px bg-black mb-8"></div>
              <p className="text-lg leading-relaxed mb-6 text-gray-700 text-justify">
                For over two decades, we have been at the forefront of beauty
                innovation, crafting products that enhance natural beauty while
                maintaining the highest standards of quality and luxury.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 mb-8 text-justify">
                Our commitment to excellence drives us to source the finest
                ingredients and work with renowned beauty experts to create
                products that deliver exceptional results.
              </p>
              <Link
                to="/products"
                className="bg-black text-white px-6 py-3 font-semibold hover:bg-white hover:text-black hover:border transition-colors"
              >
                View Products
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-32 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-thin mb-8 tracking-wide">
            Embrace Your Beauty
          </h2>
          <div className="w-32 h-px bg-white mx-auto mb-12"></div>
          <p className="text-xl font-light mb-12 opacity-80 leading-relaxed">
            Transform your daily routine with our premium collection of beauty
            essentials
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/products"
              className="border border-white px-12 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              PRODUCTS
            </Link>
            <a
              href="/salons"
              className="bg-white text-black px-12 py-4 text-sm tracking-widest hover:bg-gray-100 transition-all duration-300"
            >
              Salon
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
