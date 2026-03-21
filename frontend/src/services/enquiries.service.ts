import api from "./http";
import type { Enquiry } from "../types/api";

interface CreateEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export const enquiriesService = {
  create: async (payload: CreateEnquiryPayload) => {
    await api.post("/enquiries", payload);
  },
  list: async () => {
    const { data } = await api.get<{ items: Enquiry[] }>("/enquiries");
    return data.items;
  },
};
