// Theme toggle and search filter
(function() {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
  });
})();

(function() {
  const search = document.getElementById('search');
  const posts = document.querySelectorAll('.card');
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    posts.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const tags = card.getAttribute('data-tags').toLowerCase();
      card.style.display = (!q || title.includes(q) || tags.includes(q)) ? 'block' : 'none';
    });
  });
})();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
