import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SALON_FAQ } from "../business-data";

import heroImg from "../assets/img/saloon-2.webp";
import founderImg from "../assets/img/founder-jajimole.webp";
import servicesImg from "../assets/img/saloon-4.webp";

const btnLight =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 bg-white text-black text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-200 transition-colors";
const btnGhostLight =
  "inline-flex items-center justify-center min-w-[180px] px-7 py-4 border border-white text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors";
const eyebrow = "text-[0.75rem] tracking-[0.2em] uppercase text-gray-600";

const stats = [
  ["1 million+", "Happy clients"],
  ["20+", "Years experience"],
  ["7", "Salon locations"],
  ["100+", "Beauty services"],
];

const achievements = [
  ["International recognition", "Award-winning team at the CMC Russia-Ural Championship"],
  ["Certified professionals", "Internationally trained and certified beauticians"],
  ["1 million+ happy clients", "Trusted by families across Kerala since 2002"],
  ["20+ years of excellence", "Consistently delivering quality beauty services"],
];

const services = [
  {
    title: "Hair styling",
    description: "Professional cuts, colours and treatments by expert stylists.",
    features: ["Precision cuts", "Colour correction", "Hair treatments", "Styling"],
  },
  {
    title: "Spa & wellness",
    description: "Relaxing treatments for complete rejuvenation.",
    features: ["Facial treatments", "Hair spa", "Pedicure & manicure", "Skin care"],
  },
  {
    title: "Beauty services",
    description: "Complete makeover services for special occasions.",
    features: ["Bridal makeup", "Party makeup", "Nail art", "Eyebrow threading"],
  },
  {
    title: "Unisex services",
    description: "Professional grooming services for everyone.",
    features: ["Men’s grooming", "Women’s styling", "Couple packages", "Family deals"],
  },
];

// Details checked against each salon's Google Maps listing (Oct 2026).
const SALON_LOCATIONS = [
  {
    place: "RP Mall, Kollam",
    name: "Jaji’s Innovation Unisex Beauty Salon & Bride/Groom Makeover Studio",
    address: "4th Floor, RP Mall, Taluk Kachery, Kollam, Kerala 691001",
    phone: "+91 98479 48242",
    hours: "Open daily 10 AM – 9 PM",
    placeId: "ChIJtU3XcFD8BTsRs7TsnLe-srk",
  },
  {
    place: "Polayathodu, Kollam",
    name: "Jaji’s Express Family Salon & Bride/Groom Lounge",
    address: "1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam, Kerala 691010",
    phone: "+91 97440 12345",
    hours: "Open daily 9 AM – 9 PM",
    placeId: "ChIJvT-crZL8BTsRiW67ISJb_rw",
  },
  {
    place: "Karunagappally",
    name: "Jaji’s Innovation Unisex Beauty Salon",
    address: "2nd Floor, KC Center, Opp. Boys Higher Secondary School, Near KSRTC Bus Stand, Karunagappally, Kerala 690518",
    phone: "+91 88933 88090",
    hours: "Open daily 10 AM – 9 PM",
    placeId: "ChIJlaYFE5ADBjsRPqWN4zMyUB4",
  },
  {
    place: "Sasthamcotta",
    name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio",
    address: "Vijaya Tower, Adhikadu Junction, Chavara–Sasthamcotta Road, Sasthamcotta, Kerala 690521",
    phone: "+91 94477 19988",
    hours: "Open daily 10 AM – 8 PM",
    placeId: "ChIJ5xJaFv4HBjsRR8ZwOhQOVu8",
  },
  {
    place: "Paravur",
    name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio",
    address: "Kottuvankonam, Paravur, Kollam, Kerala 691301",
    phone: "+91 96332 10449",
    hours: "Open daily 10 AM – 9 PM",
    placeId: "ChIJVatVE93lBTsRpsxi_QfVNME",
  },
  {
    place: "Vazhuthacaud, Trivandrum",
    name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio",
    address: "Ground Floor, KEK Tower, Opposite Trivandrum Club, Nandavanam, Vazhuthacaud, Thiruvananthapuram, Kerala 695010",
    phone: "+91 92072 09207",
    hours: "Open daily 10 AM – 9 PM",
    placeId: "ChIJQf-URDK7BTsR9Zwy0_MlSmY",
  },
];

const whyUs = [
  ["Expert professionals", "Stylists trained to international standards."],
  ["Premium products", "Professional brands and our own Jaji’s Research range."],
  ["Personalised care", "Every service starts with a consultation."],
  ["Family salons", "A welcoming place for the whole family since 2002."],
];

