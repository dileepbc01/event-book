import { Database } from "../../database.types";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { eventsApi, getEventSchema } from "./api";

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
