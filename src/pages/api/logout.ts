import { createSupabaseServerClient } from "../../lib/supabaseServer";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  const supabase = createSupabaseServerClient(cookies);

  await supabase.auth.signOut();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
