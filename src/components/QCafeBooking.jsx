import { useEffect, useMemo, useState } from "react";

// Jaji's Q Café hall booking lives at jajisqcafe.com (its own app: live calendar,
// hall agreement, Razorpay advance, WhatsApp updates). This section shows its live
// availability here and sends guests there to request a date.
export const QCAFE_URL = "https://jajisqcafe.com";
const AVAILABILITY_API = "/qcafe-api/availability"; // proxied to jajisqcafe.com/api by a Vercel project route
const WHATSAPP =
  "https://wa.me/917034626625?text=" +
  encodeURIComponent("Hi, I'd like to know about booking the Q Café hall.");

const DAYS = 14;
const DAY_START = 6 * 60; // 6 AM
const DAY_END = 24 * 60; // midnight
const SPAN = DAY_END - DAY_START;

// --- India time helpers (the hall's calendar is always IST) ---
const todayIST = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
const addDays = (iso, n) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const istMidnight = (iso) => Date.parse(`${iso}T00:00:00+05:30`);
const minutesIntoDay = (iso, ts) => (Date.parse(ts) - istMidnight(iso)) / 60000;

function busyOnDate(blocks, date) {
  const start = istMidnight(date);
  const end = istMidnight(addDays(date, 1));
  return blocks
    .filter((b) => Date.parse(b.start_at) < end && Date.parse(b.end_at) > start)
    .map((b) => ({
      from: Math.max(DAY_START, minutesIntoDay(date, b.start_at)),
      to: Math.min(DAY_END, minutesIntoDay(date, b.end_at)),
    }))
    .filter((s) => s.to > s.from);
}

function busyShare(segs) {
  let total = 0;
  let cur = -1;
  for (const s of [...segs].sort((a, b) => a.from - b.from)) {
    const from = Math.max(s.from, cur);
    if (s.to > from) {
      total += s.to - from;
      cur = s.to;
    }
  }
  return total / SPAN;
}

const pct = (m) => ((Math.min(DAY_END, Math.max(DAY_START, m)) - DAY_START) / SPAN) * 100;

const btn =
  "inline-flex items-center justify-center min-w-[200px] px-7 py-4 text-[0.8rem] font-medium tracking-[0.18em] uppercase transition-colors";

export default function QCafeBooking() {
  const start = useMemo(todayIST, []);
  const [blocks, setBlocks] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${AVAILABILITY_API}?from=${start}&days=${DAYS}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => alive && setBlocks(j.blocks || []))
      .catch(() => alive && (setFailed(true), setBlocks([])));
    return () => {
      alive = false;
    };
  }, [start]);

  const days = Array.from({ length: DAYS }, (_, i) => addDays(start, i));
  const freeDays = blocks && !failed ? days.filter((d) => busyShare(busyOnDate(blocks, d)) < 0.9).length : null;

  return (
    <section id="qcafe-booking" className="bg-white text-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
        <div className="flex flex-col gap-6">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-600">Q Café A/C hall · Ashramam, Kollam</p>
          <h2 className="text-3xl md:text-5xl font-light">Book the Q Café hall online</h2>
          <p className="text-gray-700 max-w-lg">
            Birthdays, engagements, meetings and family get-togethers in our air-conditioned hall. See which dates are
            free right now, send a request in two minutes, and we confirm with you on WhatsApp.
          </p>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 max-w-lg">
            {[
              "Pick a date and time",
              "Tell us about the event",
              "Accept the hall agreement",
              "We confirm, you pay the advance",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="font-medium text-black">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`${QCAFE_URL}/book`} className={`${btn} bg-black text-white hover:bg-gray-800`}>
              Check dates &amp; request
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-black hover:bg-black hover:text-white`}
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="border border-gray-200 p-5 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <h3 className="text-[0.85rem] font-medium tracking-[0.16em]">Next two weeks</h3>
            <span className="text-sm text-gray-600" aria-live="polite">
              {blocks === null
                ? "Loading live calendar…"
                : failed
                  ? "Live calendar unavailable — tap a day to check"
                  : `${freeDays} of ${DAYS} days have free time`}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2" role="list">
            {days.map((d) => {
              const dt = new Date(`${d}T12:00:00+05:30`);
              const dow = dt.toLocaleDateString("en-IN", { weekday: "short", timeZone: "Asia/Kolkata" });
              const segs = blocks ? busyOnDate(blocks, d) : [];
              const full = busyShare(segs) >= 0.9;
              const weekend = dt.getUTCDay() === 0 || dt.getUTCDay() === 6;
              const label = `${dt.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                timeZone: "Asia/Kolkata",
              })}: ${full ? "fully booked" : segs.length ? "partly booked" : "free all day"}`;
              return (
                <a
                  key={d}
                  role="listitem"
                  href={`${QCAFE_URL}/book?date=${d}`}
                  aria-label={label}
                  title={label}
                  className={`group flex flex-col items-center gap-2 py-2 border ${
                    full ? "border-gray-100 text-gray-400 pointer-events-none" : "border-gray-200 hover:border-black"
                  }`}
                >
                  <span className={`text-[0.65rem] tracking-[0.12em] uppercase ${weekend ? "text-black" : "text-gray-500"}`}>
                    {dow}
                  </span>
                  <span className="text-lg font-light leading-none">{dt.getUTCDate()}</span>
                  <span className="relative w-3 h-16 bg-gray-100" aria-hidden="true">
                    {segs.map((s, i) => (
                      <span
                        key={i}
                        className="absolute left-0 right-0 bg-black"
                        style={{ top: `${pct(s.from)}%`, height: `${pct(s.to) - pct(s.from)}%` }}
                      />
                    ))}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600">
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 bg-gray-100 border border-gray-200" /> Free
            </span>
            <span className="flex items-center gap-2">
              <i className="w-3 h-3 bg-black" /> Booked
            </span>
            <span>Each bar runs 6 AM (top) to midnight (bottom). Tap a day to book.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
