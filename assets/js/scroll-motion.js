/* ============================================================
   scroll-motion.js — Visible, elegant parallax + hero depth
   ============================================================ */

const REDUCE = '(prefers-reduced-motion: reduce)';
const MOBILE = '(max-width: 768px)';

function canAnimate() {
  return !window.matchMedia(REDUCE).matches && !window.matchMedia(MOBILE).matches;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function initScrollMotion() {
  const layers = Array.from(document.querySelectorAll('[data-parallax-layer]'));
  const hero = document.querySelector('.page-hero--home');
  const heroVideo = hero?.querySelector('.page-hero__video');
  const heroContent = hero?.querySelector('.page-hero__content') || hero?.querySelector('.container');

  let ticking = false;
  let enabled = canAnimate();

  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 1;

    if (!enabled) {
      layers.forEach((layer) => {
        layer.style.transform = 'translate3d(0,0,0) scale(1.12)';
      });
      if (heroVideo) heroVideo.style.transform = '';
      if (heroContent) heroContent.style.transform = '';
      return;
    }

    /* --- Hero depth (subtle, readable) --- */
    if (hero && heroVideo && heroContent) {
      const rect = hero.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      const videoY = progress * 28;
      const videoScale = 1 + progress * 0.06;
      const contentY = progress * -22;
      heroVideo.style.transform = `translate3d(0, ${videoY.toFixed(2)}px, 0) scale(${videoScale.toFixed(4)})`;
      heroContent.style.transform = `translate3d(0, ${contentY.toFixed(2)}px, 0)`;
    }

    /* --- Photographic parallax layers --- */
    layers.forEach((layer) => {
      const host = layer.closest('.parallax-media') || layer.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > vh + 80) return;

      const speed = Number(layer.dataset.parallaxSpeed || 55);
      const progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
      const shift = clamp(progress * -speed, -speed, speed);
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.14)`;
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
