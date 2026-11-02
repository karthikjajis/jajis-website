import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import QCafeBooking from "../components/QCafeBooking";

import heroLeft from "../assets/img/home-bridal.webp";
import heroRight from "../assets/img/home-hero-makeup.webp";
import salonFront from "../assets/img/home-salon-front.webp";
import spa from "../assets/img/home-spa.webp";
import hojImg from "../assets/img/house-of-jajis.webp";
// Tile photos (AI-generated in Canva, free to use) served from the site's Supabase storage.
const TILE = (name) => `https://tbkvtcuqszgmahzswspe.supabase.co/storage/v1/object/public/site/${name}`;
const tileSalon = TILE("tile-salon.jpg");
const tileCosmetics = TILE("tile-cosmetics.jpg");
const tileAcademy = TILE("tile-academy.jpg");
const tileEventHall = TILE("tile-eventhall.jpg");
const tileFoodCourt = TILE("tile-foodcourt.jpg");
const tileDesign = TILE("tile-design.jpg");
import { addToAnyCart } from "../utils/guestCart";

const btnSolid =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 bg-black text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-800 transition-colors";
const btnOutline =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 border border-black text-black text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-black hover:text-white transition-colors";
const btnLight =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 bg-white text-black text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-200 transition-colors";
const btnGhostLight =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 border border-white text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors";

const worlds = [
  { title: "Find a salon", to: "/salons", img: tileSalon, alt: "A luxury salon with brass-framed mirrors" },
  { title: "Cosmetics", to: "/cosmetics", img: tileCosmetics, alt: "Skin care and makeup products on stone" },
  { title: "Academy", to: "/academy", img: tileAcademy, alt: "A trainer teaching haircutting to students" },
  { title: "Q Café & Event Hall", to: "/event-hall", img: tileEventHall, alt: "An event hall decorated with white flowers and warm lights" },
  { title: "Food Court", to: "/food-court", img: tileFoodCourt, alt: "An open-air food court lit up at night" },
  { title: "Designing & Stitching", to: "/designing-stitching", img: tileDesign, alt: "Hand embroidery in gold thread on silk" },
];

const stats = [
  ["2002", "Serving Kerala since"],
  ["1 million+", "Happy customers"],
  ["200+", "Expert staff"],
  ["7", "Businesses, one brand"],
];

const FEATURED = ["amla", "face wash", "hair growth", "sunscreen"];

function pickBestsellers(products) {
  const chosen = [];
  for (const key of FEATURED) {
    const p = products.find((x) => (x.title || "").toLowerCase().includes(key) && !chosen.includes(x));
    if (p) chosen.push(p);
  }
  for (const p of products) {
    if (chosen.length >= 4) break;
    if (!chosen.includes(p)) chosen.push(p);
  }
  return chosen.slice(0, 4);
}

