import { supabase } from "../lib/supabase";

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn instanceof HTMLButtonElement) {
  logoutBtn.addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  });
}