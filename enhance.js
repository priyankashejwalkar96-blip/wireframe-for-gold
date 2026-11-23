/* ==========================================================================
   AURO & JEWELLARY — ENHANCEMENT SCRIPT
   Small, dependency-free helpers that sit next to script.js:
     1. Mobile drawer: dark overlay, scroll-lock, close on Esc / link / overlay
     2. Scroll-reveal: cards fade + slide up as they enter the screen
   If this file fails to load, the site still works normally.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Mobile drawer helpers ---------- */
  function initDrawer() {
    var drawer = document.getElementById('mobileDrawer');
    if (!drawer) return;

    var overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function sync() {
      var open = drawer.classList.contains('active');
      overlay.classList.toggle('active', open);
      document.body.classList.toggle('no-scroll', open);
    }
    function close() { drawer.classList.remove('active'); sync(); }

    // script.js toggles the "active" class — we just react to it
    new MutationObserver(sync).observe(drawer, { attributes: true, attributeFilter: ['class'] });

    overlay.addEventListener('click', close);
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('.drawer-links a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
    // If the window grows to desktop size while the drawer is open, close it
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991 && drawer.classList.contains('active')) close();
    });
  }

  /* ---------- 2. Scroll-reveal ---------- */
  function initReveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var selectors = [
      '.section-header', '.feature-item', '.category-card', '.product-card',
      '.tab-product-card', '.demifine-card', '.festive-card', '.review-card',
      '.insta-item', '.lookbook-item', '.step', '.contact-action-card',
      '.faq-item-card', '.showroom-box', '.footer-col'
    ].join(',');

    var items = Array.prototype.slice.call(document.querySelectorAll(selectors));
    if (!items.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) {
      // stagger siblings so a row of cards cascades in
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', Math.min(idx, 7) * 70 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });

    document.documentElement.classList.add('reveal-ready');
  }

  function start() {
    try { initDrawer(); } catch (e) { /* non-critical */ }
    try { initReveal(); } catch (e) { /* non-critical */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
