import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { API } from "../config/api";
import { btn } from "./ui";

/** Job application form. jobId = a job's id, or "general" for a CV without a specific opening. */
export default function ApplyForm({ jobId, jobTitle }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", experience: "", message: "", website: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setError("");
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "").replace(/^(91|0)(?=[6-9]\d{9}$)/, "");
    if (!/^[6-9]\d{9}$/.test(digits)) errs.phone = "Please enter a valid 10-digit mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (file && file.size > 5 * 1024 * 1024) errs.resume = "CV must be 5 MB or smaller.";
    if (Object.keys(errs).length) return setErrors(errs);
    const fd = new FormData();
    Object.entries({ ...form, phone: digits }).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append("resume", file);
    setBusy(true);
    try {
      await API.post(`/jobs/${jobId}/apply/`, fd, { timeout: 60000 });
      setDone(true);
    } catch (err) {
      const d = err?.response?.data;
      if (d && !d.detail && typeof d === "object") setErrors(d);
      setError(d?.detail || (d && !d.detail ? "Please check the highlighted fields." : "Could not send your application. Please try again."));
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="border border-gray-200 p-8 text-center">
        <CheckCircle className="mx-auto" size={44} strokeWidth={1.25} />
        <p className="mt-4 text-xl">Application sent</p>
        <p className="mt-2 text-gray-600">
          Thank you{form.name ? `, ${form.name.trim().split(" ")[0]}` : ""}. Our HR team will review your application
          {jobTitle ? ` for ${jobTitle}` : ""} and contact you if your profile matches.
        </p>
      </div>
    );
  }

  const input = "w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black bg-white";
  const label = "block text-[0.75rem] tracking-[0.14em] uppercase text-gray-600 mb-2";
  const F = ({ k, l, children }) => (
    <div>
      <label className={label} htmlFor={`ap-${k}`}>{l}</label>
      {children}
      {errors[k] && <p className="mt-1 text-sm text-red-700">{Array.isArray(errors[k]) ? errors[k][0] : errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid sm:grid-cols-2 gap-5">
      {F({ k: "name", l: "Full name *", children: <input id="ap-name" className={input} value={form.name} onChange={set("name")} autoComplete="name" /> })}
      {F({ k: "phone", l: "Mobile number *", children: <input id="ap-phone" className={input} value={form.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel" maxLength={18} /> })}
      {F({ k: "email", l: "Email", children: <input id="ap-email" type="email" className={input} value={form.email} onChange={set("email")} autoComplete="email" /> })}
      {F({ k: "city", l: "Your town / city", children: <input id="ap-city" className={input} value={form.city} onChange={set("city")} autoComplete="address-level2" /> })}
      {F({ k: "experience", l: "Experience", children: <input id="ap-experience" className={input} value={form.experience} onChange={set("experience")} placeholder="e.g. 3 years as a hair stylist" /> })}
      {F({
        k: "resume", l: "CV (PDF, Word or photo · max 5 MB)",
        children: <input id="ap-resume" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm file:mr-4 file:border file:border-black file:bg-white file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.14em]" />,
      })}
      <div className="sm:col-span-2">
        {F({ k: "message", l: "Anything else we should know?", children: <textarea id="ap-message" rows={3} className={input} value={form.message} onChange={set("message")} maxLength={2000} /> })}
      </div>
      {/* hidden from people; bots fill it in */}
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && <p role="alert" className="sm:col-span-2 border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={busy} className={`${btn.solid} w-full sm:w-auto disabled:opacity-60`}>
          {busy ? "Sending…" : "Send application"}
        </button>
      </div>
    </form>
  );
}
