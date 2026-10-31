import { useEffect, useState } from "react";
import QCafeBooking from "../components/QCafeBooking";
import { API } from "../config/api";
import { PageHero, Btn, SectionTitle, FeatureList, CtaBand, eyebrow, wrap, sectionPad, inputCls, labelCls } from "../components/ui";


import eventbg from "../assets/img/event-hall-2.webp";
import event from "../assets/img/event-hall-3.webp";
import event1 from "../assets/img/event-hall-1.webp";

export default function EventHall() {
  const initialFormState = {
    name: "",
    phone: "",
    email: "",
    event_type: "wedding",
    category: "ac",
    event_date: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoadingBookedDates, setIsLoadingBookedDates] = useState(false);

  const eventTypes = [
    { value: "wedding", label: "Wedding" },
    { value: "reception", label: "Reception" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate" },
    { value: "other", label: "Other" },
  ];
  const categories = [
    { value: "ac", label: "AC" },
    { value: "non-ac", label: "Non-AC" },
  ];
  const todayString = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.message) {
      setFormStatus({ type: "", message: "" });
    }
  };

  const fetchBookedDates = async () => {
    try {
      setIsLoadingBookedDates(true);
      const response = await API.get("event-hall/booked-dates/");
      setBookedDates(response?.data?.booked_dates || []);
    } catch (err) {
      console.error("Error fetching booked dates:", err);
    } finally {
      setIsLoadingBookedDates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (
      !payload.name ||
      !payload.phone ||
      !payload.email ||
      !payload.event_date
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill in your name, phone, email, and preferred date.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (bookedDates.includes(payload.event_date)) {
      setFormStatus({
        type: "error",
        message: "This date is already booked. Please choose another date.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      try {
        response = await API.post("event-hall/", payload);
      } catch (postErr) {
        if (postErr?.response?.status === 401) {
          // Retry without invalid token header if 401 occurs
          response = await API.post("event-hall/", payload, {
            headers: { Authorization: "" },
          });
        } else {
          throw postErr;
        }
      }

      setFormStatus({
        type: "success",
        message:
          response?.data?.message ||
          `Booking request received for ${
            eventTypes.find((item) => item.value === payload.event_type)?.label ||
            payload.event_type
          }. We will contact you soon.`,
      });
      setFormData(initialFormState);
      fetchBookedDates();
    } catch (err) {
      console.error("Booking submit error:", err);
      let errMsg = "We could not submit your booking right now. Please check server status and try again.";
      if (err?.response?.data) {
        if (typeof err.response.data === "string") {
          errMsg = err.response.data;
        } else if (typeof err.response.data === "object") {
          const messages = Object.entries(err.response.data)
            .map(([key, val]) => `${key !== "detail" ? `${key}: ` : ""}${Array.isArray(val) ? val.join(" ") : String(val)}`)
            .join(" ");
          if (messages) errMsg = messages;
        }
      }
      setFormStatus({
        type: "error",
        message: errMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  return (
    <div className="bg-white text-black pt-24">
      <PageHero
        image={eventbg}
        alt="A celebration at Jaji's Q Café & Event Hall"
        kicker="Near Children’s Park · Asramam, Kollam"
        title="Jaji’s Q Café & Event Hall"
        subtitle="Celebrate life’s most important moments in style."
      >
        <Btn href="#qcafe-booking" variant="light">Book the Q Café hall</Btn>
        <Btn href="#venues" variant="ghostLight">Larger venues</Btn>
      </PageHero>

      <QCafeBooking />

      {/* About */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad} grid gap-12 md:grid-cols-2 items-center`}>
          <div className="flex flex-col gap-6">
            <p className={eyebrow}>Where celebrations come alive</p>
            <h2 className="text-3xl md:text-5xl font-light">More than a café</h2>
            <p className="text-gray-700 leading-relaxed">
              Jaji’s Q Café &amp; Event Hall has transformed an underused DTPC hangar into one of Kollam’s most vibrant
              lifestyle and event destinations — a cultural hub where food, music and celebrations meet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Its auditorium seats 400+ guests and is ideal for weddings, seminars, award functions, product launches and
              grand celebrations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={event} alt="Event hall set up for a function" loading="lazy" className="w-full aspect-[3/4] object-cover" />
            <img src={event1} alt="Guests at an event" loading="lazy" className="w-full aspect-[3/4] object-cover mt-10" />
          </div>
        </div>
      </section>

      {/* Venues */}
      <section id="venues" className={`${wrap} ${sectionPad} scroll-mt-24`}>
        <SectionTitle title="Our event venues" sub="Spaces for every size of celebration and business event." />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-gray-200">
          {venues.map(([title, desc, capacity]) => (
            <li key={title} className="border-b border-gray-200 py-8 flex flex-col gap-3">
              <h3 className="text-[1rem] font-medium tracking-[0.14em] uppercase">{title}</h3>
              <p className="text-[0.75rem] tracking-[0.18em] uppercase text-gray-600">{capacity}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
              <a href="#enquiry" className="mt-1 self-start text-[0.75rem] font-medium tracking-[0.16em] uppercase underline underline-offset-4 hover:no-underline">
                Enquire
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="border-t border-gray-200 scroll-mt-24">
        <div className={`${wrap} ${sectionPad} grid gap-12 lg:grid-cols-[1fr_1.2fr]`}>
          <div className="flex flex-col gap-6">
            <p className={eyebrow}>Weddings, receptions &amp; large events</p>
            <h2 className="text-3xl md:text-5xl font-light">Request a venue</h2>
            <p className="text-gray-700">
              Tell us the date and type of event and our team will call you back. For small gatherings in the A/C hall,
              use the live calendar above.
            </p>
            <ul className="border-t border-gray-200">
              {[
                "Halls for weddings, receptions and birthdays",
                "AC and non-AC options for every celebration",
                "Quick confirmation and personal assistance",
                "Hassle-free booking experience",
              ].map((t) => (
                <li key={t} className="border-b border-gray-200 py-3 text-sm text-gray-700">{t}</li>
              ))}
            </ul>
            <a href="tel:+917034626625" className="self-start text-[0.8rem] font-medium tracking-[0.16em] uppercase underline underline-offset-4">
              Or call +91 70346 26625
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="eh-type" className={labelCls}>Event type</label>
                <select id="eh-type" name="event_type" value={formData.event_type} onChange={handleChange} className={inputCls}>
                  {eventTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="eh-cat" className={labelCls}>Category</label>
                <select id="eh-cat" name="category" value={formData.category} onChange={handleChange} className={inputCls}>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="eh-date" className={labelCls}>Preferred date</label>
              <input id="eh-date" type="date" name="event_date" value={formData.event_date} min={todayString} onChange={handleChange} className={inputCls} required />
              <p className="mt-2 text-xs text-gray-600">
                {isLoadingBookedDates
                  ? "Checking available dates…"
                  : bookedDates.length > 0
                    ? `Already booked: ${bookedDates.join(", ")}`
                    : "All dates are currently available."}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="eh-name" className={labelCls}>Your name</label>
                <input id="eh-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} className={inputCls} required />
              </div>
              <div>
                <label htmlFor="eh-phone" className={labelCls}>Phone number</label>
                <input id="eh-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputCls} required />
              </div>
            </div>
            <div>
              <label htmlFor="eh-email" className={labelCls}>Email address</label>
              <input id="eh-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className={inputCls} required />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-14 bg-black text-white text-[0.8rem] font-medium tracking-[0.18em] uppercase hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {isSubmitting ? "Sending…" : "Send request"}
            </button>
            {formStatus.message && (
              <p
                role={formStatus.type === "error" ? "alert" : "status"}
                className={`border px-4 py-3 text-sm ${
                  formStatus.type === "error" ? "border-red-700 text-red-700" : "border-black text-black"
                }`}
              >
                {formStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Venue amenities" sub="Everything you need for a seamless event." />
          <FeatureList items={amenities} />
        </div>
      </section>

      <CtaBand kicker="Events" title="Ready to plan your event?" text="Our team will help you with the hall, catering, decoration and more.">
        <Btn href="#enquiry" variant="light">Request a venue</Btn>
        <Btn to="/contact" variant="ghostLight">Contact us</Btn>
      </CtaBand>
    </div>
  );
}

const venues = [
  ["AC conference halls", "Modern air-conditioned halls with the latest technology for meetings and corporate events.", "50–300 attendees"],
  ["Auditoriums", "Spacious auditoriums with premium acoustics and seating for presentations and seminars.", "300–800 attendees"],
  ["Banquet halls", "Elegant décor and fine dining facilities for special celebrations and gatherings.", "100–500 guests"],
  ["Convention halls", "Large flexible halls for exhibitions, trade shows and major business events.", "500–2000 visitors"],
  ["Kalyana mandapams", "Traditional wedding halls with mandap decoration and cultural ambience.", "200–800 guests"],
  ["Reception hall", "Elegant halls for wedding receptions, anniversaries and milestone celebrations.", "150–600 guests"],
];

const amenities = [
  ["Catering services"],
  ["Audio & visual equipment"],
  ["Free Wi-Fi"],
  ["Parking space"],
  ["Decoration services"],
  ["Professional staff"],
  ["Climate control"],
  ["Security services"],
];
