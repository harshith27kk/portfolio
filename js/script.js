const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const toast = document.getElementById('toast');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀' : '☾';

themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀' : '☾';
});

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.style.transform = y > lastY && y > 80 ? 'translateY(-100%)' : 'translateY(0)';
  lastY = y;
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  e.target.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-pill, .exp-card').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 8) * 50}ms`;
  obs.observe(el);
});