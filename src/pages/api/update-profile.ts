import { createSupabaseServerClient } from "../../lib/supabaseServer";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  const { username, bio } = await request.json();

  const supabase = createSupabaseServerClient(cookies);

  // Verificar usuario autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new Response(JSON.stringify({ error: "No autenticado" }), {
      status: 401,
    });
  }

  // Validaciones
  if (!username || username.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Username requerido" }), {
      status: 400,
    });
  }

  // Actualizar en servidor
  const { error } = await supabase
    .from("profiles")
    .update({
      username: username.trim(),
      bio: bio || "",
    })
    .eq("id", user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
};
