import axios from "axios";

// Production must use same-origin /api/v1 (nginx → backend). Chrome blocks
// public origins (e.g. http://YOUR_VPS_IP) calling http://localhost (loopback).
const defaultBaseUrl = import.meta.env.PROD
  ? "/api/v1"
  : "http://localhost:5002/api/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseUrl,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Default JSON Content-Type breaks multipart; browser/axios must set boundary
    config.headers.delete("Content-Type");
  }
  const token = localStorage.getItem("link_united_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
