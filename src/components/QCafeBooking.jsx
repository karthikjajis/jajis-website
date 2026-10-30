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
  "inline-flex items-center justify-center min-h-[52px] px-7 text-[16px] font-medium transition-[background-color,transform] duration-150 active:scale-[0.97]";

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
    <section id="qcafe-booking" className="bg-[#efedea] text-black scroll-mt-24">
      <div className="px-[clamp(16px,2.2vw,32px)] py-[clamp(96px,12vw,200px)] grid gap-12 lg:grid-cols-[1fr_1.15fr] items-start">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <h2 className="text-[clamp(30px,3.4vw,52px)] !normal-case !tracking-[-0.02em] !font-medium !leading-none">
            Book the Q Café hall
          </h2>
          <p className="text-[clamp(19px,1.5vw,22px)] leading-[1.45] max-w-[38ch]">
            Our air-conditioned hall at Ashramam, Kollam, for birthdays, engagements, meetings and family
            get-togethers. See which days are free, send a request in two minutes, and we confirm on WhatsApp.
          </p>
          <ol className="list-none p-0 m-0 flex flex-col gap-2 text-[17px] max-w-[40ch]">
            <li>Pick a day and time, then tell us about the event.</li>
            <li>Accept the hall agreement online.</li>
            <li>We confirm on WhatsApp and you pay the advance.</li>
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href={`${QCAFE_URL}/book`} className={`${btn} bg-black text-white hover:bg-[#2b2b2b]`}>
              Check dates and request
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} bg-white text-black hover:bg-[#e2dfdb]`}
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h3 className="text-[24px] !normal-case !tracking-[-0.01em] !font-medium">The next two weeks</h3>
            <span className="text-[15px] text-[#4d4d4d]" aria-live="polite">
              {blocks === null
                ? "Loading the live calendar…"
                : failed
                  ? "Live calendar unavailable, tap a day to check"
                  : `${freeDays} of ${DAYS} days have free time`}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2" role="list">
            {days.map((d) => {
              const dt = new Date(`${d}T12:00:00+05:30`);
              const dow = dt.toLocaleDateString("en-IN", { weekday: "short", timeZone: "Asia/Kolkata" });
              const segs = blocks ? busyOnDate(blocks, d) : [];
              const full = busyShare(segs) >= 0.9;
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
                  className={`flex flex-col items-center gap-2 py-3 transition-[background-color,transform] duration-150 active:scale-95 ${
                    full ? "bg-[#f6f5f3] text-[#767676] pointer-events-none" : "bg-[#efedea] hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="text-[15px]">{dow}</span>
                  <span className="text-[22px] font-medium leading-none">{dt.getUTCDate()}</span>
                  <span className="relative w-2.5 h-16 bg-white" aria-hidden="true">
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

          <p className="mt-6 text-[15px] text-[#4d4d4d] max-w-[52ch]">
            Each bar is one day from 6 am at the top to midnight at the bottom; black is already booked. Tap a day to
            request it.
          </p>
        </div>
      </div>
    </section>
  );
}
