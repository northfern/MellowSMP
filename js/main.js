// === Mellow SMP · main.js ===

(function () {
  'use strict';

  /* --- Шапка при скролле + индикатор прогресса --- */
  const nav = document.getElementById('nav');
  const doc = document.documentElement;

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 32) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    nav.style.setProperty('--progress', progress.toFixed(4));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* --- Плавное появление секций --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();
