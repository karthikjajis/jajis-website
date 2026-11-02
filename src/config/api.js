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

// A guest token can expire; if the server rejects it, forget it and retry once without it.
API.interceptors.response.use(undefined, async (error) => {
  const cfg = error.config;
  if (error.response?.status === 401 && !localStorage.getItem("token") && localStorage.getItem("guestToken") && cfg && !cfg._guestRetry) {
    localStorage.removeItem("guestToken");
    cfg._guestRetry = true;
    delete cfg.headers.Authorization;
    return API(cfg);
  }
  return Promise.reject(error);
});
