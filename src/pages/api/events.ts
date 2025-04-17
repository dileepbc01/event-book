/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSupabaseClient } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = getSupabaseClient();

  try {
    const { data: events, error } = await supabase.from("events").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
