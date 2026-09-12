/* ============================================================
   scroll-motion.js — Subtle parallax for selected photo moments
   ============================================================ */

const REDUCE = '(prefers-reduced-motion: reduce)';
const MOBILE = '(max-width: 768px)';
const MAX_SHIFT = 18; /* px — keep cinematic but calm */

function canAnimate() {
  return !window.matchMedia(REDUCE).matches && !window.matchMedia(MOBILE).matches;
}

export function initScrollMotion() {
  const layers = Array.from(document.querySelectorAll('[data-parallax-layer]'));
  if (!layers.length) return;

  let ticking = false;
  let enabled = canAnimate();

  const update = () => {
    ticking = false;
    if (!enabled) {
      layers.forEach((layer) => {
        layer.style.transform = 'translate3d(0,0,0)';
      });
      return;
    }

    const vh = window.innerHeight || 1;
    layers.forEach((layer) => {
      const host = layer.closest('.parallax-media') || layer.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;

      const progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
      const shift = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, progress * MAX_SHIFT * -1.4));
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  const refreshMode = () => {
    enabled = canAnimate();
    update();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', refreshMode, { passive: true });
  window.matchMedia(REDUCE).addEventListener?.('change', refreshMode);
  window.matchMedia(MOBILE).addEventListener?.('change', refreshMode);
  update();
}
