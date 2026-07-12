/* ============================================================
   partials-loader.js — Build-free shared HTML fragment loader

   Usage:
   <div data-partial="header"></div>
   ============================================================ */

export async function initPartials(root = document) {
  const placeholders = [...root.querySelectorAll('[data-partial]')];

  await Promise.all(placeholders.map(loadPartial));
}

async function loadPartial(placeholder) {
  const name = placeholder.getAttribute('data-partial');
  if (!name) return;

  const language = document.documentElement.lang;
  const source = `../partials/${language}/${name}.html`;

  try {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error(`Unable to load partial: ${source}`, error);
  }
}
