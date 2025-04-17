// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TablesInsert } from "../../types/database.types";
import { z } from "zod";

// Define Zod schema for booking validation
const bookingSchema = z.object({
  event_id: z.number().int().positive(), // Event ID must be a positive integer
  email: z.string(), // User ID must be a positive integer
  start_time: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start time format",
  }), // Valid date string
  end_time: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end time format",
  }), // Valid date string
  additional_notes: z.string().optional(), // Optional notes
});

type BookingInsert = TablesInsert<"bookings">;

type ResponseData = {
  message: string;
  booking?: BookingInsert;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    // Validate the request body
    const validatedData = bookingSchema.parse(req.body);

    // Simulate inserting into the database
    const newBooking: BookingInsert = {
      event_id: validatedData.event_id,
      start_time: validatedData.start_time,
      end_time: validatedData.end_time,
      additional_notes: validatedData.additional_notes || null,
      created_at: new Date().toISOString(),
    };

    // Respond with the created booking
    return res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
