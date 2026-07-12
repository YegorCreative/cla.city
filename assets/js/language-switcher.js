/* ============================================================
   language-switcher.js — Bilingual URL helpers
   ============================================================ */
export function initLanguageSwitcher() {
  /* Detect current language from path (/en/ or /ru/) */
  const path    = window.location.pathname;
  const isRu    = path.includes('/ru/');
  const isEn    = path.includes('/en/');
  const page    = path.split('/').pop() || 'index.html';

  /* Mark active lang buttons */
  document.querySelectorAll('.lang-btn, .mobile-lang-row a').forEach(btn => {
    const lang = btn.getAttribute('data-lang') || btn.textContent.trim().toLowerCase();
    if ((isEn && lang === 'en') || (isRu && lang === 'ru')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  /* Build correct sibling-language URL for each switcher link */
  document.querySelectorAll('[data-lang-link]').forEach(link => {
    const targetLang = link.getAttribute('data-lang-link');
    if (targetLang === 'en') {
      link.href = '../en/' + page;
    } else if (targetLang === 'ru') {
      link.href = '../ru/' + page;
    }
  });
}

/* Utility: redirect root visitors based on browser language */
export function autoRedirect(defaultLang = 'ru') {
  if (!window.location.pathname.endsWith('/')) return; // only on root
  const lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  const target = defaultLang === 'ru'
    ? './ru/'
    : (lang.startsWith('ru') ? './ru/' : './en/');
  window.location.replace(target);
}
