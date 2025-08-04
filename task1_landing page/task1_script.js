// Scroll effect on navbar
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Toggle menu
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("show");
});

// Reveal on scroll
ScrollReveal().reveal('.reveal', {
  distance: '40px',
  duration: 800,
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 100
});
