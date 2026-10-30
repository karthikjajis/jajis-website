import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import QCafeBooking from "../components/QCafeBooking";
import "./home.css";

import bridal from "../assets/img/home-bridal.webp";
import makeup from "../assets/img/home-hero-makeup.webp";
import salonFront from "../assets/img/home-salon-front.webp";
import salonChairs from "../assets/img/saloon-7.webp";
import salonHair from "../assets/img/saloon-1.webp";
import salonFloor from "../assets/img/saloon-8.webp";
import spaRooms from "../assets/img/saloon-3.webp";
import salonSign from "../assets/img/saloon-4.webp";
import cream from "../assets/img/images-cosmatics.webp";
import founder from "../assets/img/management-jaji-main-image.webp";
import hallCrowd from "../assets/img/event-hall-2.webp";
import foodCourt from "../assets/img/foodcourt-1.webp";
import embroidery from "../assets/img/design-6.webp";
import academy from "../assets/img/management-jajis.webp";

/* ---------- Content ---------- */

const reel = [
  { src: makeup, alt: "A Jaji's artist doing a client's makeup" },
  { src: bridal, alt: "A bride styled by Jaji's with Dr. Jajimole" },
  { src: salonChairs, alt: "Styling chairs inside a Jaji's salon" },
  { src: salonFront, alt: "The front of a Jaji's Innovation salon" },
  { src: spaRooms, alt: "Spa rooms in a Jaji's salon" },
];

const services = [
  {
    name: "Cuts and styling",
    note: "Men, women, children",
    text: "Precision cuts, blow-dries and styling for the whole family, by stylists trained to international standards.",
    img: salonHair,
    alt: "A stylist finishing a client's hair",
  },
  {
    name: "Hair colour",
    note: "Schwarzkopf Professional",
    text: "Global colour, highlights and corrections with Schwarzkopf Professional colour, matched to your skin and hair.",
    img: salonChairs,
    alt: "Colour stations inside a Jaji's salon",
  },
  {
    name: "Keratin and hair care",
    note: "Treatments",
    text: "Keratin smoothing, hair spa and scalp treatments, followed by aftercare with our own Jaji's Research products.",
    img: salonFloor,
    alt: "A Jaji's salon floor with wash stations",
  },
  {
    name: "Skin and facials",
    note: "Spa rooms",
    text: "Facials, clean-ups and skin treatments in private spa rooms, using the same skin care we make and sell.",
    img: spaRooms,
    alt: "Private spa rooms with treatment beds",
  },
  {
    name: "Bridal makeup",
    note: "Bridal and party",
    text: "Bride and family makeup and hairstyling for the wedding day, the engagement and the reception.",
    img: bridal,
    alt: "A bride in gold styled by Jaji's",
  },
  {
    name: "Makeup",
    note: "Events and shoots",
    text: "Makeup for parties, photo shoots and stage, from the team behind our fashion-show work.",
    img: makeup,
    alt: "A Jaji's artist applying makeup",
  },
];

