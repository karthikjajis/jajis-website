import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://tbkvtcuqszgmahzswspe.supabase.co/functions/v1/api/";

export const API = axios.create({ baseURL: API_BASE_URL, timeout: 20000 });

// Attach auth token (DRF-style TokenAuth)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});
