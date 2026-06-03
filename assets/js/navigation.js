/* ============================================================
   navigation.js — Header scroll + mobile menu
   ============================================================ */
export function initNavigation() {
  const header    = document.getElementById('site-header');
  const menuBtn   = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBreakpoint = 992;

  /* --- Scroll shadow --- */
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  if (menuBtn && mobileNav) {
    menuBtn.setAttribute('type', 'button');
    menuBtn.setAttribute('aria-controls', 'mobile-nav');

    const setMenuOpen = (open) => {
      mobileNav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      menuBtn.textContent = open ? '✕' : '☰';
    };

    menuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      setMenuOpen(!mobileNav.classList.contains('open'));
    });

    /* Close on link tap */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMenu();
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
    if (!mobileNav || !menuBtn) return;
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuBtn.textContent = '☰';
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
