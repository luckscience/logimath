import { supabase } from "../lib/supabase.ts";

const form = document.getElementById("login-form");
const googleBtn = document.getElementById("google-login");

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Formulario no encontrado");
}

if (!(googleBtn instanceof HTMLButtonElement)) {
  throw new Error("Botón Google no encontrado");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    alert(error);
    return;
  }

  window.location.assign("/user/profile");
});

googleBtn.addEventListener("click", async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/user/profile`,
    },
  });
});
