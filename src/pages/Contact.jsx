import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config/api";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Phone, MessageCircle } from "lucide-react";



export default function Contact() {
  const [data, setData] = useState({ content: "", page: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("contact/"); // /api/contact/
        setData(response.data);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError("Failed to load contact page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the message from form data
    const message = `Hello, I would like to get in touch.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp number (without + in URL)
    const whatsappNumber = "919744012345";

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative bg-fixed bg-center bg-cover h-[30vh] mt-12"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/OIP.ee0K3fgpKc7KoG43Ff4DMwHaGu?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Centered content */}
        <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 text-black py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:h-[530px]">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-700">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Our Headquarters",
                  content: "JAJI'S INNOVATION PVT LTD",
                },
                {
                  icon: <FaPhone />,
                  title: "Phone",
                  content: "+91 9744 012345",
                },
                {
                  icon: <FaEnvelope />,
                  title: "Email",
                  content: "Jajisinnovation@gmail.com",
                },
                {
                  icon: <FaClock />,
                  title: "Business Hours",
                  content: "10 AM - 9 PM (All Days)",
                },
              ].map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl">{info.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{info.title}</h3>
                    <p className="text-gray-700">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  {
                    Icon: FaFacebookF,
                    url: "https://www.facebook.com/share/1DPhDM11zx/",
                  },
                  {
                    Icon: FaInstagram,
                    url: "https://www.instagram.com/jajisgroup?igsh=MXFzeDQ2M2MyMjI2Mg==",
                  },
                  {
                    Icon: FaYoutube,
                    url: "https://youtube.com/@jajisunil?si=t0gPOcqKqbuv-g85",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black/10 text-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <social.Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
              <div className="flex gap-4">
                <a
                  href="tel:+919744012345"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/919744012345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Locations Section */}
      <div
        className="relative bg-fixed bg-center bg-cover text-white py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10" >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Locations & Ventures
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Experience the Jaji's lifestyle across multiple locations in
              Kerala
            </p>

            {/* Salons */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">
                  I
                </span>
                Salons
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" >
                {[
                  {
                    name: "Jajis Innovation Unisex Beauty Salon",
                    address: "4th Floor, RP Mall, Kollam, Kerala",
                    contact: "+91 98479 48242",
                    location: "RP Mall, Kollam",
                  },
                  {
                    name: "Jaji's Innovation Unisex Beauty Salon",
                    address:
                      "2nd Floor, KC Center, Opp. Boys Higher Secondary School, Near KSRTC Bus Stand, Karunagappally, Kollam, Kerala 690518",
                    contact: "+91 70346 2625",
                    location: "Karunagappally",
                  },
                  {
                    name: "Jajis Express Family Salon & Bride/Groom Lounge",
                    address:
                      "1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam",
                    contact: "+91 97440 12345",
                    location: "Polayathodu",
                  },
                  {
                    name: "Jajis Innovation Unisex Beauty Salon & Bridal Makeup Studio",
                    address:
                      "Ground Floor, KEK Towers, Opposite Trivandrum Club, Vazhuthacaud, Kerala 695014",
                    contact: "+91 9207 20 9207",
                    location: "Vazhuthacaud, Trivandrum",
                  },
                  {
                    name: "Jajis Innovation Unisex Beauty Salon & Bridal Makeup Studio",
                    address:
                      "Vijaya Tower, Adhikadu Junction, Chavara–Shasthamcotta Road, Kollam, Kerala 690521",
                    contact: "Coming Soon",
                    location: "Chavara",
                  },
                  {
                    name: "Jajis Innovation Unisex Beauty Salon & Bridal Makeup Studio",
                    address: "Kottuvankonam, Paravur, Kollam, Kerala 691301",
                    contact: "+91 96332 10449",
                    location: "Paravur",
                  },
                ].map((salon, index) => (
                  <div
                    key={index}
                    className="bg-black/60 rounded-lg p-6 hover:bg-black/70 transition-colors"
                  >
                    <h4 className="font-semibold text-lg mb-2">
                      {salon.location}
                    </h4>
                    <p className="text-sm text-gray-300 mb-4">{salon.name}</p>
                    <p className="text-sm text-gray-400 mb-3">
                      {salon.address}
                    </p>
                    <a
                      href={`tel:${salon.contact.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white hover:text-black 
             text-white px-4 py-2 rounded-full transition-all duration-300 
             backdrop-blur-sm border border-white/20"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                        <FaPhone size={14} />
                      </span>
                      <span className="font-semibold text-sm tracking-wide">
                        {salon.contact}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Venues */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">
                    II
                  </span>
                  Jajis Q Cafe & Event Hall
                </h3>
                <div className="bg-black/70 rounded-lg p-6 hover:bg-black/80 transition-colors">
                  <p className="text-gray-300 mb-4">
                    Near Children's Park, Asramam, Kollam, Kerala 691001
                  </p>
                  <a
                    href="tel:+917034626625"
                    className="text-white hover:text-gray-300 font-semibold flex items-center gap-2 "
                  >
                    <FaPhone /> +91 7034 626 625
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">
                    III
                  </span>
                  Jajis Food Court
                </h3>
                <div className="bg-black/70 rounded-lg p-6 hover:bg-black/80 transition-colors">
                  <p className="text-gray-300 mb-4">
                    Ashramam Maidanam, Kollam, Kerala 691001
                  </p>
                  <a
                    href="tel:+917034626627"
                    className="text-white hover:text-gray-300 font-semibold flex items-center gap-2"
                  >
                    <FaPhone /> +91 70346 26627
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">
                    IV
                  </span>
                  Jajis Designing & Stitching Studio
                </h3>
                <div className="bg-black/70 rounded-lg p-6 hover:bg-black/80 transition-colors">
                  <p className="text-gray-300 mb-4">
                    Opposite KFC, Polayathodu, Kollam, Kerala 691021
                  </p>
                  <a
                    href="tel:+919645296450"
                    className="text-white hover:text-gray-300 font-semibold flex items-center gap-2"
                  >
                    <FaPhone /> +91 96452 96450
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">
                    V
                  </span>
                  Jaji's Beauty Academy
                </h3>
                <div className="bg-black/70 rounded-lg p-6 hover:bg-black/80 transition-colors">
                  <p className="text-gray-300 mb-4">
                    1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam
                    691021
                  </p>
                  <a
                    href="tel:+919744012345"
                    className="text-white hover:text-gray-300 font-semibold flex items-center gap-2"
                  >
                    <FaPhone /> +91 97440 12345
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
