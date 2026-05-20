/* ============================================================
   script.js — Main entry point
   Imports and initialises all modules.
   ============================================================ */
import { initNavigation }       from './navigation.js';
import { initLanguageSwitcher } from './language-switcher.js';
import { initAnimations }       from './animations.js';
import { initMediaPlayer }      from './media-player.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSwitcher();
  initAnimations();
  initMediaPlayer();
});
