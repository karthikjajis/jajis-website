import { useState } from "react";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { HiMail, HiLockClosed, HiKey } from "react-icons/hi";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: email, 2: otp & password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("forgot-password/", {
        email: formData.email,
      });
      setMessage(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("reset-password/", {
        email: formData.email,
        otp: formData.otp,
        new_password: formData.new_password,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 min-h-screen mt-12">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/login")}
            className="p-2 hover:bg-gray-100 rounded-full mr-2"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold">Forgot Password</h2>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you an OTP to reset your password.
            </p>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="email"
                  name="email"
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
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <p className="text-sm text-gray-600 mb-4">
              Enter the OTP sent to your email and your new password.
            </p>

            {/* OTP */}
            <div>
              <label className="block mb-1 font-medium">OTP</label>
              <div className="relative">
                <HiKey className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="text"
                  name="otp"
                  maxLength="6"
                  className="w-full border rounded-lg p-3 pl-10 focus:outline-none focus:ring focus:ring-black/20"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="password"
                  name="new_password"
                  className="w-full border rounded-lg p-3 pl-10 focus:outline-none focus:ring focus:ring-black/20"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-3 text-gray-500 text-xl" />
                <input
                  type="password"
                  name="confirm_password"
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}