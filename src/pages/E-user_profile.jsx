import {
  User,
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  ShoppingCart,
  Lock,
  Mail,
  Store,
  Brush
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config/api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
  });

  const [loading, setLoading] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/");
        setUser((prev) => ({
          ...prev,
          username: res.data.username,
          email: res.data.email,
        }));
        setResetEmail(res.data.email || "");
      } catch (error) {
        console.error("Profile fetch failed", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const menuItems = [
    {
      id: 1,
      name: "My Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      link: "/myorders",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      name: "Wishlist",
      icon: <Heart className="w-5 h-5" />,
      link: "/wishlist",
      color: "bg-pink-50 text-pink-600",
    },
    {
      id: 3,
      name: "Cart",
      icon: <ShoppingCart className="w-5 h-5" />,
      link: "/cart",
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 4,
      name: "Products",
      icon: <Store className="w-5 h-5" />,
      link: "/products",
      color: "bg-green-50 text-green-600",
    },
  ];

  const handleLogout = async () => {
    try {
      await API.post("/logout/");
    } catch (error) {
      console.error("Logout error");
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePasswordReset = async () => {
    try {
      await API.post("/password-reset/", { email: resetEmail });
      setMessage({
        type: "success",
        text: "Password reset link sent to email.",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to send reset link." });
    }
  };

  if (loading) {
    return (
      <div className="w-full py-20 mt-24 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
        <span className="text-sm font-medium text-gray-600 tracking-wide">
          Loading, please wait…
        </span>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-16 bg-gray-100 min-h-screen mt-14">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-[40vh]">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-xl font-bold text-gray-900">
            {user.username || "User"}
          </h2>
          <p className="text-gray-500 text-sm mb-4 flex items-center justify-center gap-1">
            <Mail className="w-4 h-4" /> {user.email || "No email available"}
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-xl font-medium hover:bg-red-600 transition shadow"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className={`flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-xl p-5 hover:shadow-md transition ${item.color} hover:bg-opacity-70`}
                >
                  <div
                    className={`p-3 rounded-full ${item.color} bg-opacity-30`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* SECURITY SECTION */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Security
            </h3>

            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot / Change Password
            </Link>

           

            {message && (
              <p
                className={`mt-3 text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
