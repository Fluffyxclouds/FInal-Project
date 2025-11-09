// Contact form logic
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const themeToggle = document.getElementById("theme");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });
});
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill out all fields!';
        formMessage.style.color = 'orange';
    } else {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.style.color = 'lightgreen';
        document.getElementById('contactForm').reset();
    }
