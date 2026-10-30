import { useEffect, useState } from "react";
import axios from "axios";
import QCafeBooking from "../components/QCafeBooking";
import { API } from "../config/api";
import { Link } from "react-router-dom";

// React Icons
import {
  FaChurch,
  FaBuilding,
  FaBirthdayCake,
  FaSuitcase,
  FaTheaterMasks,
  FaStoreAlt,
  FaUtensils,
  FaWifi,
  FaCar,
  FaPaintBrush,
  FaUsers,
  FaSnowflake,
  FaLock,
  FaMusic,
  FaCheck,
  FaCalendarCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

import eventbg from "../assets/img/event-hall-2.webp";
import event from "../assets/img/event-hall-3.webp";
import event1 from "../assets/img/event-hall-1.webp";

export default function EventHall() {
  const [data, setData] = useState({ content: "", page: "Jaji’s Q Cafe & Event Hall" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialFormState = {
    name: "",
    phone: "",
    email: "",
    event_type: "wedding",
    category: "ac",
    event_date: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoadingBookedDates, setIsLoadingBookedDates] = useState(false);

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "reception", label: "Reception" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate" },
    { value: "other", label: "Other" },
  ];
  const categories = [
    { value: "ac", label: "AC" },
    { value: "non-ac", label: "Non-AC" },
  ];
  const todayString = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.message) {
      setFormStatus({ type: "", message: "" });
    }
  };

  const fetchBookedDates = async () => {
    try {
      setIsLoadingBookedDates(true);
      const response = await API.get("event-hall/booked-dates/");
      setBookedDates(response?.data?.booked_dates || []);
    } catch (err) {
      console.error("Error fetching booked dates:", err);
    } finally {
      setIsLoadingBookedDates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (
      !payload.name ||
      !payload.phone ||
      !payload.email ||
      !payload.event_date
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill in your name, phone, email, and preferred date.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (bookedDates.includes(payload.event_date)) {
      setFormStatus({
        type: "error",
        message: "This date is already booked. Please choose another date.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      try {
        response = await API.post("event-hall/", payload);
      } catch (postErr) {
        if (postErr?.response?.status === 401) {
          // Retry without invalid token header if 401 occurs
          response = await API.post("event-hall/", payload, {
            headers: { Authorization: "" },
          });
        } else {
          throw postErr;
        }
      }

      setFormStatus({
        type: "success",
        message:
          response?.data?.message ||
          `Booking request received for ${
            eventTypes.find((item) => item.value === payload.event_type)?.label ||
            payload.event_type
          }. We will contact you soon.`,
      });
      setFormData(initialFormState);
      fetchBookedDates();
    } catch (err) {
      console.error("Booking submit error:", err);
      let errMsg = "We could not submit your booking right now. Please check server status and try again.";
      if (err?.response?.data) {
        if (typeof err.response.data === "string") {
          errMsg = err.response.data;
        } else if (typeof err.response.data === "object") {
          const messages = Object.entries(err.response.data)
            .map(([key, val]) => `${key !== "detail" ? `${key}: ` : ""}${Array.isArray(val) ? val.join(" ") : String(val)}`)
            .join(" ");
          if (messages) errMsg = messages;
        }
      }
      setFormStatus({
        type: "error",
        message: errMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-[100vh] w-full bg-fixed bg-cover bg-center border-b border-white"
        style={{
          backgroundImage: `url(${eventbg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white">
              {data.page || "Jaji’s Q Cafe & Event Hall"}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-6 text-gray-300">
              Celebrate life’s most important moments in style.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#qcafe-booking"
                className="px-8 py-4 bg-white text-black text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-200 transition-colors"
              >
                Book the Q Café hall
              </a>
              <a
                href="#event"
                className="px-8 py-4 border border-white text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                Larger venues
              </a>
            </div>
          </div>
        </div>
      </div>

      <QCafeBooking />

      <section className="bg-[linear-gradient(135deg,#fffdf7_0%,#f7f7f7_100%)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 px-8 py-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-300">
                Reservation Form
              </p>
              <h2 className="mt-2 text-3xl font-bold">Book Your Event Hall</h2>
              <p className="mt-2 text-sm text-gray-300">
                Reserve a premium venue for weddings, receptions, birthdays, and
                more.
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Event Type
                    </label>
                    <select
                      name="event_type"
                      value={formData.event_type}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    min={todayString}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {isLoadingBookedDates
                      ? "Checking available dates..."
                      : bookedDates.length > 0
                        ? `Booked dates currently unavailable: ${bookedDates.join(", ")}`
                        : "All dates are currently available."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-black to-gray-800 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Book Now"}
                </button>
              </form>

              {formStatus.message ? (
                <div
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                    formStatus.type === "error"
                      ? "border-red-500/40 bg-red-500/10 text-red-600"
                      : "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                  }`}
                >
                  {formStatus.message}
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-gray-200 bg-gradient-to-br from-gray-900 to-black p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-200">
              Premium Experience
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Why book with us?
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Premium halls for weddings, receptions, and birthdays</li>
              <li>• Flexible categories for every celebration</li>
              <li>• Quick confirmation and personal assistance</li>
              <li>• Hassle-free booking experience</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Venue Types */}
      <section
        id="event"
        className="relative bg-fixed bg-center bg-cover py-20"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-white"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Our Premium Event Venues
          </h2>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AC Conference Halls",
                image: event,
                description:
                  "Modern air-conditioned conference halls equipped with latest technology for professional meetings and corporate events.",
                capacity: "50-300 attendees",
              },
              {
                title: "Auditoriums",
                image: event1,
                description:
                  "Spacious auditoriums with premium acoustics and seating arrangements perfect for presentations and seminars.",
                capacity: "300-800 attendees",
              },
              {
                title: "Banquet Halls",
                image:
                  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
                description:
                  "Luxurious banquet halls with elegant decor and fine dining facilities for special celebrations and gatherings.",
                capacity: "100-500 guests",
              },
              {
                title: "Convention Halls",
                image:
                  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
                description:
                  "Large-scale convention halls designed for exhibitions, trade shows, and major business events with flexible layouts.",
                capacity: "500-2000 visitors",
              },
              {
                title: "Kalyana Mandapams",
                image:
                  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
                description:
                  "Traditional wedding halls with beautiful mandap decorations and cultural ambiance for memorable wedding ceremonies.",
                capacity: "200-800 guests",
              },
              {
                title: "Reception Hall",
                image: eventbg,
                description:
                  "Elegant reception halls perfect for wedding receptions, anniversaries, and milestone celebrations with premium amenities.",
                capacity: "150-600 guests",
              },
            ].map((venue, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-black/20 rounded-xl  overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    <FaUsers className="inline mr-1" />
                    {venue.capacity}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    {venue.title}
                  </h3>
                  <p className="text-gray-800 mb-6 text-sm leading-relaxed">
                    {venue.description}
                  </p>

                  {/* Book Now Button */}
                  <a
                    href="tel:"
                    className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaCalendarCheck />
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Event?</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section
        className="bg-fixed bg-center bg-cover relative"
        style={{
          backgroundImage:
            "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/cb314b79011255.5cb606d8c8401.jpg')",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            Venue Amenities
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Explore our premium amenities designed to make your events seamless,
            stylish, and unforgettable.
          </p>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Catering Services", icon: <FaUtensils /> },
              { name: "Audio/Visual Equipment", icon: <FaMusic /> },
              { name: "Free WiFi", icon: <FaWifi /> },
              { name: "Parking Space", icon: <FaCar /> },
              { name: "Decoration Services", icon: <FaPaintBrush /> },
              { name: "Professional Staff", icon: <FaUsers /> },
              { name: "Climate Control", icon: <FaSnowflake /> },
              { name: "Security Services", icon: <FaLock /> },
            ].map((amenity, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-gray-900/80 rounded-2xl shadow-lg hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-3 text-white text-4xl transition-colors duration-300 transform group-hover:scale-110">
                  {amenity.icon}
                </div>
                <p className="text-white text-sm font-medium transition-colors">
                  {amenity.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
