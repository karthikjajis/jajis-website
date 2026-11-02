import Combobox from "./Combobox";
import { INDIA_DISTRICTS, INDIA_STATES } from "../data/india-districts";

const ALL_DISTRICTS = [...new Set(Object.values(INDIA_DISTRICTS).flat())].sort((a, b) => a.localeCompare(b));
const districtsFor = (state) => {
  const key = INDIA_STATES.find((s) => s.toLowerCase() === String(state || "").trim().toLowerCase());
  return key ? INDIA_DISTRICTS[key] : ALL_DISTRICTS;
};

export const emptyGuest = {
  name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "Kerala", postal_code: "",
};

const GUEST_KEY = "guest_details";
export const loadGuestDetails = () => {
  try { return { ...emptyGuest, ...JSON.parse(localStorage.getItem(GUEST_KEY) || "{}") }; } catch { return emptyGuest; }
};
export const saveGuestDetails = (g) => {
  try { localStorage.setItem(GUEST_KEY, JSON.stringify(g)); } catch { /* ignore */ }
};

/** Returns an error message, or "" when the details are complete. */
export function guestDetailsError(g) {
  if (g.name.trim().length < 2) return "Please enter your name";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(g.email.trim())) return "Please enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(g.phone)) return "Please enter a valid 10-digit mobile number";
  if (!g.line1.trim()) return "Please enter your house / building and street";
  if (!g.state.trim()) return "Please select your state";
  if (!g.city.trim()) return "Please select your district";
  if (!/^\d{6}$/.test(g.postal_code)) return "Please enter a 6-digit PIN code";
  return "";
}

const input = "w-full border rounded px-3 py-2";

/** Contact + delivery details for express checkout without an account. */
export default function GuestCheckoutForm({ value: g, onChange }) {
  const set = (k) => (e) => onChange({ ...g, [k]: e.target.value });
  return (
    <div className="space-y-3">
      <input className={input} placeholder="Full name *" autoComplete="name" value={g.name} onChange={set("name")} required />
      <div className="grid grid-cols-1 gap-3">
        <input
          className={input} type="email" placeholder="Email *" autoComplete="email" value={g.email} onChange={set("email")} required
        />
        <input
          className={input} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Mobile number *"
          value={g.phone} required pattern="[6-9][0-9]{9}" title="10-digit mobile number"
          onChange={(e) => onChange({ ...g, phone: e.target.value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "").slice(0, 10) })}
        />
      </div>
      <input className={input} placeholder="House / building, street *" autoComplete="address-line1" value={g.line1} onChange={set("line1")} required />
      <input className={input} placeholder="Area / landmark (optional)" autoComplete="address-line2" value={g.line2} onChange={set("line2")} />
      <div className="grid grid-cols-2 gap-3">
        <Combobox
          placeholder="State *" options={INDIA_STATES} value={g.state} required
          onChange={(v) => onChange({ ...g, state: v, city: g.state.trim().toLowerCase() === v.trim().toLowerCase() ? g.city : "" })}
        />
        <Combobox
          placeholder="District *" options={districtsFor(g.state)} value={g.city} required
          onChange={(v) => onChange({ ...g, city: v })}
        />
      </div>
      <input
        className={input} inputMode="numeric" autoComplete="postal-code" placeholder="PIN code *" value={g.postal_code} required
        pattern="[0-9]{6}" title="6-digit PIN code"
        onChange={(e) => onChange({ ...g, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) })}
      />
      <p className="text-xs text-gray-500">
        We'll send your order confirmation and delivery updates to this email and WhatsApp number.
      </p>
    </div>
  );
}
