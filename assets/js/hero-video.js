/* ============================================================
   hero-video.js — Ensure muted homepage hero video autoplays
   ============================================================ */
export function initHeroVideo() {
  const video = document.querySelector('.page-hero--home .page-hero__video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        /* Autoplay can be blocked; native poster remains visible. */
      });
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('canplay', tryPlay, { once: true });
    video.load();
  }
}
