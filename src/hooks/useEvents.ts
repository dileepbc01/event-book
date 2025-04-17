import axios from "axios";
import { Database } from "../../database.types";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const END_POINT =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api/";

export const getEventSchema = z.object({
  id: z.string(),
});

export type GetEventType = z.infer<typeof getEventSchema>;

const eventsApi = {
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
};

export const api = axios.create({
  baseURL: process.env.END_POINT,
});

export const useEvents = () => {
  const [events, setEvents] = useState<
    Database["public"]["Tables"]["events"]["Row"][] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getEvents();
      setEvents(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage); // Display error using toast
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

export const useEvent = (id: string) => {
  const [event, setEvent] = useState<
    Database["public"]["Tables"]["events"]["Row"] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const parsedId = getEventSchema.parse({ id });
      const data = await eventsApi.getEvent(parsedId);
      setEvent(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage); // Display error using toast
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [id, fetchEvent]);

  return { event, loading, error, refetch: fetchEvent };
};
