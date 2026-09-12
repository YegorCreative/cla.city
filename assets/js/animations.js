/* ============================================================
   animations.js — Scroll reveals + FAQ accordion
   ============================================================ */
export function initAnimations() {
  initScrollReveal();
  initFAQ();
}

/* --- IntersectionObserver scroll reveal --- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.fade-in, .fade-in--scale, .fade-in--left, .fade-in--right');

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* --- FAQ accordion --- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const open   = item.classList.toggle('open');

      btn.setAttribute('aria-expanded', String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0';

      /* Close other open items */
      const siblings = item.closest('.faq-list')?.querySelectorAll('.faq-item');
      siblings?.forEach(sibling => {
        if (sibling !== item && sibling.classList.contains('open')) {
          sibling.classList.remove('open');
          sibling.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          sibling.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
    });
  });
}
