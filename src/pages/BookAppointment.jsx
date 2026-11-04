import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ChevronLeft, Clock, MapPin, Search } from "lucide-react";
import { API } from "../config/api";
import { btn, eyebrow } from "../components/ui";

// Salon appointment booking, live from Zenoti (through our server).
// Steps: salon -> service -> your details + date -> time -> booked.

const inr = (v) => (v ? `₹${Number(v).toLocaleString("en-IN", { maximumFractionDigits: 0 })}` : "");
const mins = (m) => (!m ? "" : m >= 60 ? `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);
const errText = (e, fallback) => {
  const d = e?.response?.data;
  if (!d) return e?.code === "ECONNABORTED" ? "That took too long. Please try again." : fallback;
  if (typeof d.detail === "string") return d.detail;
  const first = Object.values(d).find((v) => typeof v === "string" || Array.isArray(v));
  return Array.isArray(first) ? first[0] : first || fallback;
};
const fieldErrors = (e) => {
  const d = e?.response?.data;
  return d && typeof d === "object" && !d.detail ? d : {};
};

// Dates are handled as plain "YYYY-MM-DD" strings in India time, so the salon's day is what people see.
const todayIST = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400e3).toISOString().slice(0, 10);
const dayLabel = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const longDate = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const timeLabel = (t) => {
  const [h, m] = t.slice(11, 16).split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};
const hourOf = (t) => Number(t.slice(11, 13));

const STEPS = ["Salon", "Service", "Details", "Time"];

export default function BookAppointment() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState(null); // null = loading, false = booking off
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState(null);
  const [services, setServices] = useState(null);
  const [service, setService] = useState(null);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", email: "", therapist_gender: 0, date: todayIST() });
  const [errors, setErrors] = useState({});
  const [booking, setBooking] = useState(null); // {ref, date, slots, next_available_day}
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  // salons
  useEffect(() => {
    let alive = true;
    API.get("/booking/status/")
      .then((r) => {
        if (!alive) return;
        if (!r.data.configured) return setStatus(false);
        return API.get("/booking/centers/").then((c) => {
          if (!alive) return;
          const list = c.data.centers || [];
          setCenters(list);
          setStatus(true);
          const want = (params.get("salon") || "").toLowerCase();
          const pre = want && list.find((x) => x.id === want || (x.name || "").toLowerCase().includes(want));
          if (pre) chooseCenter(pre);
          else if (list.length === 1) chooseCenter(list[0]);
        });
      })
      .catch((e) => alive && (setStatus(e?.response?.status === 503 ? false : true), setError(errText(e, "Could not load the salons."))));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function chooseCenter(c) {
    setCenter(c);
    setService(null);
    setServices(null);
    setBooking(null);
    setError("");
    setStep(1);
    API.get(`/booking/centers/${c.id}/services/`)
      .then((r) => setServices(r.data.services || []))
      .catch((e) => { setServices([]); setError(errText(e, "Could not load the services.")); });
  }

  const grouped = useMemo(() => {
    const s = (q || "").trim().toLowerCase();
    const list = (services || []).filter((x) => !s || x.name.toLowerCase().includes(s) || (x.category || "").toLowerCase().includes(s));
    const g = new Map();
    for (const x of list) g.set(x.category || "Services", [...(g.get(x.category || "Services") || []), x]);
    return [...g.entries()];
  }, [services, q]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function findTimes(e) {
    e?.preventDefault();
    setErrors({});
    setError("");
    const errs = {};
    if (!form.first_name.trim()) errs.first_name = "Please enter your name.";
    const digits = form.phone.replace(/\D/g, "").replace(/^(91|0)(?=[6-9]\d{9}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) errs.phone = "Please enter a valid 10-digit mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (Object.keys(errs).length) return setErrors(errs);
    setBusy(true);
    try {
      const r = await API.post("/booking/start/", { ...form, phone: digits, center_id: center.id, service_id: service.id }, { timeout: 45000 });
      setBooking(r.data);
      setSlot("");
      setStep(3);
    } catch (err) {
      setErrors(fieldErrors(err));
      setError(errText(err, "Could not check availability. Please try again."));
    } finally { setBusy(false); }
  }

  async function changeDate(d) {
    if (!booking || d === booking.date) return;
    setBusy(true);
    setError("");
    setSlot("");
    try {
      const r = await API.post(`/booking/${booking.ref}/date/`, { date: d }, { timeout: 45000 });
      setBooking(r.data);
      setForm((f) => ({ ...f, date: d }));
    } catch (err) {
      setError(errText(err, "Could not check that date."));
    } finally { setBusy(false); }
  }

  async function confirm() {
    if (!slot) return setError("Please choose a time.");
    setBusy(true);
    setError("");
    try {
      const r = await API.post(`/booking/${booking.ref}/confirm/`, { slot_time: slot, notes }, { timeout: 45000 });
      setDone(r.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(errText(err, "Could not book that time. Please choose another."));
      // the slot may have gone: refresh the list for the same date
      try {
        const r = await API.post(`/booking/${booking.ref}/date/`, { date: booking.date }, { timeout: 45000 });
        setBooking(r.data);
      } catch { /* keep the old list */ }
    } finally { setBusy(false); }
  }

  const dates = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(todayIST(), i)), []);
  const slotGroups = useMemo(() => {
    const s = booking?.slots || [];
    return [
      ["Morning", s.filter((t) => hourOf(t) < 12)],
      ["Afternoon", s.filter((t) => hourOf(t) >= 12 && hourOf(t) < 17)],
      ["Evening", s.filter((t) => hourOf(t) >= 17)],
    ].filter(([, l]) => l.length);
  }, [booking]);

  const input = "w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black bg-white";
  const label = "block text-[0.75rem] tracking-[0.14em] uppercase text-gray-600 mb-2";

  // ------------------------------------------------------------------ booked
  if (done) {
    return (
      <section className="bg-white pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle className="mx-auto" size={56} strokeWidth={1.25} />
          <p className={`${eyebrow} mt-6`}>Appointment booked</p>
          <h1 className="text-3xl md:text-5xl mt-3">See you soon, {form.first_name.trim()}</h1>
          <div className="mt-10 border border-gray-200 text-left divide-y divide-gray-200">
            <Row k="Salon" v={done.center} />
            <Row k="Service" v={[done.service, mins(done.duration)].filter(Boolean).join(" · ")} />
            <Row k="Date" v={longDate(done.date)} />
            <Row k="Time" v={done.slot_time ? timeLabel(done.slot_time) : ""} />
            {done.price ? <Row k="Price" v={`From ${inr(done.price)} (pay at the salon)`} /> : null}
          </div>
          <Disclaimer className="mt-6 text-left" />
          <p className="mt-6 text-gray-600 text-sm">
            The salon will send a confirmation to {done.phone ? `+91 ${done.phone}` : "your phone"}. To change or cancel, please call the salon.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className={btn.solid}>Back to home</Link>
            <Link to="/products" className={btn.outline}>Shop products</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-32 md:pt-40 pb-16 md:pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <p className={eyebrow}>Jaji's salons</p>
          <h1 className="text-3xl md:text-5xl mt-3">Book an appointment</h1>
          <p className="mt-4 text-gray-600">Choose your salon, service and a time that suits you. Pay at the salon. Times and prices are confirmed by the salon.</p>
        </div>

        {status !== false && (
          <ol className="mt-10 grid grid-cols-4 text-center text-[0.7rem] tracking-[0.14em] uppercase" aria-label="Booking steps">
            {STEPS.map((s, i) => (
              <li key={s} className={`pb-3 border-b-2 ${i <= step ? "border-black text-black" : "border-gray-200 text-gray-400"}`}>
                <button type="button" disabled={i > step || busy} onClick={() => setStep(i)} className="disabled:cursor-default">
                  {i + 1}. {s}
                </button>
              </li>
            ))}
          </ol>
        )}

        {error && <p role="alert" className="mt-6 border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">{error}</p>}

        {/* ---------------- booking switched off */}
        {status === false && (
          <div className="mt-12 border border-gray-200 p-8 text-center">
            <p className="text-lg">Online booking is coming soon.</p>
            <p className="mt-2 text-gray-600">Until then, please call or WhatsApp your nearest salon to book.</p>
            <Link to="/salons" className={`${btn.solid} mt-6`}>Find a salon</Link>
          </div>
        )}

        {status === null && !error && (
          <div className="mt-10 space-y-3 animate-pulse" aria-label="Loading">
            <div className="h-20 bg-gray-100" /><div className="h-20 bg-gray-100" /><div className="h-20 bg-gray-100" />
          </div>
        )}

        {/* ---------------- 1. salon */}
        {status && step === 0 && (
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {centers.map((c) => (
              <button key={c.id} type="button" onClick={() => chooseCenter(c)}
                className={`text-left border p-5 hover:border-black transition-colors ${center?.id === c.id ? "border-black" : "border-gray-200"}`}>
                <p className="text-lg">{c.name}</p>
                {c.address && <p className="mt-2 text-sm text-gray-600 flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5" />{c.address}</p>}
              </button>
            ))}
            {!centers.length && status && <p className="text-gray-600">No salons are taking online bookings right now. Please call the salon.</p>}
          </div>
        )}

        {/* ---------------- 2. service */}
        {step === 1 && center && (
          <div className="mt-10">
            <Back onClick={() => setStep(0)}>{center.name}</Back>
            <div className="relative mt-4">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services — haircut, facial, bridal…"
                className={`${input} pl-11`} aria-label="Search services" />
            </div>
            {services === null && <div className="mt-6 space-y-3 animate-pulse"><div className="h-14 bg-gray-100" /><div className="h-14 bg-gray-100" /><div className="h-14 bg-gray-100" /></div>}
            {services && !services.length && <p className="mt-6 text-gray-600">This salon has no services open for online booking yet. Please call the salon.</p>}
            {services && !!services.length && !grouped.length && <p className="mt-6 text-gray-600">No services match “{q}”.</p>}
            {grouped.map(([cat, list]) => (
              <div key={cat} className="mt-8">
                <h2 className={eyebrow}>{cat}</h2>
                <ul className="mt-3 divide-y divide-gray-200 border-y border-gray-200">
                  {list.map((s) => (
                    <li key={s.id}>
                      <button type="button" onClick={() => { setService(s); setStep(2); setError(""); }}
                        className={`w-full text-left flex justify-between gap-4 py-4 px-2 hover:bg-gray-50 ${service?.id === s.id ? "bg-gray-50" : ""}`}>
                        <span>
                          <span className="block">{s.name}</span>
                          {s.duration ? <span className="text-sm text-gray-500 inline-flex items-center gap-1 mt-1"><Clock size={14} />{mins(s.duration)}</span> : null}
                        </span>
                        <span className="shrink-0 text-right">{s.price ? <><span className="text-xs text-gray-500">from </span>{inr(s.price)}</> : null}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- 3. details */}
        {step === 2 && service && (
          <form onSubmit={findTimes} className="mt-10" noValidate>
            <Back onClick={() => setStep(1)}>{service.name}{service.price ? ` · ${inr(service.price)}` : ""} at {center.name}</Back>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <Field label="First name *" error={errors.first_name} cls={label}>
                <input className={input} value={form.first_name} onChange={set("first_name")} autoComplete="given-name" required />
              </Field>
              <Field label="Last name" error={errors.last_name} cls={label}>
                <input className={input} value={form.last_name} onChange={set("last_name")} autoComplete="family-name" />
              </Field>
              <Field label="Mobile number *" error={errors.phone} cls={label}>
                <div className="flex">
                  <span className="border border-r-0 border-gray-300 px-3 py-3 bg-gray-50 text-gray-600">+91</span>
                  <input className={input} value={form.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel-national" maxLength={18} required />
                </div>
              </Field>
              <Field label="Email (optional)" error={errors.email} cls={label}>
                <input className={input} type="email" value={form.email} onChange={set("email")} autoComplete="email" />
              </Field>
              <Field label="Preferred stylist" cls={label}>
                <select className={input} value={form.therapist_gender} onChange={(e) => setForm((f) => ({ ...f, therapist_gender: Number(e.target.value) }))}>
                  <option value={0}>No preference</option>
                  <option value={2}>Female stylist</option>
                  <option value={1}>Male stylist</option>
                </select>
              </Field>
              <Field label="Date *" error={errors.date} cls={label}>
                <input className={input} type="date" value={form.date} min={todayIST()} max={addDays(todayIST(), 90)} onChange={set("date")} required />
              </Field>
            </div>
            <button type="submit" disabled={busy} className={`${btn.solid} mt-8 w-full sm:w-auto disabled:opacity-60`}>
              {busy ? "Checking times…" : "See available times"}
            </button>
          </form>
        )}

        {/* ---------------- 4. time */}
        {step === 3 && booking && (
          <div className="mt-10">
            <Back onClick={() => setStep(2)}>{service.name} at {center.name}</Back>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" role="group" aria-label="Choose a date">
              {dates.map((d) => (
                <button key={d} type="button" disabled={busy} onClick={() => changeDate(d)}
                  className={`shrink-0 px-4 py-3 border text-sm ${d === booking.date ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"}`}>
                  {dayLabel(d)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-gray-600">{longDate(booking.date)}</p>

            {busy && <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-2 animate-pulse">{Array.from({ length: 10 }, (_, i) => <div key={i} className="h-12 bg-gray-100" />)}</div>}

            {!busy && !booking.slots.length && (
              <div className="mt-6 border border-gray-200 p-6">
                <p>No free times on this day.</p>
                {booking.next_available_day && booking.next_available_day !== booking.date && (
                  <button type="button" onClick={() => changeDate(booking.next_available_day)} className={`${btn.outline} mt-4`}>
                    Next free day: {dayLabel(booking.next_available_day)}
                  </button>
                )}
              </div>
            )}

            {!busy && slotGroups.map(([name, list]) => (
              <div key={name} className="mt-6">
                <h2 className={eyebrow}>{name}</h2>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {list.map((t) => (
                    <button key={t} type="button" onClick={() => { setSlot(t); setError(""); }}
                      className={`py-3 border text-sm ${slot === t ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"}`}>
                      {timeLabel(t)}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {!!booking.slots.length && (
              <div className="mt-8">
                <label className={label} htmlFor="notes">Anything we should know? (optional)</label>
                <textarea id="notes" rows={2} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} className={input} />
                <div className="mt-6 border border-gray-200 divide-y divide-gray-200">
                  <Row k="Salon" v={center.name} />
                  <Row k="Service" v={[service.name, mins(service.duration)].filter(Boolean).join(" · ")} />
                  <Row k="When" v={slot ? `${dayLabel(booking.date)}, ${timeLabel(slot)}` : "Choose a time"} />
                  {service.price ? <Row k="Price" v={`From ${inr(service.price)} · pay at the salon`} /> : null}
                </div>
                <Disclaimer className="mt-6" />
                <button type="button" onClick={confirm} disabled={busy || !slot} className={`${btn.solid} mt-6 w-full sm:w-auto disabled:opacity-60`}>
                  {busy ? "Booking…" : "Confirm appointment"}
                </button>
                <p className="mt-3 text-xs text-gray-500">By confirming, you agree to the note above.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Disclaimer({ className = "" }) {
  return (
    <div className={`border-l-2 border-black bg-gray-50 px-5 py-4 text-sm text-gray-700 leading-relaxed ${className}`} role="note">
      <p className="text-[0.7rem] tracking-[0.16em] uppercase text-black mb-2">Please note</p>
      <ul className="space-y-1.5 list-disc pl-4">
        <li>
          Appointment times may vary slightly depending on the availability of your stylist on the day. If your time needs
          to change, the salon will contact you before your visit.
        </li>
        <li>
          Prices shown are starting prices. The final amount may vary depending on the service category, stylist level,
          hair length and type, and any products or add-ons used. The salon will confirm the price with you before your service.
        </li>
      </ul>
    </div>
  );
}

function Back({ onClick, children }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <button type="button" onClick={onClick} className="inline-flex items-center gap-1 underline underline-offset-4">
        <ChevronLeft size={16} /> Back
      </button>
      <span className="text-gray-600 truncate">{children}</span>
    </div>
  );
}

function Field({ label, error, cls, children }) {
  return (
    <div>
      <span className={cls}>{label}</span>
      {children}
      {error && <p className="mt-1 text-sm text-red-700">{Array.isArray(error) ? error[0] : error}</p>}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4 px-5 py-3 text-sm">
      <span className="text-gray-600">{k}</span>
      <span className="text-right">{v}</span>
    </div>
  );
}
