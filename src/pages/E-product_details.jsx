import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../config/api";
import {
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  Clock,
  BookOpen,
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { SkeletonProductDetails } from "../components/SkeletonLoader";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 1200);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`products/${id}/`);
        setProduct(res.data);
        setSelectedImageIndex(0);
        if (res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      } catch (err) {
        console.error("Error fetching product", err);
        showMessage("Failed to load product", "error");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleShare = () => {
    const shareData = {
      title: product.title,
      text: `Check out this product: ${product.title}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      setIsShareOpen(true);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showMessage("Please login to add items to cart.", "warning");
      return;
    }

    try {
      setAddingItem(true);
      await API.post("/cart/add/", {
        variant_id: selectedVariant.id,
        quantity: 1,
      });
      showMessage("Added to cart!", "success");
    } catch (err) {
      console.error("Add to cart failed:", err);
      showMessage("Something went wrong", "error");
    }
    setAddingItem(false);
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 lg:px-12 py-12">
        <SkeletonProductDetails />
      </div>
    );

  if (!product) {
    return (
      <div className="w-full py-20 mt-24 flex flex-col items-center justify-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          Product not found
        </span>
      </div>
    );
  }

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);
  const selectedImage = images[selectedImageIndex] || images[0];

  // Navigate Lightbox Images
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen py-16 px-6 lg:px-20 mt-20">
      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-white ${
            message.type === "success"
              ? "bg-green-500"
              : message.type === "error"
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT IMAGES */}
        <div>
          {selectedImage && (
            <>
              <div
                className="relative w-full h-[500px] rounded-xl overflow-hidden shadow cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* SHARE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <Share2 size={20} />
                </button>
              </div>

              <div className="flex gap-3 mt-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 object-cover rounded border-2 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT DETAILS */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-gray-600">by {product.brand}</p>

          {selectedVariant && (
            <div className="flex items-center gap-3">
              <p className="text-4xl font-bold text-green-600 ">
                ₹{selectedVariant.price}
              </p>
              <p className="text-3xl text-red-400 line-through">
                ₹{selectedVariant.mrp}
              </p>
              <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded">
                {Math.round(
                  ((selectedVariant.mrp - selectedVariant.price) /
                    selectedVariant.mrp) *
                    100,
                )}
                % OFF
              </span>
            </div>
          )}

          <p className="text-gray-700 text-justify">{product.description}</p>

          {/* PRODUCT BENEFITS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-orange-200 p-4 rounded-md flex flex-col items-center text-center">
              <Truck size={24} className="text-green-600 mb-2" />
              <span className="text-xs text-gray-700 font-medium">
                Free Shipping
              </span>
            </div>

            <div className="bg-orange-200 p-4 rounded-md flex flex-col items-center text-center">
              <Shield size={24} className="text-green-600 mb-2" />
              <span className="text-xs text-gray-700 font-medium">
                Secure Payment
              </span>
            </div>

            <div className="bg-orange-200 p-4 rounded-md flex flex-col items-center text-center">
              <Clock size={24} className="text-green-600 mb-2" />
              <span className="text-xs text-gray-700 font-medium">
                Delivery in 4-6 business days
              </span>
            </div>

            <div className="bg-orange-200 p-4 rounded-md flex flex-col items-center text-center">
              <BookOpen size={24} className="text-green-600 mb-2" />
              <span className="text-xs text-gray-700 font-medium">
                Privacy respected, terms apply
              </span>
            </div>
          </div>

          {/* VARIANT SELECTOR */}
          <div>
            <p className="font-semibold mb-2">Available Quantities:</p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    selectedVariant?.id === v.id
                      ? "bg-black text-white"
                      : "border-gray-400 text-gray-700"
                  }`}
                >
                  {v.quantity_label}
                </button>
              ))}
            </div>
          </div>

          {/* STOCK */}
          {selectedVariant && (
            <p className="text-sm">
              Stock Status:{" "}
              <b
                className={
                  selectedVariant.stock === 0
                    ? "text-red-600"
                    : selectedVariant.stock < 20
                      ? "text-orange-400"
                      : "text-green-600"
                }
              >
                {selectedVariant.stock === 0
                  ? "Out of stock"
                  : selectedVariant.stock < 20
                    ? "Low stock"
                    : "Available"}
              </b>
            </p>
          )}

          {/* ADD TO CART BUTTON */}
          <div className="flex gap-4">
            {selectedVariant && selectedVariant.stock < 1 ? (
              <button
                className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                {addingItem ? "Adding…" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIGHTBOX WITH NEXT/PREV */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center mt-20">
          <Dialog.Panel className="relative max-w-xl w-full">
            <img
              src={selectedImage}
              alt="lightbox"
              className="rounded-lg w-full h-auto"
            />

            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>

            {/* NEXT/PREV BUTTONS */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 p-2 rounded hover:bg-white"
                  onClick={() =>
                    setSelectedImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                >
                  <ChevronLeft />
                </button>
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 p-2 rounded hover:bg-white"
                  onClick={() =>
                    setSelectedImageIndex((prev) => (prev + 1) % images.length)
                  }
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* SHARE POPUP */}
      <Dialog open={isShareOpen} onClose={() => setIsShareOpen(false)}>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white w-80 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Share this product</h3>

            <div className="flex flex-col gap-3">
              <a
                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                target="_blank"
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-center"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg text-center"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                className="px-4 py-2 bg-black text-white rounded-lg text-center"
              >
                Twitter / X
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showMessage("Link copied!", "success");
                }}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
              >
                Copy Link
              </button>
            </div>

            <button
              className="w-full mt-2 px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setIsShareOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
