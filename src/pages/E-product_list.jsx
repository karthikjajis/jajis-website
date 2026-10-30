import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { FaHeart, FaRegHeart, FaFilter } from "react-icons/fa";
import { SkeletonProductCard } from "../components/SkeletonLoader";

const FilterContent = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  minInput,
  setMinInput,
  maxInput,
  setMaxInput,
  handleApplyFilter,
  onApplyFilter,
}) => (
  <div className="border p-6 bg-white shadow-sm rounded-lg select-none">
    <h2 className="text-xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-2">
      <FaFilter className="text-gray-700" />
      Filters
    </h2>

    <div className="w-full">
      <label className="block  text-sm font-medium mb-2">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full bg-black border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    <div className="mt-6">
      <h3 className="font-semibold border-b pb-2 mb-4">Price Range</h3>

      <div className="flex gap-2 items-center mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            placeholder="Min"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            placeholder="Max"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={() => {
          handleApplyFilter();
          onApplyFilter?.();
        }}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Apply Filter
      </button>
    </div>
  </div>
);

export default function EcommerceHome() {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryInput, setSelectedCategoryInput] = useState("All");

  const MIN = 10;
  const MAX = 5000;
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);
  const [cardsLoading, setCardsLoading] = useState({});
  const [addingItem, setAddingItem] = useState(null);
  const [togglingWishlist, setTogglingWishlist] = useState(null);

  const [message, setMessage] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const token = localStorage.getItem("token");

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 1200);
  };

  // Fetch Products + Categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/products/");
        setProducts(Array.isArray(res.data?.products) ? res.data.products : []);

        const categoryNames = Array.isArray(res.data?.categories)
          ? res.data.categories.map((c) => c.name).filter(Boolean)
          : [];

        const allCategories = ["All", ...categoryNames];
        setCategories(allCategories);
        setSelectedCategory("All");
        setSelectedCategoryInput("All");
      } catch (err) {
        console.error(err);
        showMessage("Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch Wishlist (backend returns {id, items})
  useEffect(() => {
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await API.get("/wishlist/");
        const items = Array.isArray(res.data?.items) ? res.data.items : [];
        const variantIds = items
          .map((it) => it?.variant?.id)
          .filter((id) => id !== undefined && id !== null);

        setWishlist(variantIds);
      } catch (err) {
        console.error("Wishlist fetch failed", err);
      }
    };

    fetchWishlist();
  }, [token]);

  const handleWishlistToggle = async (product) => {
    if (!token) {
      showMessage("Please login to use wishlist.", "warning");
      return;
    }

    const variantId = product?.variants?.[0]?.id;
    if (!variantId) return;

    try {
      setTogglingWishlist(variantId);

      // Use backend toggle endpoint (you already have it)
      const res = await API.post("/wishlist/toggle/", {
        variant_id: variantId,
      });
      const toggled = !!res.data?.toggled;

      setWishlist((prev) => {
        const exists = prev.includes(variantId);
        if (toggled && !exists) return [...prev, variantId];
        if (!toggled && exists) return prev.filter((id) => id !== variantId);
        return prev;
      });

      showMessage(
        toggled ? "Added to wishlist!" : "Removed from wishlist!",
        "success",
      );
    } catch (err) {
      console.error(err);
      showMessage("Error updating wishlist", "error");
    } finally {
      setTogglingWishlist(null);
    }
  };

  const handleAddToCart = async (variantId, productId) => {
    if (!token) {
      showMessage("Please login to add items to cart.", "warning");
      return;
    }

    try {
      setAddingItem(productId);
      await API.post("/cart/add/", { variant_id: variantId, quantity: 1 });
      showMessage("Added to cart!", "success");
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong.", "error");
    } finally {
      setAddingItem(null);
    }
  };

  const handleApplyFilter = () => {
    const min = minInput ? Number(minInput) : null;
    const max = maxInput ? Number(maxInput) : null;
    setMinPrice(min);
    setMaxPrice(max);
    setSelectedCategory(selectedCategoryInput);
  };

  const fuzzyMatch = (text, query) => {
    if (!query) return true;

    text = text.toLowerCase();
    query = query.toLowerCase();

    let tIndex = 0;
    let qIndex = 0;

    while (tIndex < text.length && qIndex < query.length) {
      if (text[tIndex] === query[qIndex]) {
        qIndex++;
      }
      tIndex++;
    }

    return qIndex === query.length;
  };

  const filteredProducts = useMemo(() => {
    const selected = (selectedCategory || "All").toLowerCase();
    const query = (searchTerm || "").trim().toLowerCase();

    let filtered = (products || []).filter((p) => {
      const variants = Array.isArray(p.variants) ? p.variants : [];

      const lowestPrice =
        variants.length > 0
          ? Math.min(...variants.map((v) => Number(v.price || 0)))
          : 0;

      const productCategory = (p.category_name || p.category?.name || "")
        .toString()
        .toLowerCase();

      const matchesCategory =
        selected === "all" || productCategory === selected;

      const matchesPrice =
        !minPrice ||
        !maxPrice ||
        (lowestPrice >= minPrice && lowestPrice <= maxPrice);

      const title = (p.title || "").toString().toLowerCase();

      const matchesSearch = query === "" || fuzzyMatch(title, query);

      return matchesCategory && matchesPrice && matchesSearch;
    });

    return filtered;
  }, [products, selectedCategory, minPrice, maxPrice, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen mt-20 relative">
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

      <div className="container mx-auto px-4 lg:px-12 py-12">
        <div className="flex justify-between mb-6 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 w-full lg:w-1/3"
          />

          <button
            className="ml-4 lg:hidden bg-black text-white px-4 py-2 rounded"
            onClick={() => setMobileFilterOpen(true)}
          >
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1 sticky top-28">
            <FilterContent
              categories={categories}
              selectedCategory={selectedCategoryInput}
              setSelectedCategory={setSelectedCategoryInput}
              minInput={minInput}
              setMinInput={setMinInput}
              maxInput={maxInput}
              setMaxInput={setMaxInput}
              handleApplyFilter={handleApplyFilter}
            />
          </aside>

          <div className="lg:col-span-3">
            {!loading && (
              <p className="text-sm text-gray-600 mb-4">
                {filteredProducts.length} products found
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show skeletons while loading */}
              {loading && (
                <>
                  {[...Array(9)].map((_, i) => (
                    <SkeletonProductCard key={`skeleton-${i}`} />
                  ))}
                </>
              )}

              {/* Show actual products after loading */}
              {!loading &&
                filteredProducts.map((product) => {
                  const variants = Array.isArray(product.variants)
                    ? product.variants
                    : [];
                  const firstVariantId = variants[0]?.id;

                  const isWishlisted = firstVariantId
                    ? wishlist.includes(firstVariantId)
                    : false;

                  const prices = variants.map((v) => Number(v.price || 0));
                  const mrps = variants.map((v) => Number(v.mrp || 0));

                  const lowestPrice = prices.length ? Math.min(...prices) : 0;
                  const highestMRP = mrps.length ? Math.max(...mrps) : 0;

                  const discount =
                    highestMRP > 0
                      ? Math.round(
                          ((highestMRP - lowestPrice) / highestMRP) * 100,
                        )
                      : 0;

                  const totalStock = variants.reduce(
                    (sum, v) => sum + Number(v.stock || 0),
                    0,
                  );

                  return (
                    <div
                      key={product.id}
                      className="bg-white relative overflow-hidden border border-gray-100 hover:border-gray-400 rounded-lg shadow-sm flex flex-col transition-all duration-300 group"
                    >
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className="absolute top-4 right-4 text-xl z-10 transition-transform hover:scale-110"
                        disabled={togglingWishlist === firstVariantId}
                        title={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {isWishlisted ? (
                          <FaHeart className="text-red-600" />
                        ) : (
                          <FaRegHeart className="text-red-600 hover:text-red-700" />
                        )}
                      </button>

                      <div className="w-full aspect-square overflow-hidden">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image1}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </Link>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold text-md mb-2">
                          {product.title}
                        </h3>

                        <div className="flex gap-2 items-center text-green-600 mb-3">
                          <strong className="text-2xl">₹{lowestPrice}</strong>
                          {highestMRP > 0 && (
                            <>
                              <span className="line-through text-red-400 text-lg">
                                ₹{highestMRP}
                              </span>
                              {discount > 0 && (
                                <span className="text-green-600 text-lg">
                                  {discount}% off
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        {totalStock < 1 ? (
                          <button
                            className="bg-gray-400 text-white w-full py-2 mt-auto rounded"
                            disabled
                          >
                            Out of Stock
                          </button>
                        ) : (
                          <button
                            className="bg-black text-white w-full py-2 mt-auto hover:bg-gray-800 transition-colors rounded"
                            onClick={() =>
                              handleAddToCart(firstVariantId, product.id)
                            }
                            disabled={
                              addingItem === product.id || !firstVariantId
                            }
                          >
                            {addingItem === product.id
                              ? "Adding…"
                              : "Add to Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed mt-12 inset-0 bg-black/50 z-40 flex justify-center items-start pt-20">
          <div className="bg-white w-11/12 max-w-sm rounded shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-lg"
              onClick={() => setMobileFilterOpen(false)}
            >
              ✕
            </button>
            <FilterContent
              categories={categories}
              selectedCategory={selectedCategoryInput}
              setSelectedCategory={setSelectedCategoryInput}
              minInput={minInput}
              setMinInput={setMinInput}
              maxInput={maxInput}
              setMaxInput={setMaxInput}
              handleApplyFilter={handleApplyFilter}
              onApplyFilter={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
