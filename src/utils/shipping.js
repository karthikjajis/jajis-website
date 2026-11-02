// Mirrors the server's shipping rule (the server recalculates at payment).
const norm = (v) => String(v ?? "").trim().toLowerCase();

/** One charge per order: district rate → state rate → "All India" rate; free at/above `free_above`. */
export function shippingFor(rules, state, district, subtotal) {
  if (!rules) return null;
  if (subtotal >= Number(rules.free_above)) return 0;
  const st = norm(state), di = norm(district);
  const rates = rules.rates || [];
  const hit = rates.find((r) => norm(r.state) === st && r.district && norm(r.district) === di)
    ?? rates.find((r) => norm(r.state) === st && !r.district)
    ?? rates.find((r) => norm(r.state) === "all india" && !r.district);
  return hit ? Number(hit.amount) : 0;
}
