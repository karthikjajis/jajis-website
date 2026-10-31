import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { PageHero, Btn, SectionTitle, eyebrow, wrap, sectionPad, inputCls, labelCls } from "../components/ui";

import heroImg from "../assets/img/home-salon-front.webp";

const MAIN_PHONE = "+91 97440 12345";
const WHATSAPP = "919744012345";
const tel = (p) => `tel:${p.replace(/\s/g, "")}`;

// Salon details checked against each salon's Google Maps listing (Oct 2026).
const salons = [
  { location: "RP Mall, Kollam", name: "Jaji’s Innovation Unisex Beauty Salon & Bride/Groom Makeover Studio", address: "4th Floor, RP Mall, Taluk Kachery, Kollam, Kerala 691001", phone: "+91 98479 48242" },
  { location: "Polayathodu", name: "Jaji’s Express Family Salon & Bride/Groom Lounge", address: "1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam, Kerala 691010", phone: "+91 97440 12345" },
  { location: "Karunagappally", name: "Jaji’s Innovation Unisex Beauty Salon", address: "2nd Floor, KC Center, Opp. Boys Higher Secondary School, Near KSRTC Bus Stand, Karunagappally, Kerala 690518", phone: "+91 88933 88090" },
  { location: "Sasthamcotta", name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio", address: "Vijaya Tower, Adhikadu Junction, Chavara–Sasthamcotta Road, Sasthamcotta, Kerala 690521", phone: "+91 94477 19988" },
  { location: "Paravur", name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio", address: "Kottuvankonam, Paravur, Kollam, Kerala 691301", phone: "+91 96332 10449" },
  { location: "Vazhuthacaud, Trivandrum", name: "Jaji’s Innovation Unisex Beauty Salon & Bridal Makeup Studio", address: "Ground Floor, KEK Tower, Opposite Trivandrum Club, Nandavanam, Vazhuthacaud, Thiruvananthapuram, Kerala 695010", phone: "+91 92072 09207" },
];

const ventures = [
  { location: "Asramam, Kollam", name: "Jaji’s Q Café & Event Hall", address: "Near Children’s Park, Asramam, Kollam, Kerala 691001", phone: "+91 70346 26625" },
  { location: "Ashramam Maidanam", name: "Jaji’s Food Court", address: "Ashramam Maidanam, Kollam, Kerala 691001", phone: "+91 70346 26627" },
  { location: "Polayathodu", name: "Jaji’s Designing & Stitching Studio", address: "Opposite KFC, Polayathodu, Kollam, Kerala 691021", phone: "+91 96452 96450" },
  { location: "Polayathodu", name: "Jaji’s Beauty Academy", address: "1st Floor, Narayaneeyam, Near KFC, Polayathodu, Kollam, Kerala 691021", phone: "+91 97440 12345" },
];

function PlaceList({ items }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
      {items.map((s) => (
        <li key={s.name + s.location} className="border-b border-gray-200 py-8 flex flex-col gap-2">
          <h4 className="text-[1rem] font-medium tracking-[0.14em] uppercase">{s.location}</h4>
          <p className="text-sm text-gray-800">{s.name}</p>
          <p className="text-sm text-gray-600">{s.address}</p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] font-medium tracking-[0.16em] uppercase">
            <a href={tel(s.phone)} className="underline underline-offset-4 hover:no-underline">Call {s.phone}</a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name}, ${s.address}`)}`}
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
  );
}

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // The form opens WhatsApp with the message filled in (no data is stored on the website).
  const onSubmit = (e) => {
    e.preventDefault();
    const message = `Hello, I would like to get in touch.

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Subject: ${form.subject}

Message:
${form.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
    setForm(empty);
  };

  return (
    <div className="bg-white text-black pt-24">
      <PageHero image={heroImg} alt="A Jaji's salon" kicker="We’re here to help" title="Contact us" subtitle="Questions, appointments or partnerships — get in touch." />

      <section className={`${wrap} ${sectionPad} grid gap-14 lg:grid-cols-[1fr_1.2fr]`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className={eyebrow}>Get in touch</p>
            <h2 className="text-3xl md:text-5xl font-light">We’d love to hear from you</h2>
            <p className="text-gray-700">Send us a message and our team will reply on WhatsApp.</p>
          </div>
          <dl className="border-t border-gray-200">
            {[
              ["Head office", "Jaji’s Innovation Pvt. Ltd."],
              ["Phone", <a key="p" href={tel(MAIN_PHONE)} className="underline underline-offset-4">{MAIN_PHONE}</a>],
              ["Email", <a key="e" href="mailto:jajisinnovation@gmail.com" className="underline underline-offset-4">jajisinnovation@gmail.com</a>],
              ["Business hours", "10 AM – 9 PM, all days"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-gray-200 py-4 grid grid-cols-[9rem_1fr] gap-4">
                <dt className="text-[0.75rem] font-medium tracking-[0.16em] uppercase pt-0.5">{k}</dt>
                <dd className="text-gray-700">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col sm:flex-row gap-3">
            <Btn href={tel(MAIN_PHONE)} variant="solid">Call us</Btn>
            <Btn href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" variant="outline">WhatsApp</Btn>
          </div>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/jajisgroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/share/1DPhDM11zx/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF className="w-5 h-5" /></a>
            <a href="https://youtube.com/@jajisunil" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube className="w-5 h-5" /></a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5 bg-gray-100 p-6 md:p-10">
          <h3 className="text-[0.95rem] font-medium tracking-[0.14em]">Send us a message</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>Full name</label>
              <input id="c-name" name="name" autoComplete="name" value={form.name} onChange={onChange} required className={inputCls} />
            </div>
            <div>
              <label htmlFor="c-email" className={labelCls}>Email</label>
              <input id="c-email" type="email" name="email" autoComplete="email" value={form.email} onChange={onChange} required className={inputCls} />
            </div>
            <div>
              <label htmlFor="c-phone" className={labelCls}>Phone</label>
              <input id="c-phone" type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={onChange} className={inputCls} />
            </div>
            <div>
              <label htmlFor="c-subject" className={labelCls}>Subject</label>
              <input id="c-subject" name="subject" value={form.subject} onChange={onChange} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="c-message" className={labelCls}>Message</label>
            <textarea id="c-message" name="message" rows={6} value={form.message} onChange={onChange} required className={inputCls} />
          </div>
          <button type="submit" className="min-h-14 bg-black text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-800 transition-colors">
            Send on WhatsApp
          </button>
        </form>
      </section>

      <section id="locations" className="border-t border-gray-200 scroll-mt-24">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Our locations & ventures" sub="Experience the Jaji’s lifestyle across Kerala." />
          <h3 className="text-[0.85rem] font-medium tracking-[0.18em] mb-4">Salons</h3>
          <PlaceList items={salons} />
          <h3 className="text-[0.85rem] font-medium tracking-[0.18em] mt-16 mb-4">Café, food, studio &amp; academy</h3>
          <PlaceList items={ventures} />
        </div>
      </section>
    </div>
  );
}
