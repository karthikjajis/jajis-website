import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaClock, FaWhatsapp } from "react-icons/fa";
import { CLINIC, CLINIC_FAQ } from "../business-data";
import { btn, eyebrow, wrap } from "../components/ui";

// Jaji's Signature Skin & Hair Clinic — overview page on jajisinnovation.com.
// The clinic's full site is jajissignatureclinic.com; this page introduces it and sends people there or to book.
// Treatments, prices and hours come from the clinic site (Nov 2026) — keep both in step when the clinic changes them.

const TREATMENTS = [
  ["Hair fall & hair loss", ["Hair PRP therapy", "GFC hair treatment", "Exos GFC (exosomes)"]],
  ["Laser", ["Laser hair reduction (808 nm diode)", "Laser toning for pigmentation", "CO2 fractional laser for acne scars & pores", "Laser tattoo removal"]],
  ["Lifting & anti-ageing", ["HIFU skin tightening", "MNRF microneedling radiofrequency", "Botox", "Skin boosters", "Mono threads"]],
  ["Facials & peels", ["Medi facial (pumpkin peel)", "Chemical peels", "Vampire facial (PRP)", "Mesotherapy", "Microdermabrasion", "Face GFC"]],
  ["Acne, IV & procedures", ["Acne & acne-scar treatment", "Glutathione IV therapy", "Glow Trip IV for brides & grooms", "Radio cautery for warts & skin tags"]],
];

const PACKAGES = [
  ["Hair PRP therapy", "6 sittings", "₹15,000", "₹4,000 a sitting"],
  ["Glutathione IV combination", "6 sittings", "₹18,000", "₹4,500 a sitting"],
  ["Vampire facial (microneedling + PRP)", "6 sittings", "₹30,000", "₹8,000 a sitting"],
  ["CO2 fractional laser, full face", "6 sittings", "₹30,000", "₹10,000 a sitting"],
  ["Skin boosters, full face", "3 sessions", "₹24,000", "₹12,000 a sitting"],
  ["Glow Trip IV infusion", "1 sitting", "₹5,000", "for brides & grooms"],
];

const STEPS = [
  ["Diagnose", "A dermatologist or aesthetic doctor examines your skin or scalp first and finds what is really going on."],
  ["Plan honestly", "Only what you need — a clear plan with the number of sessions and the cost, explained before anything starts."],
  ["Treat & follow up", "Treatments in a prepared, sterile room by our doctors and clinical team, with follow-up after each session."],
];

