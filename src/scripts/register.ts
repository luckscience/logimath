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

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    alert(error);
    return;
  }

  alert("Cuenta creada correctamente");
  window.location.href = "/login";
});