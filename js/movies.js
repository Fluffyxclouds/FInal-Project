document.addEventListener("DOMContentLoaded", () => {
  const movieList = document.getElementById("movie-list");
  const searchInput = document.getElementById("search");
  const genreFilter = document.getElementById("genre-filter");
  const themeToggle = document.getElementById("themeToggle");

  if (!movieList || typeof MOVIES === "undefined") {
    console.error("Movies data not found!");
    return;
  }

  // ✅ Показываем все фильмы — без кнопок
  function displayMovies(list) {
    movieList.innerHTML = "";
    list.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.genre} • ${movie.year}</p>
        </div>
      `;
      // Если хочешь — можешь убрать трейлер при клике
      card.addEventListener("click", () => openModal(movie));
      movieList.appendChild(card);
    });
  }

  // ✅ Поиск и фильтрация
  function filterMovies() {
    const text = searchInput.value.toLowerCase();
    const genre = genreFilter.value;
    const filtered = MOVIES.filter(m => {
      const matchesGenre = genre === "all" || m.genre.toLowerCase().includes(genre.toLowerCase());
      const matchesText = m.title.toLowerCase().includes(text);
      return matchesGenre && matchesText;
    });
    displayMovies(filtered);
  }

  // ✅ Тема
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") document.body.classList.add("light");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  searchInput.addEventListener("input", filterMovies);
  genreFilter.addEventListener("change", filterMovies);

  displayMovies(MOVIES);
});
