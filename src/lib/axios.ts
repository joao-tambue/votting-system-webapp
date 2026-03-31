import axios from "axios";
import { useAuthStore } from "../stores/auth-store";
import { API_BASE_URL } from "../constants/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Rotas que NUNCA devem ter Authorization
  const publicRoutes = ["/api/login", "/api/register-voter"];

  if (publicRoutes.some((route) => config.url?.includes(route))) {
    return config;
  }

  const accessToken = useAuthStore.getState().access;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});