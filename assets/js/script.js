/* ============================================================
   script.js — Main entry point
   Imports and initialises all modules.
   ============================================================ */
import { initNavigation }       from './navigation.js';
import { initLanguageSwitcher } from './language-switcher.js';
import { initAnimations }       from './animations.js';
import { initMediaPlayer }      from './media-player.js';
import { initPartials }         from './partials-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initPartials();
  initNavigation();
  initLanguageSwitcher();
  initAnimations();
  initMediaPlayer();
});
