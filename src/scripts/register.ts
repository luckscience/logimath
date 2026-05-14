import { supabase } from "../lib/supabase";

const form = document.getElementById("register-form");

if (!(form instanceof HTMLFormElement)) {
  throw new Error("Formulario no encontrado");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const username = String(formData.get("username") || "");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Cuenta creada correctamente");

  window.location.href = "/login";
});
