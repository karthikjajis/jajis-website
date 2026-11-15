import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaClock } from "react-icons/fa";
import { KOLLAM_FAQ } from "../business-data";
import { btn, eyebrow, wrap } from "../components/ui";
import heroImg from "../assets/img/home-salon-interior.webp";
import bridalImg from "../assets/img/home-bridal.webp";
import frontImg from "../assets/img/home-salon-front.webp";

// Landing page for "best salon in Kollam" / "salon in Kollam" / "beauty parlour Kollam" searches.
// Ratings are the Google ratings of each listing (checked Nov 2026) — update them now and then.

const SALONS = [
  {
    name: "Jaji's Innovation – RP Mall",
    tag: "Unisex salon · Bride & groom makeover studio · Signature Skin & Hair Clinic",
    address: "4th Floor, RP Mall, Taluk Kachery, Kollam 691001",
    hours: "Open every day, 10 AM – 9 PM",
    phone: "+91 98479 48242",
    rating: 4.6,
    reviews: 5991,
    maps: "https://maps.google.com/maps?cid=13380967138692215987",
    book: "/book?salon=rp%20mall",
  },
  {
    name: "Jaji's Express Family Salon – Polayathodu",
    tag: "Family salon · Bride & groom lounge · Next to our Designing & Stitching studio",
    address: "1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam 691010",
    hours: "Open every day, 9 AM – 9 PM",
    phone: "+91 97440 12345",
    rating: 4.6,
    reviews: 2479,
    maps: "https://maps.google.com/maps?cid=13618422525367905929",
    book: "/book?salon=polayathodu",
  },
];

const SERVICES = [
  ["Haircuts & styling", "Precision cuts for women, men and kids, blow-dries, party styling and updos."],
  ["Hair colour", "Global colour, highlights, balayage and grey coverage with professional brands."],
  ["Hair treatments", "Keratin, smoothening, hair botox, scalp and hair-fall treatments, hair spa."],
  ["Facials & skin", "Clean-ups, glow and de-tan facials, acne care and advanced skin treatments at our Signature Skin & Hair Clinic."],
  ["Bridal & groom makeover", "Bridal makeup, saree draping, hairstyling and pre-wedding packages for brides and grooms."],
  ["Hands, feet & waxing", "Manicure, pedicure, nail care, threading and waxing."],
];

const AREAS = [
  "Chinnakada", "Asramam", "Kadappakada", "Polayathodu", "Pallimukku", "Thevally", "Kilikollur", "Mundakkal",
  "Eravipuram", "Ayathil", "Kavanad", "Sakthikulangara", "Kottiyam", "Kundara", "Chathannoor",
];

const totalReviews = SALONS.reduce((s, x) => s + x.reviews, 0);

