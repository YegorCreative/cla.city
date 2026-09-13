/* ============================================================
   jesus-school-player.js — Compact CLA City audio controls
   ============================================================ */

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function initJesusSchoolPlayer() {
  const players = Array.from(document.querySelectorAll('[data-js-player]'));
  if (!players.length) return;

  let active = null;

  const setPlaying = (player, playing) => {
    player.classList.toggle('is-playing', playing);
    const btn = player.querySelector('.js-player__btn');
    if (btn) btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

  const updateTimeDisplay = (player, audio) => {
    const currentEl = player.querySelector('.js-player__current');
    const totalEl = player.querySelector('.js-player__total');
    if (!currentEl || !totalEl) return;

    const current = formatTime(audio.currentTime);
    currentEl.textContent = current || '0:00';

    const total = formatTime(audio.duration);
    if (total) {
      totalEl.textContent = total;
    }
  };

  players.forEach((player) => {
    const audio = player.querySelector('audio');
    const btn = player.querySelector('.js-player__btn');
    const seek = player.querySelector('.js-player__seek');
    if (!audio || !btn || !seek) return;

    const refreshDuration = () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      updateTimeDisplay(player, audio);
    };

    audio.addEventListener('loadedmetadata', refreshDuration);
    audio.addEventListener('durationchange', refreshDuration);

    btn.addEventListener('click', async () => {
      if (active && active !== audio) {
        active.pause();
        const prev = active.closest('[data-js-player]');
        if (prev) setPlaying(prev, false);
      }

      if (audio.paused) {
        try {
          await audio.play();
          active = audio;
          setPlaying(player, true);
        } catch (err) {
          setPlaying(player, false);
        }
      } else {
        audio.pause();
        setPlaying(player, false);
        if (active === audio) active = null;
      }
    });

    audio.addEventListener('timeupdate', () => {
      updateTimeDisplay(player, audio);
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    });

    audio.addEventListener('ended', () => {
      setPlaying(player, false);
      seek.value = '0';
      audio.currentTime = 0;
      updateTimeDisplay(player, audio);
      if (active === audio) active = null;
    });

    seek.addEventListener('input', () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
      updateTimeDisplay(player, audio);
    });
  });
}
