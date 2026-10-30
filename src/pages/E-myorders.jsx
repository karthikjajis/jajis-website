import React, { useEffect, useMemo, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Copy,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
} from "lucide-react";
import { API } from "../config/api";
import { Link } from "react-router-dom";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get("/orders/");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Orders fetch failed", err);
        setError("Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const normalizeStatus = (status) => {
    if (!status) return "pending";
    const s = String(status).toLowerCase();
    // Back-compat: old orders created with "processing" should display as confirmed per your requirement
    if (s === "processing") return "confirmed";
    return s;
  };

  const getStatusLabel = (status) => {
    const s = normalizeStatus(status);
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getStatusIcon = (status) => {
    const s = normalizeStatus(status);

    switch (s) {
      case "delivered":
        return <CheckCircle size={18} className="text-green-600" />;
      case "shipped":
        return <Truck size={18} className="text-blue-500" />;
      case "confirmed":
      case "pending":
      case "processing":
        return <Clock size={18} className="text-yellow-500" />;
      default:
        return <Package size={18} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    const s = normalizeStatus(status);
    if (s === "delivered") return "text-green-600";
    if (s === "shipped") return "text-blue-500";
    return "text-yellow-600";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatMoney = (value) => {
    const n = Number(value || 0);
    return `₹${n.toFixed(2)}`;
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text));
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const renderAddress = (addr) => {
    if (!addr) return <span className="text-gray-500">N/A</span>;

    const parts = [
      addr.label ? `${addr.label}:` : null,
      addr.line1,
      addr.line2,
      addr.city,
      addr.state,
      addr.postal_code,
      addr.country,
      addr.phone ? `Phone: ${addr.phone}` : null,
    ].filter(Boolean);

    return <div className="text-sm text-gray-700">{parts.join(", ")}</div>;
  };

  const ordersSorted = useMemo(() => {
    return [...orders].sort((a, b) => {
      const da = new Date(a.created_at || 0).getTime();
      const db = new Date(b.created_at || 0).getTime();
      return db - da;
    });
  }, [orders]);

  const getExpectedDelivery = (createdAt) => {
    if (!createdAt) return "N/A";

    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    return deliveryDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
    <div className="bg-white min-h-screen">
      <header className="bg-white sticky top-0 z-40 mt-24">
        <div className="container mx-auto px-4 lg:px-12 py-6 flex flex-col items-center text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-black tracking-tight">
            My Orders
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track your past and current purchases
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-12 py-12 space-y-8">
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {!error && ordersSorted.length === 0 && (
          <div className="text-center text-gray-600 py-16">
            <p>No orders yet. Start shopping to see them here.</p>
            <Link to="/products" className="inline-block mt-6 bg-black text-white px-6 py-3 font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        )}

        {ordersSorted.map((order) => {
          const isOpen = openOrderId === order.id;
          const statusLabel = getStatusLabel(order.status);

          const items = Array.isArray(order.items) ? order.items : [];
          const firstItem = items[0];
          const previewImage =
            order.first_product_image ||
            firstItem?.product_image ||
            firstItem?.variant?.product?.image1 ||
            null;

          const previewTitle =
            order.first_product_title ||
            firstItem?.product_title ||
            firstItem?.variant?.product?.title ||
            "Order items";

          const itemsCount =
            typeof order.items_count === "number"
              ? order.items_count
              : items.length;

          return (
            <div
              key={order.id}
              className="border border-gray-200 hover:border-gray-900 shadow-sm rounded-lg overflow-hidden bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="text-black font-medium">#{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="text-black font-medium">
                      {formatDate(order.created_at)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Expected Delivery:{" "}
                    <span className="text-black font-medium">
                      {getExpectedDelivery(order.created_at)}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  {getStatusIcon(order.status)}
                  <span
                    className={`text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {statusLabel}
                  </span>

                  <button
                    className="ml-2 inline-flex items-center gap-1 text-sm text-black border border-gray-200 bg-white hover:bg-gray-100 px-3 py-1.5 rounded-xl"
                    onClick={() => setOpenOrderId(isOpen ? null : order.id)}
                  >
                    {isOpen ? (
                      <>
                        Hide <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Details <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={
                        previewImage ||
                        "https://via.placeholder.com/120?text=Product"
                      }
                      alt={previewTitle || "Product"}
                      className="w-full h-full object-cover rounded-md bg-gray-100"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/120?text=Product";
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-black">
                      {previewTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {itemsCount} item{itemsCount > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {formatMoney(order.total_amount)}
                    </p>
                  </div>
                </div>

                <div className="sm:ml-auto flex flex-col gap-2">
                  <div className="text-sm text-gray-600">
                    Payment status:{" "}
                    <span className="font-semibold text-black">
                      {order.payment_status || "N/A"}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    Method:{" "}
                    <span className="font-semibold text-black">
                      {order.payment_method || "N/A"}
                    </span>
                  </div>

                  {/* Razorpay details */}
                  <div className="text-xs text-gray-600">
                    Razorpay Payment ID:{" "}
                    <span className="text-black font-medium">
                      {order.razorpay_payment_id ||
                        order.transaction_id ||
                        "N/A"}
                    </span>
                    {(order.razorpay_payment_id || order.transaction_id) && (
                      <button
                        className="ml-2 text-blue-600 underline inline-flex items-center"
                        onClick={() =>
                          copyText(
                            order.razorpay_payment_id || order.transaction_id
                          )
                        }
                        title="Copy payment id"
                      >
                        <Copy size={12} />
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-gray-600">
                    Razorpay Order ID:{" "}
                    <span className="text-black font-medium">
                      {order.razorpay_order_id || "N/A"}
                    </span>
                    {order.razorpay_order_id && (
                      <button
                        className="ml-2 text-blue-600 underline inline-flex items-center"
                        onClick={() => copyText(order.razorpay_order_id)}
                        title="Copy order id"
                      >
                        <Copy size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-6 pb-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-black font-semibold mb-2">
                        <MapPin size={16} /> Shipping Address
                      </div>
                      {renderAddress(order.shipping_address)}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-black font-semibold mb-3">
                      <CreditCard size={16} /> Payment Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>
                        <span className="text-gray-500">Total:</span>{" "}
                        <span className="font-semibold text-black">
                          {formatMoney(order.total_amount)}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-500">Shipping:</span>{" "}
                        <span className="font-semibold text-black">
                          {formatMoney(order.shipping_cost)}
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Transaction ID:</span>{" "}
                        <span className="font-semibold text-black">
                          {order.transaction_id || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-black font-semibold mb-3">Items</div>

                    {items.length === 0 ? (
                      <div className="text-sm text-gray-500">
                        No items found.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map((it) => {
                          const img =
                            it.product_image ||
                            it?.variant?.product?.image1 ||
                            "https://via.placeholder.com/120?text=Product";
                          const title =
                            it.product_title ||
                            it?.variant?.product?.title ||
                            "Product";
                          const qty = Number(it.quantity || 0);

                          return (
                            <div
                              key={it.id}
                              className="flex items-center gap-4 border border-gray-100 rounded-lg p-3"
                            >
                              <img
                                src={img}
                                alt={title}
                                className="w-14 h-14 object-cover rounded bg-gray-100"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/120?text=Product";
                                }}
                              />

                              <div className="flex-1">
                                <div className="text-sm font-semibold text-black">
                                  {title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Qty: {qty} • Unit:{" "}
                                  {formatMoney(it.unit_price)} • Total:{" "}
                                  {formatMoney(it.total_price)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
