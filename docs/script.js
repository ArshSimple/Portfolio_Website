// script.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.dark-mode-toggle');
  const backToTop = document.getElementById('backToTop');
  const faders = document.querySelectorAll('.fade-in-up');

  // --- DARK MODE ---

  // Apply saved theme on load
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = 'Light Mode';
  } else {
    if (toggleBtn) toggleBtn.textContent = 'Dark Mode';
  }

  // Toggle dark mode on button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = 'Light Mode';
      } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = 'Dark Mode';
      }
    });
  }

  // --- INTERSECTION OBSERVER FOR FADE-IN-UP ---

  if (faders.length > 0) {
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(fader => appearOnScroll.observe(fader));
  }

  // --- BACK TO TOP BUTTON ---

  if (backToTop) {
    // Show button after scrollY > 300
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // Smooth scroll to top on click
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
