import { defineMiddleware } from "astro:middleware";
import { createSupabaseServerClient } from "./lib/supabaseServer";

const protectedRoutes = ["/user"];
const authRoutes = ["/login", "/register"];

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseServerClient(context.cookies);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  context.locals.user = user;

  const pathname =
    context.url.pathname.replace(/\/$/, "") || "/";

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !user) {
    return context.redirect("/login");
  }

  if (isAuthRoute && user) {
    return context.redirect("/user/profile");
  }

  return next();
});