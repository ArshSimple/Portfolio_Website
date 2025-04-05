// Dark Mode Toggle (saved to localStorage)
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Scroll Reveal
document.querySelectorAll('.fade-in-up').forEach((el) => {
  const observer = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.2 });
  observer.observe(el);
});

// Back to Top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact Form AJAX
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = "Sending...";
    responseDiv.style.opacity = 1;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const result = await response.text();
      responseDiv.innerHTML = result;
      form.reset();
      setTimeout(() => (responseDiv.style.opacity = 0), 5000);
    } catch (err) {
      responseDiv.innerHTML = "<p class='error'>Error! Try again later.</p>";
    }
  });
}
