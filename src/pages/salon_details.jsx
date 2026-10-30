import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";
import { API } from "../config/api";

export default function SalonDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`salons/${id}/`); // /api/salons/<id>/
        setData(response.data.data); // Access the data property from response
      } catch (err) {
        console.error("Error fetching salon details:", err);
        setError("Failed to load salon details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (!data) return null;

  // Collect all available images and create full URLs
  const images = [
    data.image,
    data.image1,
    data.image2,
    data.image3,
    data.image4,
    data.image5,
    data.image6,
  ].filter(Boolean); // Remove null/undefined values

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Main Image */}
      <div className="relative h-[85vh] w-full">
        <img
          src={images[activeImage]}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {data.name}
          </h1>
          <div className="flex items-center justify-center text-gray-200 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{data.location}</span>
          </div>
          <a
            href="tel:"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-12">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative overflow-hidden rounded-lg aspect-square ${
                  activeImage === index
                    ? "ring-2 ring-purple-600"
                    : "ring-1 ring-white/20"
                }`}
              >
                <img
                  src={image}
                  alt={`${data.name} view ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">About This Location</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-justify">
            {data.description}
          </p>
        </div>

        {/* Google Maps Section */}
        {data.google_map_url && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 mb-12">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={data.google_map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${data.name} location`}
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Book Now Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your appointment today and treat yourself to excellence
          </p>
          <a
            href="tel:"
            className="bg-black text-white px-8 py-4 rounded-full font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
