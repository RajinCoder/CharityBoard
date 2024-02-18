import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ckbyuailhtldmqnnovlu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYnl1YWlsaHRsZG1xbm5vdmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMDAwOTcsImV4cCI6MjAyMzc3NjA5N30.B9Ts89o7R7egm6Y3nM3zyRi7EOu0FVxBewOyW4MWp6s";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Bruh this dont work");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
