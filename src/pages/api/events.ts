// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSupabaseClient } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = getSupabaseClient();
  const { data: events } = await supabase.from("events").select("*");
  return res.status(200).json(events || []);
}
