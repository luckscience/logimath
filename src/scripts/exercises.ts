type Difficulty = "Principiante" | "Intermedio" | "Avanzado";
type DifficultyColor = "yellow" | "gray" | "red" | "green";

interface Exercise {
  title: string;
  difficulty: Difficulty;
  difficultyColor: DifficultyColor;
  category: string;
  link: string;
}

const exercises: Exercise[] = [
  {
    title: "El puente y la antorcha",
    difficulty: "Intermedio",
    difficultyColor: "gray",
    category: "Optimización",
    link: "/exercises/example"
  },
  {
    title: "Juan y las manzanas",
    difficulty: "Avanzado",
    difficultyColor: "red",
    category: "Retroceso",
    link: "/exercises/exercise-juan-and-apples"
  },
  {
    title: "Example 3",
    difficulty: "Principiante",
    difficultyColor: "green",
    category: "Optimización",
    link: "/exercises/example3"
  },
  {
    title: "Example 4",
    difficulty: "Avanzado",
    difficultyColor: "red",
    category: "Optimización",
    link: "/exercises/example4"
  },
  {
    title: "Example 5",
    difficulty: "Principiante",
    difficultyColor: "green",
    category: "Optimización",
    link: "/exercises/example5"
  },
  {
    title: "Example 6",
    difficulty: "Intermedio",
    difficultyColor: "gray",
    category: "Optimización",
    link: "/exercises/example6"
  }
];

// ✅ Tipado correcto del DOM
const container = document.getElementById("cards-container") as HTMLDivElement | null;
const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");

if (!container) {
  throw new Error("No se encontró #cards-container");
}

let currentFilter: string = "all";
let searchTerm: string = "";

// ✅ FIX 1: tipar correctamente el parámetro
function getBadgeColor(color: DifficultyColor): string {
  const colors: Record<DifficultyColor, string> = {
    yellow: "badge-yellow",
    gray: "badge-gray",
    red: "badge-red",
    green: "badge-green"
  };

  return colors[color];
}

// 🔗 URL
function updateURL(): void {
  const params = new URLSearchParams();

  if (currentFilter !== "all") {
    params.set("difficulty", currentFilter);
  }

  if (searchTerm) {
    params.set("search", searchTerm);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

// 📥 cargar URL
function loadFromURL(): void {
  if (!searchInput) return;

  const params = new URLSearchParams(window.location.search);

  const difficulty = params.get("difficulty");
  const search = params.get("search");

  if (difficulty) currentFilter = difficulty;

  if (search) {
    searchTerm = search.toLowerCase();
    searchInput.value = search; // ✅ FIX 2 (ya tipado correctamente)
  }

  filterButtons.forEach(btn => {
    btn.classList.remove("active");

    // ✅ FIX 3 dataset tipado correctamente
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    }
  });
}

// 🧩 render
function renderCards(): void {
  if (!container) return;

  container.innerHTML = "";

  const filtered = exercises.filter(ex => {
    const matchesSearch =
      ex.title.toLowerCase().includes(searchTerm) ||
      ex.category.toLowerCase().includes(searchTerm);

    const matchesFilter =
      currentFilter === "all" || ex.difficulty === currentFilter;

    return matchesSearch && matchesFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-gray-400 col-span-full">No se encontraron ejercicios</p>`;
    return;
  }

  filtered.forEach(ex => {
    const card = document.createElement("div");
    card.className = "exercise-card group";
    card.onclick = () => window.location.href = ex.link;

    card.innerHTML = `
      <h2 class="card-title">${ex.title}</h2>
      <div class="card-tags">
        <span class="badge badge-yellow">${ex.category}</span>
        <span class="badge ${getBadgeColor(ex.difficultyColor)}">
          ${ex.difficulty}
        </span>
      </div>
    `;

    container.appendChild(card);
  });

  updateURL();
}

// 🔍 buscador
if (searchInput) {
  searchInput.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement | null; // ✅ FIX 4

    if (!target) return;

    searchTerm = target.value.toLowerCase();
    renderCards();
  });
}

// 🎯 filtros
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // ✅ FIX 5 dataset seguro
    currentFilter = btn.dataset.filter ?? "all";

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderCards();
  });
});

// 🚀 init
loadFromURL();
renderCards();