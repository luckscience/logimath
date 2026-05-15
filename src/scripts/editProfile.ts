import { supabase } from "../lib/supabase.ts";

const openBtn = document.getElementById("open-edit-modal");
const closeBtn = document.getElementById("close-edit-modal");
const saveBtn = document.getElementById("save-changes-btn");
const modal = document.getElementById("edit-modal") as HTMLElement;
const modalContent = document.getElementById("modal-content") as HTMLElement;
const overlay = document.getElementById("modal-overlay");

// Variables para obtener los valores de los inputs.
const usernameInput = document.getElementById(
  "username-input",
) as HTMLInputElement;
const bioInput = document.getElementById("bio-input") as HTMLTextAreaElement;

openBtn?.addEventListener("click", () => {
  modal.classList.remove("opacity-0", "pointer-events-none");

  modalContent.classList.remove("scale-95", "opacity-0");
  modalContent.classList.add("scale-100", "opacity-100");
});

function closeModal() {
  modal.classList.add("opacity-0", "pointer-events-none");

  modalContent.classList.add("scale-95", "opacity-0");
  modalContent.classList.remove("scale-100", "opacity-100");
}

async function saveChanges() {
  const newUsername = usernameInput.value;
  const newBio = bioInput.value;

  const res = await fetch("/api/update-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUsername,
      bio: newBio,
    }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    alert(error);
    return;
  }

  alert("Perfil actualizado");
  closeModal();
}

closeBtn?.addEventListener("click", closeModal);

saveBtn?.addEventListener("click", saveChanges);

overlay?.addEventListener("click", closeModal);
