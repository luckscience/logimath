let controller: AbortController;

// =========================
// ESTADO GLOBAL
// =========================
let currentFilter = "all";
let searchTerm = "";

// =========================
// INIT
// =========================
function initExercises(): void {

  // limpiar listeners viejos
  controller?.abort();

  controller = new AbortController();

  const signal = controller.signal;

  // elementos
  const cards =
    document.querySelectorAll<HTMLElement>(".exercise-card");

  const searchInput =
    document.getElementById("search-input") as HTMLInputElement | null;

  const filterButtons =
    document.querySelectorAll<HTMLButtonElement>(".filter-btn");

  // =========================
  // ACTUALIZAR URL
  // =========================
  function updateURL(): void {

    const params = new URLSearchParams();

    if (currentFilter !== "all") {
      params.set("difficulty", currentFilter);
    }

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    const query = params.toString();

    const newUrl =
      query.length > 0
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

    window.history.replaceState(
      {},
      "",
      newUrl
    );
  }

  // =========================
  // CARGAR ESTADO DESDE URL
  // =========================
  function loadFromURL(): void {

    const params =
      new URLSearchParams(window.location.search);

    const difficulty =
      params.get("difficulty");

    const search =
      params.get("search");

    if (difficulty) {
      currentFilter = difficulty;
    }

    if (search) {

      searchTerm = search.toLowerCase();

      if (searchInput) {
        searchInput.value = search;
      }
    }

    // restaurar botón activo
    filterButtons.forEach(btn => {

      btn.classList.remove("active");

      if (
        btn.dataset.filter === currentFilter
      ) {
        btn.classList.add("active");
      }
    });
  }

  // =========================
  // FILTRAR CARDS
  // =========================
  function filterCards(): void {

    let visibleCards = 0;

    cards.forEach(card => {

      const title =
        card.dataset.title?.toLowerCase() ?? "";

      const category =
        card.dataset.category?.toLowerCase() ?? "";

      const difficulty =
        card.dataset.difficulty ?? "";

      const matchesSearch =
        title.includes(searchTerm) ||
        category.includes(searchTerm);

      const matchesFilter =
        currentFilter === "all" ||
        difficulty === currentFilter;

      const shouldShow =
        matchesSearch && matchesFilter;

      card.classList.toggle(
        "hidden-card",
        !shouldShow
      );

      if (shouldShow) {
        visibleCards++;
      }
    });

    updateURL();

    console.log(
      `Cards visibles: ${visibleCards}`
    );
  }

  // =========================
  // BUSCADOR
  // =========================
  searchInput?.addEventListener(
    "input",
    (e: Event) => {

      const target =
        e.target as HTMLInputElement;

      searchTerm =
        target.value.toLowerCase();

      filterCards();
    },
    { signal }
  );

  // =========================
  // FILTROS
  // =========================
  filterButtons.forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        currentFilter =
          btn.dataset.filter ?? "all";

        // remover active
        filterButtons.forEach(b =>
          b.classList.remove("active")
        );

        // agregar active
        btn.classList.add("active");

        filterCards();
      },
      { signal }
    );
  });

  // =========================
  // CARGA INICIAL
  // =========================
  loadFromURL();

  filterCards();

  console.log(
    "Exercises initialized"
  );
}

// =========================
// ASTRO CLIENT ROUTER
// =========================
document.addEventListener(
  "astro:page-load",
  initExercises
);

// =========================
// PRIMER LOAD
// =========================
initExercises();