import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { SkeletonWishlistItem } from "../components/SkeletonLoader";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [movingToCart, setMovingToCart] = useState(null);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 1500);
  };

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    if (!token) {
      setItems([]); // not logged in
      setLoading(false);
      return;
    }

    try {
      const res = await API.get("/wishlist/");
      const data = res.data;
      setItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      showMessage("Failed to load wishlist", "error");
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist
  const handleRemove = async (variantId) => {
    if (!token) {
      showMessage("Login to manage wishlist", "warning");
      return;
    }

    setRemoving(variantId);
    try {
      await API.post("/wishlist/remove/", { variant_id: variantId });
      setItems((prev) => prev.filter((it) => it.variant.id !== variantId));
      showMessage("Removed from wishlist");
    } catch (err) {
      console.error("Remove wishlist error:", err);
      showMessage("Could not remove item", "error");
    } finally {
      setRemoving(null);
    }
  };

  // Move to cart: add to cart then remove from wishlist
  const handleMoveToCart = async (variantId) => {
    if (!token) {
      showMessage("Login to add to cart", "warning");
      return;
    }

    setMovingToCart(variantId);
    try {
      // add to cart (existing endpoint)
      await API.post("/cart/add/", { variant_id: variantId, quantity: 1 });

      // then remove from wishlist
      await API.post("/wishlist/remove/", { variant_id: variantId });

      // update local list
      setItems((prev) => prev.filter((it) => it.variant.id !== variantId));
      showMessage("Moved to cart");
    } catch (err) {
      console.error("Move to cart error:", err);
      showMessage("Could not move to cart", "error");
    } finally {
      setMovingToCart(null);
    }
  };

  return (
    <div className="pb-20 px-6 lg:px-16 min-h-screen">
      {/* Toast */}
      {message && (
        <div
          className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white ${
            message.type === "success"
              ? "bg-green-600"
              : message.type === "error"
                ? "bg-red-600"
                : "bg-yellow-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <header className="bg-white sticky top-0 z-40 mt-24 mb-6">
        <div className="container mx-auto px-4 lg:px-12 py-6 flex flex-col items-center text-center">
          <h1 className="text-3xl lg:text-3xl font-bold text-black tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Save your favorite products and shop them anytime.
          </p>
        </div>
      </header>

      {items.length === 0 && !loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Link to="/products">
            <div className="p-8 border rounded-xl text-center hover:shadow-lg">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your Wishlist is empty</p>
              <p className="text-gray-400 text-sm">Click to browse products</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[...Array(8)].map((_, i) => (
                <SkeletonWishlistItem key={`skeleton-${i}`} />
              ))}
            </>
          ) : (
            items.map((item) => {
              // item: { id, variant: {...}, product_title, product_brand, product_image }
              const variant = item.variant || {};
              const productTitle =
                item.product_title ||
                (variant.product && variant.product.title) ||
                "Product";
              const productBrand =
                item.product_brand ||
                (variant.product && variant.product.brand) ||
                "";
              const productImage =
                item.product_image ||
                (variant.product && variant.product.image1) ||
                "/static/no-image.png";

              // price info from variant (if present)
              const price = variant.price || variant.mrp || 0;
              const mrp = variant.mrp || price;
              const discount = mrp
                ? Math.round(((mrp - price) / mrp) * 100)
                : 0;

              const variantId = variant.id;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group relative overflow-hidden rounded-xl"
                >
                  {/* Delete */}
                  <button
                    onClick={() => handleRemove(variantId)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-red-100 transition-all"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>

                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={productImage}
                      alt={productTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      {productBrand}
                    </p>
                    <h3 className="text-base font-semibold text-black mb-2 leading-tight">
                      {productTitle}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-black">
                        ₹{price}
                      </span>
                      {mrp && mrp !== price ? (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{mrp}
                        </span>
                      ) : null}
                      {discount ? (
                        <span className="text-xs font-medium text-green-600">
                          {discount}% off
                        </span>
                      ) : null}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleMoveToCart(variantId)}
                        className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 transition-colors uppercase tracking-wider"
                        disabled={movingToCart === variantId}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {movingToCart === variantId
                          ? "Moving..."
                          : "Move to Cart"}
                      </button>

                      <Link
                        to={`/product/${variant.product ? variant.product.id : ""}`}
                        className="flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 text-xs"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
