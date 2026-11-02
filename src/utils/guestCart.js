// Cart for shoppers who are not signed in. Lives in the browser until checkout
// (or until they sign in, when it is moved into their account cart).
import { API } from "../config/api";

const KEY = "guest_cart";
const GUEST_TOKEN = "guestToken";

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((i) => i && Number(i.variant_id) > 0) : [];
  } catch {
    return [];
  }
};
const write = (items) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch { /* storage full or blocked */ }
  window.dispatchEvent(new Event("cart-change"));
};

export const isSignedIn = () => Boolean(localStorage.getItem("token"));
export const getGuestCart = read;
export const guestCartCount = () => read().reduce((n, i) => n + (Number(i.quantity) || 0), 0);

export function addToGuestCart(variantId, quantity = 1) {
  const items = read();
  const id = Number(variantId);
  const hit = items.find((i) => i.variant_id === id);
  if (hit) hit.quantity = Math.min(20, hit.quantity + quantity);
  else items.push({ variant_id: id, quantity: Math.min(20, quantity) });
  write(items);
}
export function setGuestQty(variantId, quantity) {
  write(read().map((i) => (i.variant_id === Number(variantId) ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) } : i)));
}
export function removeFromGuestCart(variantId) {
  write(read().filter((i) => i.variant_id !== Number(variantId)));
}
export const clearGuestCart = () => write([]);

/** Add to the right cart: the account cart when signed in, otherwise the browser cart. */
export async function addToAnyCart(variantId, quantity = 1) {
  if (isSignedIn()) {
    await API.post("/cart/add/", { variant_id: variantId, quantity });
    window.dispatchEvent(new Event("cart-change"));
  } else {
    addToGuestCart(variantId, quantity);
  }
}

/** After signing in: move anything from the browser cart into the account cart. */
export async function mergeGuestCartIntoAccount() {
  const items = read();
  if (!items.length || !isSignedIn()) return;
  for (const i of items) {
    try {
      await API.post("/cart/add/", { variant_id: i.variant_id, quantity: i.quantity });
    } catch { /* item may no longer exist */ }
  }
  write([]);
}

export const guestToken = {
  get: () => localStorage.getItem(GUEST_TOKEN),
  set: (t) => localStorage.setItem(GUEST_TOKEN, t),
  clear: () => localStorage.removeItem(GUEST_TOKEN),
};
