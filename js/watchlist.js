document.addEventListener("DOMContentLoaded", () => {
  const watchlistContainer = document.getElementById("watchlist-movies");
  const themeToggle = document.getElementById("themeToggle");

  if (!watchlistContainer) {
    console.error("⚠️ #watchlist-movies not found");
    return;
  }

  const WATCH_KEY = "cine_watchlist";

  // ✅ Загружаем сохранённые фильмы
  function getWatchlist() {
    return JSON.parse(localStorage.getItem(WATCH_KEY) || "[]");
  }

  // ✅ Сохраняем обновлённый список
  function saveWatchlist(list) {
    localStorage.setItem(WATCH_KEY, JSON.stringify(list));
  }

  // ✅ Удалить фильм из Watchlist
  function removeMovie(id) {
    const list = getWatchlist().filter(m => m.id !== id);
    saveWatchlist(list);
    renderWatchlist();
  }

  // ✅ Отобразить фильмы
  function renderWatchlist() {
    const list = getWatchlist();
    watchlistContainer.innerHTML = "";

    if (list.length === 0) {
watchlistContainer.innerHTML = `
  <div style="
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:65vh;
    width:100%;
    text-align:center;
  ">
    <p style="color:var(--muted-color,#999);font-size:1.2rem;margin:0;">
      Your watchlist is empty 🎬
    </p>
  </div>`;
return;
}

    list.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="m-body">
          <h4>${movie.title}</h4>
          <small>${movie.genre} • ${movie.year}</small>
          <div style="margin-top:8px;display:flex;gap:6px;">
            <button class="btn primary trailer-btn">🎬 Trailer</button>
            <button class="remove-btn">Remove</button>
          </div>
        </div>
      `;

      // Кнопка "Trailer"
      card.querySelector(".trailer-btn").addEventListener("click", () => {
        if (typeof openModal === "function") openModal(movie);
      });

      // Кнопка "Remove"
      card.querySelector(".remove-btn").addEventListener("click", () => removeMovie(movie.id));

      watchlistContainer.appendChild(card);
    });
  }

  // ✅ Поддержка темы
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") document.body.classList.add("light");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // ✅ Рендерим всё при загрузке
  renderWatchlist();
});
