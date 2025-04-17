import axios from "axios";
import { z } from "zod";
import { Database } from "../../database.types";

const END_POINT =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/";

export const api = axios.create({
  baseURL: process.env.END_POINT,
});

export const getEventSchema = z.object({
  id: z.string(),
});

export type GetEventType = z.infer<typeof getEventSchema>;

// Define Zod schema for booking validation
export const bookingSchema = z.object({
  event_id: z.number().int().positive(),
  full_name: z.string(),
  email: z.string(),
  start_time: z.string(), // Valid date string
  end_time: z.string(), // Valid date string
  additional_notes: z.string().optional(), // Optional notes
});

export type BookEventType = z.infer<typeof bookingSchema>;

export const eventsApi = {
  getEvent: async (params: GetEventType) => {
    const { data } = await api.get(`${END_POINT}/get-event`, {
      params: params,
    });
    return data as Database["public"]["Tables"]["events"]["Row"];
  },
  getEvents: async () => {
    const { data } = await api.get(`${END_POINT}/events`);
    return data as Database["public"]["Tables"]["events"]["Row"][];
  },
  bookEvent: async (params: BookEventType) => {
    const { data } = await api.post(`${END_POINT}/book`, params);
    return data as Database["public"]["Tables"]["bookings"]["Row"];
  },
};
