# Hero component

`hero.html` is the build-free reference pattern for a background-image CLA hero. It reuses the existing hero, button, typography, and responsive rules in `assets/css/styles.css`; it does not require component-specific CSS or JavaScript.

## Content contract

- Replace the image path and write an appropriate `alt` value when the image conveys content. Keep `alt=""` when the image is decorative because the overlay text already communicates its meaning.
- Replace the eyebrow, heading, description, and link content for the page language. The eyebrow and either CTA may be removed when unused.
- Keep one page-level `<h1>`. If `hero-heading` is already used on the page, give the heading a unique ID and update `aria-labelledby` to match.
- Keep CTA controls as native links when they navigate. Their existing `.btn` classes provide the established appearance and keyboard behavior.
- Add `fetchpriority="high"` only when the hero image is the page's primary above-the-fold image.

This pattern is not connected to a page yet. Page migration should preserve each page's existing content, image, variant classes, and bilingual differences.
