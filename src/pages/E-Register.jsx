import { useState } from "react";
import { API } from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("signup/", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/products");
    } catch (err) {
      setError("Username already exists or invalid input");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-white mt-24">
      <div className="w-full max-w-md bg-white border border-gray-200 p-10 rounded-2xl shadow-md hover:shadow-2xl">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Create Account
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-black w-5 h-5" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-black w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-black w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-xl text-lg font-medium tracking-wide hover:bg-gray-900 transition">
            Register
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
