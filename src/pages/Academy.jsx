import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaTools,
  FaCertificate,
  FaBriefcase,
  FaCogs,
  FaUsers,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import { API } from "../config/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const features = [
    {
      name: "Expert Instructors",
      icon: <FaChalkboardTeacher />,
      description: "Learn from industry professionals.",
    },
    {
      name: "Practical Training",
      icon: <FaTools />,
      description: "Hands-on experience on real projects.",
    },
    {
      name: "Certification",
      icon: <FaCertificate />,
      description: "Recognized certificates after completion.",
    },
    {
      name: "Job Placement",
      icon: <FaBriefcase />,
      description: "Career assistance & placement support.",
    },
    {
      name: "Modern Equipment",
      icon: <FaCogs />,
      description: "Training with latest tools & technology.",
    },
    {
      name: "Small Batches",
      icon: <FaUsers />,
      description: "Personal attention in small groups.",
    },
    {
      name: "Flexible Schedule",
      icon: <FaClock />,
      description: "Convenient timings for all learners.",
    },
    {
      name: "Affordable Fees",
      icon: <FaMoneyBillWave />,
      description: "High-quality education at fair prices.",
    },
  ];

  useEffect(() => {
    let mounted = true;

    const fetchCourses = async () => {
      try {
        const { data } = await API.get("academy/"); 
        if (mounted) setCourses(data.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        if (mounted) setError("Failed to load courses. Please try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => {
      mounted = false;
    };
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="animate-spin h-32 w-32 border-t-4 border-b-4 border-white rounded-full"></div>
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
      {/* Banner */}
      <div
        className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-fixed bg-cover bg-center border-b border-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://jooinn.com/images/beauty-65.jpg')",
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-1 tracking-tight">
          Courses
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-200 mb-6">
          Place where you can learn and grow
        </p>
        <a
          href="#Course"
          className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transform hover:-translate-y-1 transition"
        >
          View Course
        </a>
      </div>

      {/* Courses Grid */}
      <section
        id="Course"
        className="relative py-20 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore Our Programs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition"
              >
                <img
                  src={course.image}
                  alt={course.course}
                  className="w-full h-68 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{course.course}</h3>
                  <p className="text-sm text-white mb-2">
                    Duration: {course.duration}
                  </p>
                  <p className="text-gray-200">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="relative py-20 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?cs=srgb&dl=ballpen-blur-book-1925536.jpg&fm=jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Our Academy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-white/10 rounded-2xl shadow-lg hover:bg-white/20 transform hover:scale-105 transition"
              >
                <div className="text-5xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
