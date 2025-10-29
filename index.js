(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  const yearEl = document.getElementById('year');

  function setYear() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function applyStoredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') root.setAttribute('data-theme', 'light');
      if (stored === 'dark') root.removeAttribute('data-theme');
      updateThemeIcon();
    } catch (_) {}
  }

  function toggleTheme() {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'dark'); } catch (_) {}
    } else {
      root.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', 'light'); } catch (_) {}
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    if (!icon) return;
    const isLight = root.getAttribute('data-theme') === 'light';
    icon.textContent = isLight ? '🌙' : '☀️';
  }

  function setupMobileNav() {
    if (!navToggle || !navList) return;
    navToggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const id = link.getAttribute('href');
        if (!id || id === '#' || id.length === 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      });
    });
  }

  setYear();
  applyStoredTheme();
  setupMobileNav();
  setupSmoothScroll();

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
})();


