import {
  FaStar,
  FaLightbulb,
  FaHandshake,
  FaHeart,
  FaBuilding,
  FaUserTie,
  FaPaintBrush,
  FaLaptopCode,
  FaCut,
  FaGraduationCap,
  FaUtensils,
  FaGlassCheers,
  FaShoppingBag,
} from "react-icons/fa";

import CEO from "../assets/img/management-ceo.webp";
import DIRECTOR from "../assets/img/management-jaji-main-image.webp";
import JAJI from "../assets/img/management-jaji.webp";
import jaji1 from "../assets/img/management-jajis.webp";
import jaji2 from "../assets/img/management-jajis1.webp";
import jaji3 from "../assets/img/management-jajis2.webp";

import salon from "../assets/img/saloon-1.webp";
import salonbg from "../assets/img/saloon-2.webp";
import cosmeticsImg from "../assets/img/images-cosmatics.webp";
import cosmetics_bg from "../assets/img/saloon-3.webp";
import LOGO from "../assets/img/images-logo.webp";
import eventbg from "../assets/img/event-hall-3.webp";
import event from "../assets/img/event-hall-2.webp";

import qcafe from "../assets/img/foodcourt-2.webp";
import qcafebg from "../assets/img/foodcourt-1.webp";

import design from "../assets/img/design-1.webp";
import designbg from "../assets/img/design-3.webp";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div
        className="relative h-[100vh] mt-12 w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${JAJI})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About Us
            </h1>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section
        className="relative bg-gray-100 bg-fixed bg-center bg-cover"
        id="more"
      >
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <span className="text-sm font-bold tracking-widest text-gray-600 uppercase">
                Our Journey
              </span>
              <h2 className="text-5xl font-extrabold text-black leading-tight drop-shadow">
                Crafting <span className="text-gray-800">Excellence</span> Since
                Day One
              </h2>
              <div className="w-24 h-1 bg-black mb-6"></div>

              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Founded with a vision to provide exceptional beauty and
                lifestyle services, Jajis has grown from a small local business
                to a comprehensive service provider that touches lives across
                communities.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Our mission has always been to make beauty and wellness
                accessible to everyone while maintaining the highest standards
                of quality and professionalism.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="bg-white shadow-md p-6 rounded-2xl hover:scale-105 hover:bg-gray-100 transition-transform">
                  <div className="text-5xl font-extrabold text-black mb-2">
                    10+
                  </div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide">
                    Years Experience
                  </div>
                </div>
                <div className="bg-white shadow-md p-6 rounded-2xl hover:scale-105 hover:bg-gray-100 transition-transform">
                  <div className="text-5xl font-extrabold text-black mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide">
                    Team Members
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Cards */}
            <div className="space-y-10">
              <div
                className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-black text-4xl mb-6 group-hover:scale-110 transition-transform">
                  <FaBuilding />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To provide innovative, high-quality beauty and lifestyle
                  services that enhance confidence and well-being, making every
                  client feel valued and beautiful.
                </p>
              </div>

              <div
                className="bg-white p-10 rounded-2xl shadow-lg border border-gray-300 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-black text-4xl mb-6 group-hover:scale-110 transition-transform">
                  <FaStar />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading beauty & lifestyle brand, known for
                  innovation, excellence, and customer satisfaction across all
                  service lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="relative bg-fixed bg-center bg-top"
        style={{
          backgroundImage: `url(${cosmetics_bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative py-32">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              Meet The Experts
            </span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">
              Our Leadership Team
            </h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Jajimole K",
                role: "Founder & Director",
                image: JAJI,
              },

              {
                name: "Keerthi Sunil",
                role: "Director",
                image: DIRECTOR,
              },

              {
                name: "Karthik Sunil",
                role: "Creative Director",
                image: CEO,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="group text-center p-8 
              transition-all duration-300 rounded-2xl"
              >
                {/* Profile Image */}
                <div className="relative w-62 h-62 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-top object-cover rounded-full 
                 border-1 border-white 
                 transition-all duration-300"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1 transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-gray-300 text-sm uppercase tracking-wider transition-colors duration-300">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${jaji1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative py-32">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              What Drives Us
            </span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Excellence",
                icon: <FaStar />,
                desc: "We strive for excellence in everything we do",
              },
              {
                name: "Innovation",
                icon: <FaLightbulb />,
                desc: "Constantly innovating to serve you better",
              },
              {
                name: "Integrity",
                icon: <FaHandshake />,
                desc: "Honest and transparent in all operations",
              },
              {
                name: "Customer Focus",
                icon: <FaHeart />,
                desc: "Our customers are always our top priority",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group text-center p-8 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <div className="text-4xl text-white group-hover:text-black transition-colors duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {value.name}
                </h3>
                <p className="text-gray-300">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${jaji3})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative py-32">
          <div className="text-center mb-20">
            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              Our Services
            </span>
            <h2 className="text-5xl font-bold text-white mt-4 mb-6">
              What We Offer
            </h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Beauty Salons",
                icon: <FaUserTie />,
                desc: "Professional beauty services for all",
              },
              {
                name: "Cosmetics",
                icon: <FaShoppingBag />,
                desc: "Premium beauty products curated",
              },
              {
                name: "Event Halls",
                icon: <FaGlassCheers />,
                desc: "Perfect venues for celebrations",
              },
              {
                name: "Food Court",
                icon: <FaUtensils />,
                desc: "Delicious dining experiences",
              },
              {
                name: "Design & Stitching",
                icon: <FaCut />,
                desc: "Custom fashion services delivered",
              },
              {
                name: "Academy",
                icon: <FaGraduationCap />,
                desc: "Professional training programs",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/20 p-8 hover:bg-white hover:border-white hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="text-5xl text-white group-hover:text-black mb-6 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-black transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${salonbg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of satisfied customers who trust us with their beauty
            and lifestyle needs.
          </p>
          <button className="px-12 py-4 bg-white text-black font-bold text-lg uppercase tracking-wide hover:bg-gray-200 hover:scale-105 transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
