/* ============================================================
   navigation.js — Header scroll + mobile menu
   ============================================================ */
export function initNavigation() {
  const header    = document.getElementById('site-header');
  const menuBtn   = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  /* --- Scroll shadow --- */
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      menuBtn.textContent = open ? '✕' : '☰';
    });

    /* Close on link tap */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) closeMenu();
    });
  }

  function closeMenu() {
    if (!mobileNav) return;
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
