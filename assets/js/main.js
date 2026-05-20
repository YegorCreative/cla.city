/* ============================================================
   CLA.CITY — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Mobile Menu
  ---------------------------------------------------------- */
  const menuBtn   = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      mobileNav.setAttribute('aria-hidden', !open);
      menuBtn.textContent = open ? '✕' : '☰';
    });

    // Close on any link tap
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.textContent = '☰';
      });
    });

    // Close on outside tap
    document.addEventListener('click', e => {
      if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuBtn.textContent = '☰';
      }
    });
  }

  /* ----------------------------------------------------------
     Header scroll shadow
  ---------------------------------------------------------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     Active nav link
  ---------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     Fade-in on scroll (IntersectionObserver)
  ---------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }

  /* ----------------------------------------------------------
     FAQ accordion
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const open   = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0';
    });
  });

})();
