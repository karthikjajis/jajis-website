import { useState } from "react";
import { API } from "../config/api";
import { useNavigate, Link } from "react-router-dom";

// Icons
import { HiUser, HiLockClosed } from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("login/", formData);

      localStorage.setItem("token", response.data.token);

      navigate("/products");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 min-h-screen mt-12">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">

        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <div className="relative">
              <HiUser className="absolute left-3 top-3 text-gray-500 text-xl" />
              <input
                type="text"
                name="username"
                className="w-full border rounded-lg p-3 pl-10 focus:outline-none focus:ring focus:ring-black/20"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-3 text-gray-500 text-xl" />
              <input
                type="password"
                name="password"
                className="w-full border rounded-lg p-3 pl-10 focus:outline-none focus:ring focus:ring-black/20"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
        <p className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="text-blue-600 underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
