import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://tbkvtcuqszgmahzswspe.supabase.co/functions/v1/api/";

export const API = axios.create({ baseURL: API_BASE_URL, timeout: 20000 });

// Attach auth token (DRF-style TokenAuth). Shoppers without an account use the
// guest token from express checkout, which only reaches their own order.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("guestToken");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// A saved login (or guest token) can expire. If the server rejects it, forget it and retry once
// without it, so public pages keep working; pages that need a login then ask the shopper to sign in.
API.interceptors.response.use(undefined, async (error) => {
  const cfg = error.config;
  const sent = cfg?.headers?.Authorization;
  if (error.response?.status === 401 && sent && !cfg._authRetry) {
    const stale = String(sent).replace(/^Token\s+/, "");
    if (localStorage.getItem("token") === stale) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth-change"));
    }
    if (localStorage.getItem("guestToken") === stale) localStorage.removeItem("guestToken");
    cfg._authRetry = true;
    delete cfg.headers.Authorization;
    return API(cfg);
  }
  return Promise.reject(error);
});
