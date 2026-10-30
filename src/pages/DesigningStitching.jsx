import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Scissors,
  Sparkles,
  Users,
  Palette,
  Ruler,
  Crown,
  PartyPopper,
  Shirt,
  Diamond,
  MessageSquare,
  PenTool,
  ShoppingBag,
} from "lucide-react";

import designbg from "../assets/img/design-3.webp";
import design1 from "../assets/img/design-2.webp";
import design2 from "../assets/img/design-1.webp";
import design3 from "../assets/img/design-5.webp";
import design4 from "../assets/img/design-4.webp";
import design5 from "../assets/img/design-6.webp";
import design6 from "../assets/img/design-7.webp";
import design7 from "../assets/img/design-8.webp";

import { API } from "../config/api";

export default function DesigningStitching() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("designing-stitching/"); // /api/designing-stitching/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching designing stitching data:", err);
        setError("Failed to load designing stitching page data");
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

  const services = [
    {
      title: "Custom Design",
      icon: Palette,
      description: "Personalized clothing designs tailored to your style",
      features: [
        "Personal Consultation",
        "Custom Sketching",
        "Color Palette Selection",
        "Fabric Consultation",
      ],
      image: design3,
    },
    {
      title: "Bridal Wear",
      icon: Crown,
      description: "Exquisite bridal collections for your special day",
      features: [
        "Designer Wedding Gowns",
        "Bridal Lehengas",
        "Custom Accessories",
        "Professional Alterations",
      ],
      image: design2,
    },
    {
      title: "Party Wear",
      icon: PartyPopper,
      description: "Elegant attire for every celebration",
      features: [
        "Evening Gowns",
        "Cocktail Dresses",
        "Designer Sarees",
        "Formal Suits",
      ],
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    },
    {
      title: "Casual Wear",
      icon: Shirt,
      description: "Comfortable and stylish everyday clothing",
      features: [
        "Designer Tops",
        "Casual Dresses",
        "Trendy Pants",
        "Contemporary Kurtas",
      ],
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    },
    {
      title: "Alterations",
      icon: Ruler,
      description: "Expert fitting and modification services",
      features: [
        "Precise Size Adjustments",
        "Professional Hemming",
        "Custom Darting",
        "Perfect Fitting",
      ],
      image:
        "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=800&q=80",
    },
    {
      title: "Embroidery",
      icon: Diamond,
      description: "Intricate hand and machine embroidery work",
      features: [
        "Traditional Zari Work",
        "Stone Embellishment",
        "Sequin Detailing",
        "Luxury Beading",
      ],
      image:
        "https://tse3.mm.bing.net/th/id/OIP.uuIo3PTitIrUVsSdszWbugHaJQ?pid=ImgDet&w=184&h=230&c=7&dpr=1.3&o=7&rm=3",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Consultation",
      description: "Discuss your vision and requirements with our designers",
      icon: MessageSquare,
    },
    {
      step: "2",
      title: "Design",
      description: "Create bespoke designs and select premium fabrics",
      icon: PenTool,
    },
    {
      step: "3",
      title: "Stitching",
      description: "Expert craftsmanship and meticulous finishing",
      icon: Scissors,
    },
    {
      step: "4",
      title: "Fitting",
      description: "Final fitting and precision adjustments",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Fixed Background */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-fixed bg-cover bg-top bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-beautiful-woman-sitting-in-trees-in-an-orange-lehenga-image_2943037.jpg')",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white tracking-tight">
            Designing & Stitching
          </h1>
          <p className="text-2xl md:text-3xl mb-6 text-gray-200 font-light">
            Where Elegance Meets Craftsmanship
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition-all"
            >
              View Services
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-24" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-black hover:bg-white border-2 rounded-xl border-black transition-all duration-500"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-50 transition-opacity duration-500">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 z-10">
                    <div className="mb-6">
                      <IconComponent className="w-12 h-12 text-white group-hover:text-black transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-black mb-3 transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-700 mb-6 transition-colors duration-500">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start text-sm"
                        >
                          <span className="text-white group-hover:text-black mr-3 mt-1 transition-colors duration-500">
                            ▪
                          </span>
                          <span className="text-gray-300 group-hover:text-gray-800 transition-colors duration-500">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Section with Fixed Background */}
      <div
        className="relative py-24 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-white group-hover:bg-black border-4 border-white rounded-full flex items-center justify-center text-black group-hover:text-white text-3xl font-bold mx-auto mb-4 transition-all duration-300 transform group-hover:scale-110">
                      {step.step}
                    </div>
                    <div className="flex justify-center">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                  {index < process.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-600"
                      style={{ transform: "translateX(50%)" }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the finest fabrics and materials for exceptional results
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Skilled designers and tailors with years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Bespoke Service
              </h3>
              <p className="text-gray-600">
                Personalized attention to every detail of your design
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action with Fixed Background */}
      <div
        className="relative py-32 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=80')",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Create Your Perfect Outfit?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Book a consultation and let us bring your vision to life with
            precision and elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-none font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
