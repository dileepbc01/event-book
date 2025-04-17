import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export const getSupabaseClient = (): SupabaseClient<Database> => {
  const SUPABASE_URL = process.env.SUPABASE_URL || "";
  const SUPABSE_SECRET_KEY = process.env.SUPABSE_SECRET_KEY || "";

  if (!SUPABASE_URL || !SUPABSE_SECRET_KEY) {
    throw new Error("Missing Supabase environment variables");
  }
  const supabase = createClient<Database>(SUPABASE_URL, SUPABSE_SECRET_KEY);

  return supabase;
};