export default function SignatureClinic() {
  const tel = CLINIC.phone.replace(/\s/g, "");
  return (
    <div className="bg-white text-black pt-24">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[760px] bg-[#1d1b1a]">
        <img src={CLINIC.image} alt="Jaji's Signature Skin & Hair Clinic, RP Mall, Kollam" fetchpriority="high" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-end text-center text-white px-6 pb-14 md:pb-20 gap-5">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-200">Jaji's Signature · RP Mall, Kollam</p>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl max-w-4xl">Skin &amp; hair clinic in Kollam</h1>
          <p className="text-base md:text-lg max-w-2xl">
            Dermatologists and aesthetic doctors for hair fall, acne scars, pigmentation, laser hair reduction and skin rejuvenation.
            <span className="block mt-2"><FaStar className="inline -mt-1 mr-1" aria-hidden="true" />{CLINIC.rating} on Google · Open every day, 10 AM – 8 PM</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${tel}`} className={btn.light}>Call {CLINIC.phone}</a>
            <a href={CLINIC.site} className={btn.ghostLight}>Visit the clinic website</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={`${wrap} py-16 md:py-20 grid md:grid-cols-2 gap-10 items-start`}>
        <div>
          <p className={eyebrow}>A Jaji's Innovation clinic</p>
          <h2 className="text-3xl md:text-4xl mt-3">Medical skin and hair care, beside the salon you trust</h2>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Jaji's Signature Skin &amp; Hair Clinic is the medical side of Jaji's — on the 4th floor of RP Mall, Kollam, next to our
            flagship salon. Where a salon treatment refreshes, the clinic treats: hair loss, acne and acne scars, pigmentation,
            ageing skin and unwanted hair, with treatments planned by our dermatologists and aesthetic doctors.
          </p>
          <p>
            Every course starts with a consultation. You'll know what the doctor recommends, how many sessions it takes and what it
            costs before anything begins.
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className={wrap}>
          <p className={`${eyebrow} text-center`}>How we work</p>
          <h2 className="text-3xl md:text-4xl text-center mt-3">The Signature method</h2>
          <ol className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="bg-white p-6 md:p-8">
                <span className="text-sm text-gray-500">0{i + 1}</span>
                <h3 className="text-xl mt-2">{t}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Treatments */}
      <section className={`${wrap} py-16 md:py-20`}>
        <p className={`${eyebrow} text-center`}>Treatments</p>
        <h2 className="text-3xl md:text-4xl text-center mt-3">Skin and hair treatments in Kollam</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {TREATMENTS.map(([t, list]) => (
            <div key={t} className="bg-white p-6">
              <h3 className="text-lg">{t}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                {list.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
          <div className="bg-black text-white p-6 flex flex-col justify-between gap-4">
            <p className="text-lg">Not sure what you need?</p>
            <p className="text-sm text-gray-300">Book a consultation — the doctor will recommend the right treatment and number of sessions.</p>
            <a href={`tel:${tel}`} className={btn.light}>Book a consultation</a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className={`${eyebrow} text-center`}>Signature packages</p>
          <h2 className="text-3xl md:text-4xl text-center mt-3">Course prices</h2>
          <p className="mt-3 text-center text-gray-600">Package prices apply when all sittings are booked together.</p>
          <div className="mt-10 bg-white divide-y divide-gray-200">
            {PACKAGES.map(([name, n, price, single]) => (
              <div key={name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-6 py-4">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-500">{n}{single ? ` · ${single}` : ""}</p>
                </div>
                <p className="text-lg">{price}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Prices may change — the clinic confirms the final plan and price at your consultation. Results vary from person to person.
          </p>
        </div>
      </section>

      {/* Visit */}
      <section className={`${wrap} py-16 md:py-20 grid md:grid-cols-2 gap-10`}>
        <div>
          <p className={eyebrow}>Visit</p>
          <h2 className="text-3xl md:text-4xl mt-3">Jaji's Signature Skin &amp; Hair Clinic</h2>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex gap-3"><FaMapMarkerAlt className="mt-1 shrink-0" aria-hidden="true" />{CLINIC.address}</li>
            <li className="flex gap-3 items-center"><FaClock aria-hidden="true" />Open every day, 10 AM – 8 PM</li>
            <li className="flex gap-3 items-center"><FaPhoneAlt aria-hidden="true" /><a href={`tel:${tel}`} className="underline underline-offset-4">{CLINIC.phone}</a></li>
            <li className="flex gap-3 items-center"><FaStar aria-hidden="true" />{CLINIC.rating} on Google</li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${tel.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className={btn.solid}>
              <FaWhatsapp className="mr-2" aria-hidden="true" /> WhatsApp the clinic
            </a>
            <a href={CLINIC.maps} target="_blank" rel="noopener noreferrer" className={btn.outline}>Directions</a>
          </div>
          <p className="mt-6">
            <a href={CLINIC.site} className="underline underline-offset-4">jajissignatureclinic.com</a> — treatments, doctors and booking.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl">Questions</h2>
          <div className="mt-6 divide-y divide-gray-300 border-y border-gray-300">
            {CLINIC_FAQ.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between gap-4">
                  {q}<span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Looking for haircuts, colour or bridal makeup? See <Link to="/kollam" className="underline underline-offset-4">our Kollam salons</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