const houses = [
  {
    name: "Dr. Jajimole K.",
    short: "The founder",
    role: "The Jaji in Jaji's · founder, 2002",
    text: "She opened the first salon in Kollam in 2002. Everything below grew from that one chair.",
    img: founder,
    alt: "Dr. Jajimole K., founder of Jaji's, holding makeup brushes",
    to: "/management",
    go: "Our management",
  },
  {
    name: "Jaji's Academy",
    short: "Academy",
    role: "Hair and beauty education",
    text: "Courses in hairdressing, makeup and skin, taught by the people who run our salons.",
    img: academy,
    alt: "Dr. Jajimole doing a client's makeup",
    to: "/academy",
    go: "See the courses",
  },
  {
    name: "Jaji's Q Café & Event Hall",
    short: "Q Café & Event Hall",
    role: "Ashramam, Kollam",
    text: "An air-conditioned hall for weddings, birthdays, exhibitions and meetings, with a café beside it.",
    img: hallCrowd,
    alt: "Guests at an event in the Q Café hall",
    to: "/event-hall",
    go: "About the hall",
  },
  {
    name: "Jaji's Food Court",
    short: "Food Court",
    role: "Ashramam Maidanam, Kollam",
    text: "An open-air food court under the trees, lit up every evening.",
    img: foodCourt,
    alt: "Jaji's Food Court lit up at night",
    to: "/food-court",
    go: "See the food court",
  },
  {
    name: "Jaji's Designing & Stitching",
    short: "Designing & Stitching",
    role: "Polayathodu, Kollam",
    text: "Bridal wear, embroidery and tailoring for women, made by hand in our own studio.",
    img: embroidery,
    alt: "Hand embroidery on a frame at the studio",
    to: "/designing-stitching",
    go: "Visit the studio",
  },
  {
    name: "A Jaji's of your own",
    short: "Franchise",
    role: "Franchise",
    text: "Training, branding, interiors and product supply, the model behind our Shashtamcotta and Paravur salons.",
    img: salonSign,
    alt: "A Jaji's Innovation sign at a salon entrance",
    to: "/franchise",
    go: "Explore the franchise",
  },
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

/* ---------- Motion helpers ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Progress (0..1) of a tall wrapper as its sticky stage is held.
function useHoldProgress(ref, onProgress) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      onProgress(Math.min(1, Math.max(0, span > 0 ? -r.top / span : 0)));
    };
    const onScroll = () => raf || (raf = requestAnimationFrame(tick));
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, onProgress]);
}

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced() || !("IntersectionObserver" in window)) return;
    root.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    root.querySelectorAll("[data-rv]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [rootRef]);
}

/* ---------- Sections ---------- */

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % reel.length), 3600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="jh-hero" aria-labelledby="jh-title">
      <h1 id="jh-title" className="jh-hero__title">
        <span>Kerala’s salon</span> <span>since 2002</span>
      </h1>
      <div className="jh-hero__reel">
        <div className="jh-hero__track" style={{ transform: `translateY(${-idx * 100}%)` }}>
          {reel.map((r, i) => (
            <div className="jh-hero__frame" key={r.alt} style={{ top: `${i * 100}%` }} aria-hidden={i !== idx}>
              <img
                src={r.src}
                alt={r.alt}
                width="1200"
                height="750"
                className="jh-drift"
                {...(i === 0 ? { fetchpriority: "high" } : { loading: "lazy" })}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="jh-hero__row">
        <div className="jh-hero__foot" data-rv>
          <p>
            Jaji’s Innovation is a family of unisex salons across Kerala, with our own skin and hair care, an academy
            and a hall in Kollam.
          </p>
          <Link to="/salons" className="jh-btn">
            Book a salon
          </Link>
        </div>
        <div className="jh-hero__facts" data-rv style={{ "--i": 2 }}>
          <p>
            <strong>2002</strong>first salon, Kollam
          </p>
          <p>
            <strong>200+</strong>people on the team
          </p>
        </div>
      </div>
    </section>
  );
}

function Salon() {
  const [on, setOn] = useState(0);
  const rows = useRef([]);

  // On phones the active row follows the scroll: the row nearest the top band wins.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setOn(Number(e.target.dataset.i));
        }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="jh-section jh-wrap" aria-labelledby="jh-salon">
      <div className="jh-salon">
        <div className="jh-salon__pic">
          {services.map((s, i) => (
            <img key={s.name} src={s.img} alt={i === on ? s.alt : ""} loading="lazy" className={i === on ? "is-on" : ""} />
          ))}
        </div>
        <div className="jh-salon__body">
          <h2 id="jh-salon" className="jh-head" data-rv>
            In our salons
          </h2>
          <ul className="jh-rows">
            {services.map((s, i) => (
              <li key={s.name} ref={(el) => (rows.current[i] = el)} data-i={i} data-rv style={{ "--i": i }}>
                <button
                  type="button"
                  className={`jh-row ${i === on ? "is-on" : ""}`}
                  aria-expanded={i === on}
                  onClick={() => setOn(i)}
                  onMouseEnter={() => setOn(i)}
                  onFocus={() => setOn(i)}
                >
                  <span className="jh-row__line">
                    <span className="jh-row__name">{s.name}</span>
                    <span className="jh-row__note">{s.note}</span>
                  </span>
                  <span className="jh-row__desc">
                    <p>{s.text}</p>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="jh-salon__cta" data-rv>
            <Link to="/salons" className="jh-btn">
              Find your nearest salon
            </Link>
            <a href="tel:+919847024347" className="jh-btn jh-btn--quiet">
              Call +91 98470 24347
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const wrap = useRef(null);
  const [stage, setStage] = useState(reduced() ? 2 : 0);
  const onProgress = useRef((p) => setStage(p < 0.3 ? 0 : p < 0.66 ? 1 : 2)).current;
  useHoldProgress(wrap, onProgress);

  return (
    <section className="jh-show" ref={wrap} data-stage={stage} aria-labelledby="jh-show">
      <div className="jh-show__stage">
        <h2 id="jh-show" className="contents">
          <span className="jh-show__a">Made by</span>
          <span className="jh-show__b">
            <span>Jaji’s Research</span>
          </span>
        </h2>
        <div className="jh-show__frame">
          <img src={cream} alt="A jar of Jaji's Pimple Vanishing Cream with its box" loading="lazy" width="900" height="900" />
        </div>
        <p className="jh-show__note">
          Skin and hair care we make ourselves and use on every client in our salons.
        </p>
      </div>
    </section>
  );
}

function Shop() {
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
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    setAddingId(variantId);
    try {
      await API.post("cart/add/", { variant_id: variantId, quantity: 1 });
      setToast("Added to your cart");
    } catch {
      setToast("Couldn’t add to cart. Please try again.");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <section className="jh-section jh-wrap" aria-labelledby="jh-shop">
      <div className="jh-shop__head">
        <h2 id="jh-shop" className="jh-head" data-rv>
          Our bestsellers
        </h2>
        <Link to="/products" className="jh-btn jh-btn--quiet" data-rv>
          Shop all products
        </Link>
      </div>

      {products && products.length === 0 ? (
        <div className="jh-shop__empty">
          <img src={spaRooms} alt="Spa rooms where our products are used" loading="lazy" />
          <div className="flex flex-col gap-6 items-start">
            <p className="jh-lead">
              Face washes, creams, sunscreen and hair oils from Jaji’s Research, with secure online
              checkout.
            </p>
            <Link to="/products" className="jh-btn">
              Open the shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="jh-shop__grid">
          {(products || Array.from({ length: 4 }, () => null)).map((p, i) => {
            if (!p)
              return (
                <div key={i} className="jh-prod" aria-hidden="true">
                  <div className="jh-prod__img">
                    <div className="aspect-square" />
                  </div>
                </div>
              );
            const v = (p.variants || [])[0];
            const price = v ? Number(v.price) : null;
            const mrp = v ? Number(v.mrp) : null;
            const off = price && mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
            const out = v && Number(v.stock) <= 0;
            return (
              <div key={p.id} className="jh-prod" data-rv style={{ "--i": i }}>
                <Link to={`/product/${p.id}`} className="jh-prod__img">
                  <img src={p.image1} alt={p.title} loading="lazy" width="300" height="300" />
                </Link>
                <Link to={`/product/${p.id}`} className="jh-prod__name">
                  {p.title}
                </Link>
                {v?.quantity_label && <p className="jh-muted">{v.quantity_label}</p>}
                {price != null && (
                  <p>
                    <strong className="font-medium">{rupees(price)}</strong>{" "}
                    {off > 0 && (
                      <span className="jh-muted">
                        <s>{rupees(mrp)}</s> · {off}% off
                      </span>
                    )}
                  </p>
                )}
                <button
                  type="button"
                  className="jh-btn"
                  disabled={!v || out || addingId === v?.id}
                  onClick={() => addToCart(v.id)}
                >
                  {out ? "Out of stock" : addingId === v?.id ? "Adding…" : "Add to cart"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-24 md:bottom-8 z-[120] bg-black text-white px-6 py-3 transition-opacity ${
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
    </section>
  );
}

function Houses() {
  const wrap = useRef(null);
  const [poster, setPoster] = useState(false);
  const [on, setOn] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px) and (min-height: 640px)");
    const sync = () => setPoster(mq.matches && !reduced());
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onProgress = useRef((p) => setOn(Math.min(houses.length - 1, Math.floor(p * houses.length)))).current;
  useHoldProgress(wrap, onProgress);

  const jump = (i) => {
    const el = wrap.current;
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + span * ((i + 0.5) / houses.length), behavior: "smooth" });
  };

  return (
    <section
      ref={wrap}
      className={`jh-houses ${poster ? "is-poster" : ""}`}
      style={{ "--n": houses.length }}
      aria-labelledby="jh-houses"
    >
      <div className="jh-houses__stage">
        <h2 id="jh-houses" className="jh-houses__name">
          Jaji’s
        </h2>
        <div className="jh-houses__body">
          <ul className="jh-houses__list">
            {houses.map((h, i) => (
              <li key={h.name} className={`jh-house ${i === on ? "is-on" : ""}`}>
                <Link to={h.to} className="jh-house__pic" tabIndex={-1} aria-hidden="true" data-rv={poster ? undefined : ""}>
                  <img src={h.img} alt="" loading="lazy" width="800" height="1000" />
                </Link>
                <div className="jh-house__cap" aria-hidden={poster && i !== on ? true : undefined}>
                  <h3>{h.name}</h3>
                  <p className="jh-house__role">{h.role}</p>
                  <p className="jh-house__text">{h.text}</p>
                  <Link to={h.to} className="jh-house__go jh-link" tabIndex={poster && i !== on ? -1 : undefined}>
                    {h.go}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <ul className="jh-houses__index" aria-label="Jump to">
            {houses.map((h, i) => (
              <li key={h.name}>
                <button type="button" aria-current={i === on} onClick={() => jump(i)}>
                  {h.short}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BookBand() {
  return (
    <Link to="/salons" className="jh-cta" aria-label="Book a salon appointment">
      <span className="jh-cta__top">
        <p>Pick your nearest Jaji’s salon and choose a time online.</p>
        <svg className="jh-cta__arrow" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M12 36 36 12M16 12h20v20" />
        </svg>
      </span>
      <span className="jh-cta__word" aria-hidden="true" data-rv>
        Book
      </span>
    </Link>
  );
}

export default function Home() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div className="jh pt-20" ref={root}>
      <Hero />
      <Salon />
      <Showcase />
      <Shop />
      <Houses />
      <QCafeBooking />
      <BookBand />
    </div>
  );
}
