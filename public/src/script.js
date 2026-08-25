// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Contact form: honest demo mode until real backend is connected
const form = document.querySelector('.contact-form');
if (form && form.dataset.mode === 'demo') {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const note = form.querySelector('.demo-note');
    const original = btn.textContent;
    btn.textContent = 'Demo-Modus aktiv';
    btn.disabled = true;
    if (note) {
      note.textContent = 'Demo: Es wurden keine Daten gesendet. Der echte Versand wird mit dem Live-Betrieb aktiviert.';
      note.style.borderColor = '#c9a227';
      note.style.background = '#fdf6dd';
    }
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2500);
  });
}
