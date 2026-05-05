// ============================================
// CLA City Church — Main JavaScript
// Minimal, purposeful interactions
// ============================================

(function () {
  'use strict';

  // ── Sticky Header ──────────────────────────
  const header = document.querySelector('.site-header');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top visibility
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile Menu Toggle ──────────────────────
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Scroll-to-top Button ───────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Smooth anchor scrolling (offset for fixed header) ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
