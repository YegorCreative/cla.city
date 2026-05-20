/* ============================================================
   media-player.js — Video cards + gallery lightbox
   ============================================================ */
export function initMediaPlayer() {
  initVideoCards();
  initGallery();
  initGiveAmounts();
}

/* --- Video card: swap thumbnail for iframe on click --- */
function initVideoCards() {
  document.querySelectorAll('.video-card[data-video-id]').forEach(card => {
    const thumb = card.querySelector('.video-thumb');
    if (!thumb) return;

    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', () => {
      const id = card.getAttribute('data-video-id');
      if (!id) return;

      const iframe       = document.createElement('iframe');
      iframe.src         = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.allow       = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title       = card.querySelector('h4')?.textContent || 'Sermon video';

      /* Replace thumb content */
      thumb.innerHTML = '';
      thumb.appendChild(iframe);
    });
  });
}

/* --- Minimal gallery lightbox --- */
function initGallery() {
  const items = document.querySelectorAll('.gallery-item[data-src]');
  if (!items.length) return;

  /* Create overlay once */
  const overlay = document.createElement('div');
  overlay.id = 'gallery-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.92)',
    zIndex: '2000', display: 'none',
    alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
  });

  const img = document.createElement('img');
  Object.assign(img.style, {
    maxWidth: '90vw', maxHeight: '90vh',
    borderRadius: '8px', boxShadow: '0 20px 80px rgba(0,0,0,0.6)'
  });

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      img.src            = item.getAttribute('data-src');
      img.alt            = item.querySelector('img')?.alt || '';
      overlay.style.display = 'flex';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    img.src = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.style.display = 'none';
  });
}

/* --- Give page: amount selector --- */
function initGiveAmounts() {
  const btns = document.querySelectorAll('.give-amount-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
