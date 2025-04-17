/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BookEventType, bookingSchema } from "@/hooks/api";
import { getSupabaseClient } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const supabase = getSupabaseClient();

  const addUserIfNotPreset = async (newBooking: BookEventType) => {
    const { data, error } = await supabase
      .from("users")
      .upsert({
        email: newBooking.email,
        fullname: newBooking.full_name,
      })
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const getExistingBookingDetails = async (
    userId: number,
    newBooking: BookEventType
  ) => {
    const { data, error } = await supabase
      .from("bookings")
      .select()
      .eq("user_id", userId)
      .eq("event_id", newBooking.event_id)
      .eq("start_time", newBooking.start_time)
      .eq("end_time", newBooking.end_time);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const bookEvent = async (userId: number, newBooking: BookEventType) => {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        event_id: newBooking.event_id,
        user_id: userId,
        start_time: newBooking.start_time,
        end_time: newBooking.end_time,
        additional_notes: newBooking.additional_notes,
      })
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  try {
    // Validate the request body
    const validatedData = bookingSchema.parse(req.body);

    // Simulate inserting into the database
    const newBooking: BookEventType = {
      event_id: validatedData.event_id,
      email: validatedData.email,
      start_time: validatedData.start_time,
      end_time: validatedData.end_time,
      additional_notes: validatedData.additional_notes || undefined,
      full_name: validatedData.full_name,
    };

    const useData = await addUserIfNotPreset(newBooking);
    const existingBookingDetails = await getExistingBookingDetails(
      useData.id,
      newBooking
    );

    if (existingBookingDetails.length > 0) {
      throw new Error("You already have a booking for this event.");
    }
    const bookedEvent = await bookEvent(useData.id, newBooking);
    // Respond with the created booking
    return res.status(201).json(bookedEvent);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
}
