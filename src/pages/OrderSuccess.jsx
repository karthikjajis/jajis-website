import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { API } from "../config/api";
import { Btn, eyebrow } from "../components/ui";

const inr = (v) =>
  `₹${Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Shown straight after a successful payment. */
export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    API.get(`/orders/${id}/`)
      .then((r) => alive && setOrder(r.data))
      .catch(() => alive && setError("We couldn't load the order details, but your payment was received."));
    return () => { alive = false; };
  }, [id]);

  const addr = order?.shipping_address;
  const placed = order?.created_at
    ? new Date(order.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "";

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <CheckCircle className="mx-auto text-black" size={56} strokeWidth={1.25} />
          <p className={`${eyebrow} mt-6`}>Payment successful</p>
          <h1 className="text-3xl md:text-5xl mt-3">Thank you for your order</h1>
          <p className="mt-4 text-gray-600">
            Order <b className="text-black">#{id}</b> is confirmed. A confirmation is on its way to your email and WhatsApp,
            and we'll message you again when it ships.
          </p>
        </div>

        {error && <p className="mt-10 text-center text-gray-600">{error}</p>}

        {!order && !error && (
          <div className="mt-12 space-y-3 animate-pulse" aria-label="Loading order">
            <div className="h-20 bg-gray-100" />
            <div className="h-20 bg-gray-100" />
          </div>
        )}

        {order && (
          <div className="mt-12 border border-gray-200">
            <div className="flex flex-wrap justify-between gap-2 px-6 py-4 border-b border-gray-200 text-sm">
              <span>Order <b>#{order.id}</b></span>
              <span className="text-gray-600">{placed}</span>
            </div>

            <ul className="divide-y divide-gray-200">
              {order.items.map((it) => (
                <li key={it.id} className="flex gap-4 px-6 py-4 items-center">
                  {it.product_image && (
                    <img src={it.product_image} alt="" className="w-16 h-16 object-cover bg-gray-50 flex-none" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{it.product_title}</p>
                    <p className="text-sm text-gray-600">
                      {it.variant?.quantity_label ? `${it.variant.quantity_label} · ` : ""}Qty {it.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{inr(it.total_price)}</p>
                </li>
              ))}
            </ul>

            <div className="px-6 py-4 border-t border-gray-200 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span><span>{Number(order.shipping_cost) > 0 ? inr(order.shipping_cost) : "Free"}</span>
              </div>
              <div className="flex justify-between text-base font-medium">
                <span>Total paid</span><span>{inr(order.total_amount)}</span>
              </div>
              {order.razorpay_payment_id && (
                <p className="text-xs text-gray-500 pt-1">Payment ID: {order.razorpay_payment_id}</p>
              )}
            </div>

            {addr && (
              <div className="px-6 py-4 border-t border-gray-200 text-sm">
                <p className={eyebrow}>Delivering to</p>
                <p className="mt-2">
                  {[addr.line1, addr.line2, addr.city, addr.state, addr.postal_code].filter(Boolean).join(", ")}
                </p>
                {addr.phone && <p className="text-gray-600">Phone: {addr.phone}</p>}
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Btn to="/myorders">Track my orders</Btn>
          <Btn to="/products" variant="outline">Continue shopping</Btn>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
          Questions about your order? See our <Link to="/return-policy" className="underline">return &amp; refund policy</Link> or{" "}
          <Link to="/contact" className="underline">contact us</Link>.
        </p>
      </div>
    </section>
  );
}
