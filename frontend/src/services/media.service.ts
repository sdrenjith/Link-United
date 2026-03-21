import api from "./http";
import type { MediaPost } from "../types/api";

export type MediaPayload = Omit<MediaPost, "id" | "createdAt" | "updatedAt">;

export const mediaService = {
  list: async () => {
    const { data } = await api.get<{ items: MediaPost[] }>("/media");
    return data.items;
  },
  create: async (payload: MediaPayload) => {
    const { data } = await api.post<{ item: MediaPost }>("/media", payload);
    return data.item;
  },
  update: async (id: number, payload: Partial<MediaPayload>) => {
    const { data } = await api.put<{ item: MediaPost }>(`/media/${id}`, payload);
    return data.item;
  },
  remove: async (id: number) => {
    await api.delete(`/media/${id}`);
  },
};