const rupees = (n) => `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

function ProductCard({ product, onAdd, adding }) {
  const v = (product.variants || [])[0];
  const price = v ? Number(v.price) : null;
  const mrp = v ? Number(v.mrp) : null;
  const off = price && mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const outOfStock = v && Number(v.stock) <= 0;

  return (
    <div className="flex flex-col gap-2">
      <Link to={`/product/${product.id}`} className="relative block bg-gray-100 p-6 group">
        {off > 0 && (
          <span className="absolute top-3 left-3 bg-black text-white text-[0.7rem] tracking-[0.12em] px-2 py-1">
            −{off}%
          </span>
        )}
        <img
          src={product.image1}
          alt={product.title}
          loading="lazy"
          width="300"
          height="300"
          className="w-full aspect-square object-contain group-hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>
      <Link
        to={`/product/${product.id}`}
        className="mt-2 text-[0.9rem] font-medium tracking-[0.08em] uppercase leading-snug hover:underline underline-offset-4"
      >
        {product.title}
      </Link>
      {v?.quantity_label && <p className="text-sm text-gray-600">{v.quantity_label}</p>}
      {price != null && (
        <p className="font-medium">
          {rupees(price)} {off > 0 && <s className="text-gray-500 font-normal">{rupees(mrp)}</s>}
        </p>
      )}
      <button
        type="button"
        disabled={!v || outOfStock || adding}
        onClick={() => onAdd(v.id)}
        className="mt-auto min-h-12 bg-black text-white text-[0.75rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
      >
        {outOfStock ? "Out of stock" : adding ? "Adding…" : "Add to cart"}
      </button>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <div className="bg-gray-100 aspect-square animate-pulse" />
      <div className="h-4 bg-gray-100 w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-100 w-1/3 animate-pulse" />
      <div className="h-12 bg-gray-100 animate-pulse" />
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let alive = true;
    API.get("products/")
      .then((res) => alive && setProducts(pickBestsellers(res.data?.products || [])))
      .catch(() => alive && setProducts([]));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = async (variantId) => {
    setAddingId(variantId);
    try {
      await addToAnyCart(variantId, 1);
      setToast("Added to your cart");
    } catch {
      setToast("Couldn’t add to cart. Please try again.");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="bg-white text-black pt-24">
      {/* ---------- Hero ---------- */}
      <section className="relative grid md:grid-cols-2 h-[78vh] min-h-[520px] max-h-[820px] bg-black">
        <img src={heroLeft} alt="Bride styled by Jaji's" fetchpriority="high" width="1200" height="800" className="w-full h-full object-cover" />
        <img src={heroRight} alt="Makeup artist at work in a Jaji's salon" loading="lazy" width="1200" height="800" className="hidden md:block w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-end text-center text-white px-6 pb-16 md:pb-20 gap-6">
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-7xl">
            Welcome to the
            <br />
            world of Jaji’s
          </h1>
          <p className="text-base md:text-lg tracking-wide max-w-xl">
            Where beauty isn’t just experienced — it’s created. Salons, academy and our own skin &amp; hair care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/salons" className={btnLight}>
              Book here
            </Link>
            <Link to="/products" className={btnGhostLight}>
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Bestsellers ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl">Shop our bestsellers</h2>
          <p className="mt-3 text-gray-600">Made by Jaji’s Research, used in our own salons.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7">
          {products === null
            ? Array.from({ length: 4 }, (_, i) => <ProductSkeleton key={i} />)
            : products.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} adding={addingId === p.variants?.[0]?.id} />
              ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/products" className={btnOutline}>
            Shop all
          </Link>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-xl md:text-2xl">Kerala’s family salon since 2002</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Jaji’s Innovation runs unisex beauty salons and bridal makeup studios in Kollam, Karunagappally, Sasthamcotta,
          Paravur and Thiruvananthapuram — along with Jaji’s Academy, the Q Café &amp; Event Hall and Food Court in
          Kollam, and our own Jaji’s Research hair and skin care, available to order online across India.
        </p>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="border-y border-gray-200">
        <dl className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([n, label]) => (
            <div key={label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{label}</dt>
              <dd className="text-3xl md:text-4xl font-light tracking-[0.06em]">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Explore our world ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
        <h2 className="text-2xl md:text-4xl text-center mb-12">Explore our world</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {worlds.map((w) => (
            <Link key={w.to} to={w.to} className="relative block aspect-[4/5] overflow-hidden bg-black group">
              <img
                src={w.img}
                alt={w.alt}
                loading="lazy"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition duration-500"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/75 to-transparent text-white text-center text-[0.75rem] md:text-[0.85rem] font-medium tracking-[0.18em] uppercase">
                {w.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- House of Jaji's (coming soon) ---------- */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24 grid gap-12 md:grid-cols-2 items-center">
          <img
            src={hojImg}
            alt="Architect's render of House of Jaji's in Kollam"
            loading="lazy"
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="flex flex-col gap-6">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-400">Coming soon · Kollam</p>
            <h2 className="text-3xl md:text-5xl font-light">House of Jaji’s</h2>
            <p className="text-[0.8rem] font-medium tracking-[0.2em] uppercase">Hair · Skin · Academy</p>
            <p className="text-gray-300 leading-relaxed max-w-lg">
              A new 13,000 sq ft home for the Jaji’s Group — Jaji’s Signature Skin &amp; Hair Clinic, a salon affordable to all, our premium
              Jaji’s Luxe lounge and the academy, under one roof. Now in its final stage of completion.
            </p>
            <ul className="grid grid-cols-2 gap-x-6 border-t border-gray-700 text-sm">
              {[
                ["Ground floor", "Jaji’s Signature Skin & Hair Clinic"],
                ["First floor", "Salon for all"],
                ["Second floor", "Jaji’s Luxe"],
                ["Plus", "Jaji’s Academy"],
              ].map(([f, n]) => (
                <li key={n} className="border-b border-gray-700 py-3">
                  <span className="block text-[0.7rem] tracking-[0.18em] uppercase text-gray-400">{f}</span>
                  {n}
                </li>
              ))}
            </ul>
            <div>
              <Link to="/house-of-jajis" className={btnGhostLight}>
                Discover House of Jaji’s
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Q Café hall booking (live calendar from jajisqcafe.com) ---------- */}
      <div className="border-t border-gray-200">
        <QCafeBooking />
      </div>

      {/* ---------- Booking feature ---------- */}
      <section className="grid md:grid-cols-2 bg-gray-100">
        <img src={salonFront} alt="Front of a Jaji's salon" loading="lazy" className="w-full h-full min-h-[320px] md:min-h-[560px] object-cover" />
        <div className="px-6 py-16 md:px-16 flex flex-col justify-center gap-6">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-600">Since 2002 · Kollam</p>
          <h2 className="text-3xl md:text-5xl font-light">Your beauty journey starts here</h2>
          <p className="text-gray-700 max-w-md">
            Hair, skin, bridal and spa — by stylists trained to international standards, in salons across Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/salons" className={btnSolid}>
              Book now
            </Link>
            <Link to="/contact" className={btnOutline}>
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Franchise ---------- */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 md:py-24 text-center flex flex-col items-center gap-6">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-400">Franchise</p>
          <h2 className="text-3xl md:text-5xl font-light">Own a legacy. Build your success with Jaji’s.</h2>
          <p className="text-gray-300 max-w-2xl">
            Training, branding, interior set-up, product supply and ongoing mentoring — the same model behind our
            Shashtamcotta and Paravur franchises.
          </p>
          <Link to="/franchise" className={btnGhostLight}>
            Explore the franchise
          </Link>
        </div>
      </section>

      {/* Confirmation after adding to cart */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-[120] bg-black text-white px-6 py-3 text-sm tracking-wide transition-opacity ${
          toast ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {toast}
        {toast === "Added to your cart" && (
          <Link to="/cart" className="ml-4 underline underline-offset-4">
            View cart
          </Link>
        )}
      </div>
    </div>
  );
}
