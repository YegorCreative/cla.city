# Feature Section component

`feature-section.html` is the build-free reference pattern for a CLA image-and-content section. It uses the existing section, container, intro-block, typography, image, and button rules in `assets/css/styles.css`; no component-specific CSS or JavaScript is required.

## Content contract

- Replace the eyebrow, heading, body, CTA, image, and alt text with the page's existing language-specific content.
- The eyebrow, CTA, and media block are optional and may be removed when unused.
- Keep `aria-labelledby` matched to the heading ID, and keep that ID unique on the page.
- Use an empty `alt` value for a decorative image. Use concise descriptive alt text when the image adds meaning.
- Keep links as native anchors for established keyboard behavior.

## Layout options

- Use `.intro-img--landscape` or `.intro-img--portrait` for the established image proportions.
- Keep the content block before the media block for the default layout. Reverse those two sibling blocks when an existing page requires the opposite visual order.
- Preserve existing section variants such as `.intro-block--who` when migrating established content.
