import api from "./http";
import type { User } from "../types/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
  },
  me: async () => {
    const { data } = await api.get<{ user: User }>("/auth/me");
    return data.user;
  },
  changePassword: async (payload: { currentPassword: string; newPassword: string }) => {
    const { data } = await api.post<{ message: string }>("/dashboard/change-password", payload);
    return data;
  },
};
