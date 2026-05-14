import { supabase } from "../lib/supabase";

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn instanceof HTMLButtonElement) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();

    window.location.href = "/";
  });
}
