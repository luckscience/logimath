import { createSupabaseServerClient } from "../../lib/supabaseServer";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password, username } = await request.json();

  // Validaciones básicas
  if (!email || !password || !username) {
    return new Response(JSON.stringify({ error: "Campos requeridos" }), {
      status: 400,
    });
  }

  const supabase = createSupabaseServerClient(cookies);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