export default function Salons() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white text-black pt-24">
      {/* ---------- Hero ---------- */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[760px] bg-black">
        <img src={heroImg} alt="Inside a Jaji's salon" fetchpriority="high" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-end text-center text-white px-6 pb-16 md:pb-20 gap-6">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-200">Since 2002 · Across Kerala</p>
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-7xl">Jaji’s Innovation Salons</h1>
          <p className="text-base md:text-lg tracking-wide max-w-xl">Where beauty meets excellence.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/book" className={btnLight}>
              Book appointment
            </Link>
            <a href="#locations" className={btnGhostLight}>
              Find a salon
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="border-b border-gray-200">
        <dl className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([n, label]) => (
            <div key={label} className="flex flex-col-reverse gap-1">
              <dt className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{label}</dt>
              <dd className="text-3xl md:text-4xl font-light tracking-[0.06em]">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Founder ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24 grid gap-12 md:grid-cols-2 items-center">
        <figure className="m-0">
          <img
            src={founderImg}
            alt="Dr. K Jajimole, founder of Jaji's Innovation"
            loading="lazy"
            width="1000"
            height="1000"
            className="w-full aspect-[4/5] object-cover object-[50%_30%]"
          />
          <figcaption className="mt-3 text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">
            Dr. K Jajimole · Founder &amp; Director
          </figcaption>
        </figure>

        <div className="flex flex-col gap-6">
          <p className={eyebrow}>About Jaji’s Innovation</p>
          <h2 className="text-3xl md:text-5xl font-light">Dr. K Jajimole — Founder</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Jaji’s Innovation — a name synonymous with beauty, creativity and excellence. Founded in 2002 by
            the visionary Dr. K Jajimole, our brand has been redefining the standards of beauty and wellness
            across Kerala.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Dr. Jajimole’s journey began with a passion for bringing world-class beauty services to Kerala. Her
            extensive education in beauty therapy from renowned international institutions has made her one of the most
            scientifically educated figures in the beauty industry.
          </p>
          <dl className="grid sm:grid-cols-2 gap-x-8 mt-2">
            {achievements.map(([title, desc]) => (
              <div key={title} className="border-t border-gray-200 py-5">
                <dt className="text-[0.85rem] font-medium tracking-[0.12em] uppercase">{title}</dt>
                <dd className="mt-1 text-sm text-gray-600">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
          <h2 className="text-2xl md:text-4xl text-center mb-12">Why choose Jaji’s</h2>
          <ol className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {whyUs.map(([title, desc], i) => (
              <li key={title} className="border-t border-black pt-5">
                <span className="text-sm text-gray-500">0{i + 1}</span>
                <h3 className="mt-2 text-[0.95rem] font-medium tracking-[0.12em]">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
        <h2 className="text-2xl md:text-4xl text-center mb-12">Our services</h2>
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div role="tablist" aria-label="Salon services" className="border-t border-gray-200">
            {services.map((s, i) => {
              const on = active === i;
              return (
                <div key={s.title} className="border-b border-gray-200">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className={`text-lg tracking-[0.14em] uppercase ${on ? "font-medium" : "font-light text-gray-600"}`}>
                      {s.title}
                    </span>
                    <span aria-hidden="true" className="text-xl font-light">{on ? "−" : "+"}</span>
                  </button>
                  {on && (
                    <div className="pb-6">
                      <p className="text-gray-700">{s.description}</p>
                      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                        {s.features.map((f) => (
                          <li key={f} className="before:content-['—'] before:mr-2">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <img src={servicesImg} alt="A Jaji's salon" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        </div>
      </section>

      {/* ---------- Locations ---------- */}
      <section id="locations" className="border-t border-gray-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl">Our salon locations</h2>
            <p className="mt-3 text-gray-600">Visit any of our salons across Kerala.</p>
          </div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
            {SALON_LOCATIONS.map((s) => (
              <li key={s.place} className="border-b border-gray-200 py-8 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[1rem] font-medium tracking-[0.14em]">{s.place}</h3>
                  {s.soon && (
                    <span className="shrink-0 text-[0.65rem] tracking-[0.16em] uppercase border border-black px-2 py-1">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-800">{s.name}</p>
                <p className="text-sm text-gray-600 flex gap-2">
                  <FaMapMarkerAlt className="w-3 h-3 mt-1 shrink-0" aria-hidden="true" />
                  {s.address}
                </p>
                {s.hours && <p className="text-sm text-gray-600">{s.hours}</p>}
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] font-medium tracking-[0.16em] uppercase">
                  {s.phone && (
                    <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:no-underline">
                      Call {s.phone}
                    </a>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Jaji's Innovation ${s.place}`)}${
                      s.placeId ? `&query_place_id=${s.placeId}` : ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    Directions
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
          <h2 className="text-2xl md:text-4xl text-center mb-10">Frequently asked questions</h2>
          <div className="border-t border-gray-300">
            {SALON_FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-gray-300 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-medium tracking-[0.06em]">
                  {q}
                  <span aria-hidden="true" className="text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 md:py-24 text-center flex flex-col items-center gap-6">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-400">Appointments</p>
          <h2 className="text-3xl md:text-5xl font-light">Ready for your beauty transformation?</h2>
          <p className="text-gray-300 max-w-2xl">Book your appointment today and experience the Jaji’s difference.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/book" className={btnLight}>
              Book appointment
            </Link>
            <Link to="/products" className={btnGhostLight}>
              Shop products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

