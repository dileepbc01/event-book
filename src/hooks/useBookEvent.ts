import { useState, useCallback } from "react";
import { eventsApi } from "./api";
import { BookEventType } from "./api";
import { toast } from "sonner";

const useBookEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const bookEvent = useCallback(async (bookingData: BookEventType) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await eventsApi.bookEvent(bookingData);
      setSuccess(true);
      toast.success("Event booked successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred while booking";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { bookEvent, loading, error, success };
};

export default useBookEvent;
