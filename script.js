// Theme toggle and animation helpers
(function() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const stored = localStorage.getItem('theme');
  const initial = stored || (prefersLight ? 'light' : 'dark');

  const applyTheme = theme => {
    root.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'light' ? '🌙' : '🌞';
    themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  };

  applyTheme(initial);

  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
})();

// Intersection Observer to trigger reveal animations
(function() {
  const elements = document.querySelectorAll('.observe');
  if (!elements.length) return;

  const activate = el => {
    el.classList.add('is-visible');
  };

  if (!('IntersectionObserver' in window)) {
    elements.forEach(activate);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach((el, index) => {
    if (!el.style.getPropertyValue('--delay')) {
      el.style.setProperty('--delay', `${Math.min(index * 0.08, 0.6)}s`);
    }
    observer.observe(el);
  });
})();

// Search filter for posts
(function() {
  const search = document.getElementById('search');
  const posts = document.querySelectorAll('.card');
  if (!search || !posts.length) return;

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();

    posts.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const tags = card.getAttribute('data-tags').toLowerCase();
      const matches = !q || title.includes(q) || tags.includes(q);
      card.hidden = !matches;
      card.classList.toggle('is-dimmed', !matches && q.length > 0);
    });
  });
})();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