export default function KollamSalons() {
  return (
    <div className="bg-white text-black pt-24">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[760px] bg-black">
        <img src={heroImg} alt="Inside Jaji's salon at RP Mall, Kollam" fetchpriority="high" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-end text-center text-white px-6 pb-14 md:pb-20 gap-5">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-200">Kollam's family salon since 2002</p>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl max-w-4xl">Best salon in Kollam for hair, skin &amp; bridal</h1>
          <p className="text-base md:text-lg max-w-2xl">
            <FaStar className="inline -mt-1 mr-1" aria-hidden="true" />4.6 on Google from {totalReviews.toLocaleString("en-IN")}+ reviews
            across our two Kollam salons — RP Mall and Polayathodu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/book" className={btn.light}>Book an appointment</Link>
            <a href="#kollam-salons" className={btn.ghostLight}>Find us in Kollam</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={`${wrap} py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center`}>
        <div>
          <p className={eyebrow}>Why Kollam chooses Jaji's</p>
          <h2 className="text-3xl md:text-4xl mt-3">A unisex salon and bridal studio trusted by Kollam for over 20 years</h2>
          <div className="mt-6 space-y-4 text-gray-700 leading-relaxed">
            <p>
              Jaji's Innovation started in Kollam in 2002 and has grown into one of Kerala's best-known salon families, with
              more than 200 trained team members. Our two Kollam city salons — at RP Mall and Polayathodu — offer haircuts,
              colour, keratin and smoothening, facials and skin treatments, and complete bride and groom makeovers.
            </p>
            <p>
              We also run Jaji's Academy for beauty and hairdressing, and our own Jaji's Research hair and skin care is tested
              in our salons. Book online in a minute, or walk in — we're open every day.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-3 gap-4 text-center">
            <li className="border border-gray-200 py-5"><b className="block text-2xl">4.6★</b><span className="text-xs text-gray-600">Google rating</span></li>
            <li className="border border-gray-200 py-5"><b className="block text-2xl">{(Math.floor(totalReviews / 100) * 100).toLocaleString("en-IN")}+</b><span className="text-xs text-gray-600">Google reviews in Kollam</span></li>
            <li className="border border-gray-200 py-5"><b className="block text-2xl">2002</b><span className="text-xs text-gray-600">Serving Kollam since</span></li>
          </ul>
        </div>
        <img src={frontImg} alt="Jaji's salon in Kollam" loading="lazy" className="w-full aspect-[4/5] object-cover" />
      </section>

      {/* Salons */}
      <section id="kollam-salons" className="bg-gray-100 py-16 md:py-20 scroll-mt-24">
        <div className={wrap}>
          <p className={`${eyebrow} text-center`}>Our salons in Kollam city</p>
          <h2 className="text-3xl md:text-4xl text-center mt-3">Visit us at RP Mall or Polayathodu</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {SALONS.map((s) => (
              <article key={s.name} className="bg-white p-6 md:p-8 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl">{s.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.tag}</p>
                </div>
                <p className="flex items-center gap-2 text-sm"><FaStar aria-hidden="true" /> <b>{s.rating}</b> on Google · {s.reviews.toLocaleString("en-IN")} reviews</p>
                <p className="flex gap-2 text-sm"><FaMapMarkerAlt className="mt-1 shrink-0" aria-hidden="true" />{s.address}</p>
                <p className="flex items-center gap-2 text-sm"><FaClock aria-hidden="true" />{s.hours}</p>
                <p className="flex items-center gap-2 text-sm"><FaPhoneAlt aria-hidden="true" /><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="underline">{s.phone}</a></p>
                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <Link to={s.book} className={btn.solid}>Book here</Link>
                  <a href={s.maps} target="_blank" rel="noopener noreferrer" className={btn.outline}>Directions</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`${wrap} py-16 md:py-20`}>
        <p className={`${eyebrow} text-center`}>Services in Kollam</p>
        <h2 className="text-3xl md:text-4xl text-center mt-3">Everything for hair, skin and your big day</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {SERVICES.map(([t, d]) => (
            <div key={t} className="bg-white p-6">
              <h3 className="text-lg">{t}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center"><Link to="/book" className={btn.solid}>See prices &amp; book online</Link></p>
      </section>

      {/* Bridal */}
      <section className="grid md:grid-cols-2 bg-black text-white">
        <img src={bridalImg} alt="Bridal makeover by Jaji's, Kollam" loading="lazy" className="w-full h-full min-h-[320px] object-cover" />
        <div className="px-6 py-16 md:px-16 flex flex-col justify-center gap-5">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-400">Bridal makeup in Kollam</p>
          <h2 className="text-3xl md:text-4xl font-light">Bride &amp; groom makeovers since 2002</h2>
          <p className="text-gray-300 max-w-md">
            Bridal makeup, hairstyling, saree draping and pre-wedding skin and hair care — planned with you and done by our senior
            artists at RP Mall and Polayathodu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+919847948242" className={btn.light}>Call to plan your bridal look</a>
          </div>
        </div>
      </section>

      {/* Areas + other branches */}
      <section className={`${wrap} py-16 md:py-20 grid md:grid-cols-2 gap-10`}>
        <div>
          <h2 className="text-2xl md:text-3xl">Near you in Kollam</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Guests come to our Kollam salons from {AREAS.slice(0, -1).join(", ")} and {AREAS.at(-1)}. RP Mall is close to the KSRTC bus
            stand; Polayathodu is on the main road near KFC.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl">More Jaji's salons nearby</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>Karunagappally — 4.6★, 2,800+ Google reviews</li>
            <li>Paravur — 4.8★, 1,000+ Google reviews</li>
            <li>Sasthamcotta — 4.6★ on Google</li>
            <li>Vazhuthacaud, Thiruvananthapuram — 4.7★, 2,700+ Google reviews</li>
          </ul>
          <p className="mt-4"><Link to="/salons" className="underline underline-offset-4">All salons, addresses and phone numbers</Link></p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-center">Questions about our Kollam salons</h2>
          <div className="mt-10 divide-y divide-gray-300 border-y border-gray-300">
            {KOLLAM_FAQ.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between gap-4 text-lg">
                  {q}<span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center"><Link to="/book" className={btn.solid}>Book your appointment</Link></p>
        </div>
      </section>
    </div>
  );
}
