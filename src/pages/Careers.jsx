import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt } from "react-icons/fa";
import { API } from "../config/api";
import { btn, eyebrow, wrap } from "../components/ui";
import ApplyForm from "../components/ApplyForm";
import { EMPLOYMENT_LABEL, jobSlug, salaryText } from "../careers-data";
import heroImg from "../assets/img/saloon-4.webp";

const PERKS = [
  ["Grow with Kerala's family salon brand", "Since 2002, with salons, a skin & hair clinic, academy, café, food court and studio."],
  ["Training at Jaji's Academy", "Keep learning new cuts, colour, skin and bridal techniques with our trainers."],
  ["Steady work, every day", "Busy salons with loyal guests across Kollam, Karunagappally, Paravur, Sasthamcotta and Trivandrum."],
];

export default function Careers({ initialJobs = null }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [error, setError] = useState("");
  const [branch, setBranch] = useState("");

  useEffect(() => {
    let alive = true;
    API.get("/jobs/")
      .then((r) => alive && setJobs(r.data.jobs || []))
      .catch(() => alive && (setJobs((j) => j || []), setError("Could not load the latest openings. Please try again.")));
    return () => { alive = false; };
  }, []);

  const branches = useMemo(() => [...new Set((jobs || []).map((j) => j.branch))], [jobs]);
  const shown = (jobs || []).filter((j) => !branch || j.branch === branch);

  return (
    <div className="bg-white text-black pt-24">
      <section className="relative h-[60vh] min-h-[420px] max-h-[640px] bg-black">
        <img src={heroImg} alt="The team at a Jaji's salon" fetchpriority="high" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-end text-center text-white px-6 pb-14 md:pb-20 gap-5">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-200">Careers at Jaji's</p>
          <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl">Join our team</h1>
          <p className="text-base md:text-lg max-w-xl">Stylists, makeup artists, therapists, managers and more — across our salons and businesses in Kerala.</p>
          <a href="#openings" className={btn.light}>See open jobs</a>
        </div>
      </section>

      <section className={`${wrap} py-16 grid md:grid-cols-3 gap-8`}>
        {PERKS.map(([t, d]) => (
          <div key={t}>
            <h2 className="text-xl">{t}</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">{d}</p>
          </div>
        ))}
      </section>

      <section id="openings" className="bg-gray-100 py-16 md:py-20 scroll-mt-24">
        <div className={wrap}>
          <p className={`${eyebrow} text-center`}>Open positions</p>
          <h2 className="text-3xl md:text-4xl text-center mt-3">Current openings</h2>

          {branches.length > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by location">
              {["", ...branches].map((b) => (
                <button key={b || "all"} type="button" onClick={() => setBranch(b)}
                  className={`px-4 py-2 text-sm border ${branch === b ? "bg-black text-white border-black" : "bg-white border-gray-300 hover:border-black"}`}>
                  {b || "All locations"}
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-8 text-center text-gray-600">{error}</p>}
          {jobs === null && (
            <div className="mt-10 grid md:grid-cols-2 gap-4 animate-pulse"><div className="h-32 bg-white" /><div className="h-32 bg-white" /></div>
          )}
          {jobs && !shown.length && !error && (
            <p className="mt-10 text-center text-gray-600">No openings right now — send us your CV below and we'll contact you when a role opens.</p>
          )}

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            {shown.map((j) => (
              <Link key={j.id} to={`/careers/${jobSlug(j)}`} className="bg-white p-6 md:p-7 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl">{j.title}</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-700">
                  <span className="flex items-center gap-2"><FaMapMarkerAlt aria-hidden="true" />Jaji's {j.branch}</span>
                  <span className="flex items-center gap-2"><FaBriefcase aria-hidden="true" />{EMPLOYMENT_LABEL[j.employment_type] || j.employment_type}</span>
                  {salaryText(j) && <span className="flex items-center gap-2"><FaMoneyBillAlt aria-hidden="true" />{salaryText(j)}</span>}
                </div>
                {j.experience && <p className="text-sm text-gray-600">Experience: {j.experience}</p>}
                <span className="mt-1 text-[0.75rem] tracking-[0.16em] uppercase underline underline-offset-4">View & apply</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p className={`${eyebrow} text-center`}>Don't see your role?</p>
        <h2 className="text-3xl md:text-4xl text-center mt-3">Send us your CV</h2>
        <p className="mt-4 text-center text-gray-600">We're always looking for talented stylists, beauticians, makeup artists and front-desk stars.</p>
        <div className="mt-10"><ApplyForm jobId="general" /></div>
      </section>
    </div>
  );
}
