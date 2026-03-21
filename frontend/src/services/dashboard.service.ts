import api from "./http";
import type { DashboardStats } from "../types/api";

export const dashboardService = {
  stats: async () => {
    const { data } = await api.get<{ stats: DashboardStats }>("/dashboard/stats");
    return data.stats;
  },
};
