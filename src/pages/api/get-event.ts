/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClient } from "../../lib/supabase";
import { z } from "zod";
import { getEventSchema } from "@/hooks/useEvents";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "Event ID is required and must be a string" });
  }

  try {
    const supabase = getSupabaseClient();
    const validatedData = getEventSchema.parse(req.body);
    console.log(validatedData);
    // Fetch the event by ID
    const { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", parseInt(id))
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return res
      .status(200)
      .json({ message: "Event fetched successfully", event });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message).join(", ") });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
