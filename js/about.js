document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Load saved theme
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") document.body.classList.add("light");

  // Theme switcher
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Simple fade animation on scroll
  const sections = document.querySelectorAll(".about-container h2, .about-container h3, .about-container p, .about-container li, .quote");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.style.opacity = 1;
    });
  }, { threshold: 0.2 });

  sections.forEach(el => {
    el.style.opacity = 0;
    el.style.transition = "opacity 1s ease";
    observer.observe(el);
  });
});
