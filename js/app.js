(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const THEME_KEY = 'cine_theme';
  const html = document.documentElement;
  const themeToggle = $('#themeToggle');

  function applyTheme(theme){
    if(theme === 'light') html.setAttribute('data-theme','light');
    else html.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);

  themeToggle?.addEventListener('click', () => {
    const now = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(now);
  });

  const mobileBtn = $('#mobileMenuBtn');
  const mobileMenu = $('#mobileMenu');
  mobileBtn?.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    const hidden = mobileMenu.getAttribute('aria-hidden') === 'true';
    mobileMenu.setAttribute('aria-hidden', String(!hidden));
  });


  window.MOVIES = [
    {
      id: 1,
      title: "Tron: Ares",
      year: 2025,
      genre: "Action / Adventure / Sci-Fi",
      poster: "images/a33210588-5398216.jpg",
      desc: "The film continues the epic story in a world where digital space is populated by virtual beings possessing real emotions.",
      trailer: "trailers/Tron.mp4"
    },
    {
      id: 2,
      title: "Dispatcher",
      year: 2025,
      genre: "Action / Thriller",
      poster: "images/a59317u57548_qaitadan_70kh100-21.jpg",
      desc: "A tense thriller about a broker arranging dangerous deals between corrupt corporations and blackmailers.",
      trailer: "trailers/Dispatcher.mp4"
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      poster: "images/the-shawshank-redemption.jpg",
      desc: "A timeless story of hope and friendship inside the walls of Shawshank prison.",
      trailer: "trailers/Shawshank.mp4"
    },
    {
      id: 4,
      title: "The Godfather Trilogy 1901-1980",
      year: 1992,
      genre: "Crime / Drama",
      poster: "images/MV5BYzVlYzY4YmUtMDliMS00YjMzLTgzMWUtZDVmZWJiMWFhNzMxXkEyXkFqcGc@._V1_.jpg",
      desc: "An epic cinematic saga about the Corleone mafia family — loyalty, power, and tragedy.",
      trailer: "trailers/Godfather.mp4"
    },
    {
      id: 5,
      title: "Inception",
      year: 2010,
      genre: "Action / Sci-Fi / Thriller",
      poster: "images/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      desc: "A skilled thief enters dreams to steal secrets but faces his most dangerous mission yet.",
      trailer: "trailers/INCEPTION.mp4"
    },
    {
      id: 6,
      title: "Avengers: Infinity War",
      year: 2018,
      genre: "Action / Adventure / Sci-Fi",
      poster: "images/Avengers_Infinity_war_poster.webp",
      desc: "The Avengers unite to stop Thanos from collecting the six Infinity Stones.",
      trailer: "trailers/Avengers.mp4"
    },
    {
      id: 7,
      title: "Titanic",
      year: 1997,
      genre: "Drama / Romance",
      poster: "images/titanic.jpg",
      desc: "A love story between Jack and Rose unfolds aboard the ill-fated Titanic.",
      trailer: "trailers/titanic.mp4"
    },
    {
      id: 8,
      title: "Joker",
      year: 2019,
      genre: "Drama / Thriller",
      poster: "images/Joker.webp",
      desc: "Arthur Fleck, a failed comedian, descends into madness and becomes the Joker.",
      trailer: "trailers/JOKER.mp4"
    },
    {
      id: 9,
      title: "Interstellar",
      year: 2014,
      genre: "Sci-Fi / Drama / Adventure",
      poster: "images/interstellar.jpg",
      desc: "A team of explorers travels through a wormhole in space to ensure humanity's survival.",
      trailer: "trailers/Interstellar.mp4"
    },
    {
      id: 10,
      title: "The Hangover",
      year: 2009,
      genre: "Comedy",
      poster: "images/Hangover.jpg",
      desc: "After a wild night in Las Vegas, friends must retrace their steps to find the missing groom.",
      trailer: "trailers/TheHangover.mp4"
    },
    {
      id: 11,
      title: "Get Out",
      year: 2017,
      genre: "Horror / Thriller",
      poster: "images/getout.jpg",
      desc: "A young African-American visits his white girlfriend's parents — and uncovers a terrifying secret.",
      trailer: "trailers/getout.mp4"
    }
  ];

  const shelf = $('#featuredShelf');
  function renderShelf(){ 
    if(!shelf) return;
    shelf.innerHTML = '';
    MOVIES.slice(0,5).forEach(m => {
      const el = document.createElement('div');
      el.className = 'poster';
      el.tabIndex = 0;
      el.setAttribute('role','button');
      el.innerHTML = `
        <img loading="lazy" src="${m.poster}" alt="Poster: ${m.title}">
        <div class="p-meta"><strong>${m.title}</strong><br><small>${m.year} • ${m.genre}</small></div>
      `;
      el.addEventListener('click', () => openModal(m));
      el.addEventListener('keydown', (e) => { if(e.key === 'Enter') openModal(m); });
      shelf.appendChild(el);
    });
  }
  renderShelf();

  const previewList = $('#previewList');
  function renderPreview(){
    if(!previewList) return;
    previewList.innerHTML = '';
    MOVIES.forEach(m => {
      const card = document.createElement('article');
      card.className = 'movie-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <img src="${m.poster}" alt="Poster: ${m.title}">
        <div class="m-body">
          <h4>${m.title}</h4>
          <small>${m.genre} • ${m.year}</small>
        </div>
      `;
      card.addEventListener('click', () => openModal(m));
      card.addEventListener('keydown', (e) => { if(e.key === 'Enter') openModal(m); });
      previewList.appendChild(card);
    });
  }
  renderPreview();

  const homeSearch = $('#homeSearch');
  homeSearch?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = $('#q').value.trim().toLowerCase();
    if(!q) return window.location.href = 'movies.html';
    localStorage.setItem('cine_search_q', q);
    window.location.href = 'movies.html';
  });

  const modal = $('#movieModal');
  const modalContent = $('#modalContent');
  const closeModalBtn = $('#closeModal');

function openModal(movie){
  if(!modal) return;
  modal.setAttribute('aria-hidden','false');
  

  modalContent.innerHTML = `
    <div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:flex-start">
      <img src="${movie.poster}" alt="Poster ${movie.title}" 
           style="width:220px;border-radius:12px;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,0.5)">
      <div style="flex:1;min-width:250px">
        <h2 style="margin:0">${movie.title} 
          <small style="color:var(--muted)">(${movie.year})</small>
        </h2>
        <p style="color:var(--muted);margin:4px 0">${movie.genre}</p>
        <p style="max-width:56ch;margin-bottom:0.8rem">${movie.desc}</p>
        <div style="display:flex;gap:.6rem">
          <button class="btn primary" id="playTrailer">🎬 Play Trailer</button>
          <button class="btn ghost" id="saveToWL">💾 Save</button>
        </div>
      </div>
    </div>

    <!-- Видео-блок -->
    <div id="trailerContainer" 
         style="margin-top:1.4rem;display:none;position:relative;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.6)">
      <video id="trailerVideo" width="100%" height="auto" controls poster="${movie.poster}" 
             style="border-radius:12px;display:block;background:#000">
        <source src="${movie.trailer}" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
    </div>
  `;

  document.getElementById('playTrailer')?.addEventListener('click', () => {
    const trailerBox = document.getElementById('trailerContainer');
    trailerBox.style.display = 'block';
    document.getElementById('trailerVideo').play();
  });

  document.getElementById('saveToWL')?.addEventListener('click', () => {
    saveToWatchlist(movie);
  });
}


  closeModalBtn?.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal?.addEventListener('click', (ev) => {
    if(ev.target === modal) modal.setAttribute('aria-hidden','true');
  });



  const WATCH_KEY = 'cine_watchlist';
  function saveToWatchlist(movie){
    const raw = localStorage.getItem(WATCH_KEY);
    const arr = raw ? JSON.parse(raw) : [];

    if (arr.find(x => x.id === movie.id)) {
      showToast('🎞️ Already in watchlist', 'info');
      return;
    }

    arr.push(movie);
    localStorage.setItem(WATCH_KEY, JSON.stringify(arr));
    showToast('✅ Saved to watchlist', 'success');
  }


  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `toast toast--${type}`;
    document.body.appendChild(toast);


    requestAnimationFrame(() => {
      toast.classList.add('toast--show');
    });

    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') modal?.setAttribute('aria-hidden','true');
  });

  function setAuthLink(){
    const cur = localStorage.getItem('cine_current');
    const authLink = $('#authLink');
    const authLinkMobile = $('#authLinkMobile');
    if(cur){
      const users = JSON.parse(localStorage.getItem('cine_users') || '[]');
      const u = users.find(x => x.email === cur);
      if(u){
        authLink.textContent = u.name.split(' ')[0];
        authLink.href = 'profile.html';
        if(authLinkMobile) {
          authLinkMobile.textContent = u.name.split(' ')[0];
          authLinkMobile.href='profile.html';
        }
        return;
      }
    }
    if(authLink) { authLink.textContent = 'Sign In'; authLink.href = 'profile.html'; }
    if(authLinkMobile) { authLinkMobile.textContent = 'Sign In'; authLinkMobile.href = 'profile.html'; }
  }
  setAuthLink();

})();
document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("movie-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";
  MOVIES.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="m-body">
        <h4>${movie.title}</h4>
        <small>${movie.genre} • ${movie.year}</small>
        <button class="btn primary play-btn">🎬 Play Trailer</button>
        <button class="btn ghost save-btn">💾 Save</button>
      </div>
    `;
    card.querySelector(".play-btn").addEventListener("click", () => openModal(movie));
    card.querySelector(".save-btn").addEventListener("click", () => saveToWatchlist(movie));
    listContainer.appendChild(card);
  });
});


