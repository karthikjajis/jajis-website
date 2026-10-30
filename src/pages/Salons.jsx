import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { Building } from "lucide-react";

import {
  FaMapMarkerAlt,
  FaCut,
  FaSpa,
  FaPalette,
  FaUsers,
  FaAward,
  FaStar,
  FaClock,
  FaPhone,
  FaCalendarAlt,
  FaHeart,
  FaUserFriends,
  FaCertificate,
  FaGift,
  FaArrowRight,
} from "react-icons/fa";

import BgImage from "../assets/img/saloon-2.webp";
import aboutbg from "../assets/img/saloon-3.webp";
import about from "../assets/img/saloon-1.webp";
import premiumbg from "../assets/img/saloon-7.webp";
import premium from "../assets/img/saloon-4.webp";
import last from "../assets/img/saloon-8.webp";

export default function Salons() {
  const [data, setData] = useState({ page: "", banner_image: "", data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: <FaCut className="text-4xl" />,
      title: "Hair Styling",
      description:
        "Professional cuts, colors, and treatments by expert stylists",
      features: [
        "Precision Cuts",
        "Color Correction",
        "Hair Treatments",
        "Styling",
      ],
    },
    {
      icon: <FaSpa className="text-4xl" />,
      title: "Spa & Wellness",
      description: "Relaxing treatments for complete rejuvenation",
      features: [
        "Facial Treatments",
        "Hair Spa",
        "Pedicure & Manicure",
        "Skin Care",
      ],
    },
    {
      icon: <FaPalette className="text-4xl" />,
      title: "Beauty Services",
      description: "Complete makeover services for special occasions",
      features: [
        "Bridal Makeup",
        "Party Makeup",
        "Nail Art",
        "Eyebrow Threading",
      ],
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Unisex Services",
      description: "Professional grooming services for everyone",
      features: [
        "Men's Grooming",
        "Women's Styling",
        "Couple Packages",
        "Family Deals",
      ],
    },
  ];

  const achievements = [
    {
      icon: <FaAward className="text-3xl text-white" />,
      title: "International Recognition",
      description: "Award-winning team at CMC Russia-Ural Championship",
    },
    {
      icon: <FaCertificate className="text-3xl text-white" />,
      title: "Certified Professionals",
      description: "Internationally trained and certified beauticians",
    },
    {
      icon: <FaUsers className="text-3xl text-white" />,
      title: "50,000+ Happy Clients",
      description: "Trusted by thousands across Kerala since 2011",
    },
    {
      icon: <FaHeart className="text-3xl text-white" />,
      title: "13+ Years of Excellence",
      description: "Consistently delivering quality beauty services",
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaCertificate />,
      title: "Expert Professionals",
    },
    {
      icon: <FaSpa />,
      title: "Premium Products",
    },
    {
      icon: <FaHeart />,
      title: "Personalized Care",
    },
    {
      icon: <FaAward />,
      title: "Best Service",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("salons/"); // /api/salons/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching salons data:", err);
        setError("Failed to load salons page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

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
    <div className="min-h-screen text-white">
      {/* Hero Banner Section */}
      <div
        className="relative h-[100vh] w-full bg-fixed bg-cover bg-top"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white">
              {data.page || "Jaji's Innovation Salons"}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-6 text-gray-300">
              Where Beauty Meets Excellence - Professional Services Since 2011
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-white mb-2">9</div>
              <div className="text-gray-400">Salon Locations</div>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">Beauty Services</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Enhanced */}
      <div
        className="relative bg-fixed bg-cover bg-center py-16 px-6"
        style={{
          backgroundImage: `url(${aboutbg})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            About Jaji's Innovation
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={about}
                alt="Dr. K Jajimole - Founder"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Dr. K Jajimole - Founder
              </h3>
              <p className="text-gray-300 leading-relaxed text-justify">
                Welcome to Jaji's Innovation – a name synonymous with beauty,
                creativity, and excellence. Founded in December 2011 by the
                visionary Dr. K Jajimole, our brand has been redefining the
                standards of beauty and wellness across Kerala.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify">
                Dr. Jajimole's journey began with a passion for bringing
                world-class beauty services to Kerala. Her extensive education
                in beauty therapy from renowned international institutions has
                made her one of the most scientifically educated figures in the
                beauty industry.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-black/70 p-4 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-white">{achievement.icon}</div>
                      <h4 className="font-semibold text-white">
                        {achievement.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="pt-8 bg-black">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">
          Why Choose Jaji's Innovation?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all py-6"
            >
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:shadow-lg">
                {item.icon}
              </div>
              <h4 className="font-bold mb-3 text-white">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Services Showcase Section */}
      <div
        className="relative bg-fixed bg-cover bg-center py-16"
        style={{
          backgroundImage: `url(${premiumbg})`,
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Our Premium Services
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - services list */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                    activeService === index
                      ? "bg-white text-black shadow-2xl"
                      : "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`p-3 rounded-full ${
                        activeService === index
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p
                    className={`mb-4 ${
                      activeService === index
                        ? "text-gray-700"
                        : "text-gray-300"
                    }`}
                  >
                    {service.description}
                  </p>
                  {activeService === index && (
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FaStar className="text-gray-600 text-sm" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side - image */}
            <div className="relative">
              <img
                src={premium}
                alt="Beauty Services"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Salons Section - Enhanced */}
      <div
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-top bg-center"
        style={{ backgroundImage: `url(${last})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Salon Locations</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Visit any of our premium locations across Kerala for an
              unforgettable beauty experience
            </p>
          </div>

          {data.data.length === 0 ? (
            <div className="text-center">
              <Building className="w-20 h-20 mx-auto text-white" />

              <p className="text-xl text-gray-300">
                New locations coming soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data.data.map((salon) => (
                <Link
                  to={`/salons/${salon.id}`}
                  key={salon.id}
                  className="group transform hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-3xl transition-all duration-500">
                    <div className="relative">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gray-300 transition-colors">
                        {salon.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-white text-sm" />
                          <span className="text-white text-sm">
                            {salon.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all">
                          <span className="text-white font-medium">
                            Details
                          </span>
                          <FaArrowRight className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-white text-black py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Beauty Transformation?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Book your appointment today and experience the Jaji's Innovation
            difference
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <FaPhone />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
