/* ============================================================
   navigation.js — Header scroll + mobile menu
   ============================================================ */
export function initNavigation() {
  const header    = document.getElementById('site-header');
  const menuBtn   = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  let overlay = null;
  const mobileBreakpoint = 992;

  /* --- Scroll shadow --- */
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  if (menuBtn && mobileNav) {
    overlay = document.createElement('button');
    overlay.className = 'mobile-nav-overlay';
    overlay.type = 'button';
    overlay.setAttribute('aria-label', 'Close menu overlay');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    menuBtn.setAttribute('type', 'button');
    menuBtn.setAttribute('aria-controls', 'mobile-nav');

    mobileNav.setAttribute('aria-modal', 'true');
    mobileNav.setAttribute('role', 'dialog');

    const setMenuOpen = (open) => {
      mobileNav.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      overlay.setAttribute('aria-hidden', String(!open));
      menuBtn.textContent = open ? '✕' : '☰';
      document.body.classList.toggle('nav-open', open);
    };

    menuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      setMenuOpen(!mobileNav.classList.contains('open'));
    });

    /* Close on link tap */
    mobileNav.querySelectorAll('.mobile-nav-link, .mobile-lang-row a, .mobile-cta a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Close on overlay tap */
    overlay.addEventListener('click', closeMenu);

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!mobileNav.classList.contains('open')) return;
      if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });

    /* Close on Escape and when returning to desktop */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= mobileBreakpoint) closeMenu();
    }, { passive: true });
  }

  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuBtn.textContent = '☰';
    document.body.classList.remove('nav-open');
  }

  /* --- Active nav link (match current filename) --- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
