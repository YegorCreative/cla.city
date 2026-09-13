/* ============================================================
   jesus-school-player.js — Compact CLA City audio controls
   ============================================================ */

export function initJesusSchoolPlayer() {
  const players = Array.from(document.querySelectorAll('[data-js-player]'));
  if (!players.length) return;

  let active = null;

  const setPlaying = (player, playing) => {
    player.classList.toggle('is-playing', playing);
    const btn = player.querySelector('.js-player__btn');
    if (btn) btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

  players.forEach((player) => {
    const audio = player.querySelector('audio');
    const btn = player.querySelector('.js-player__btn');
    const seek = player.querySelector('.js-player__seek');
    if (!audio || !btn || !seek) return;

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
      if (!audio.duration || Number.isNaN(audio.duration)) return;
      seek.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
    });

    audio.addEventListener('ended', () => {
      setPlaying(player, false);
      seek.value = '0';
      if (active === audio) active = null;
    });

    seek.addEventListener('input', () => {
      if (!audio.duration || Number.isNaN(audio.duration)) return;
      audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
    });
  });
}
