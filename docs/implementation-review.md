# CLA City implementation review

## Follow-up — November 5, 2026

After reviewing the supplied 15-page PDF, the owner requested implementation of the remaining items. This follow-up supersedes the earlier decisions below about keeping both belief presentations and retaining all homepage sections.

- Home now has seven sections in document order: welcome, church introduction, Sunday details, pastors, groups, Bible Schools, and contact. Removed the separate next-step invitation, large MTC promotion, photo grid, and final invitation. Media remains linked from the introduction, MTC has a short school preview, and the joint pastor introduction replaces the hidden duplicate individual cards. Full biographies and the gallery remain on their dedicated pages.
- About now uses one beliefs presentation. All eight numbered doctrinal statements are unchanged; practical application is reflected in the introduction.
- Prayer and Worship cards on Home and Ministries use specific email subjects and clear request/inquiry labels instead of leading back to another listing card.
- Bible Schools now previews the first existing lesson from each of the six course blocks. Native audio controls use `preload="none"`; every preview includes the original podcast-platform link and its course destination. Both language versions identify the recordings as Russian. Full school and course pages are unchanged.
- Added responsive preview columns, wrapping for long buttons, and scoped stylesheet version updates. Existing typography and photographs are retained. All copy and navigation changes are mirrored in English and Russian.
- Validation: targeted static checks passed for balanced HTML, unique IDs, section labels, 124 local references, removed-anchor references across public pages, unchanged Sunday/contact sections, unchanged beliefs, preview/course matching, and unchanged course pages. All six audio URLs returned HTTP 200 with audio content types. `git diff --check` passed. No browser automation was run during this follow-up, in accordance with the project instructions; mobile layout and actual playback remain for visual review.

The sections below record the earlier implementation pass.

Local changes for review. The owner approved the global visual proposal, removal of the repeated YouTube section, and both MTC descriptions during this chat. Nothing has been published or committed.

## Implemented

1. About: enlarged circular 200px portraits to rectangular 360 × 450px frames, generated optimized 720 × 1080px WebP assets, shortened biographies while retaining history, training, roles, and links. Increased section spacing. Centered text-only Story, Community, and Join sections in a single 48rem column instead of reserving an empty second column. Preserved all sections and doctrine.
2. Gallery: preserved all eight photographs, order, crops, labels, lazy loading, and lightbox interaction. Corrected EXIF orientation during encoding. Added responsive WebP sources with width descriptors and explicit dimensions. Lightbox requests a larger optimized version only when opened.
3. Home: applied the requested Russian welcome, Sunday logistics, next-step, and pastoral invitation copy with matching English drafts. Corrected three occurrences of Малко to Малько, including image alt text. Kept the established English spelling Malko. Removed repetitive sentences, retained the pastoral quote, enlarged the joint photograph, and added the existing official YouTube link directly to the introduction.
4. Group links: KidsZone, Youth, Women, and Life Groups now link directly to existing detail sections in both languages. No new detail pages were invented.
5. Visit: updated service invitation, What to Expect, Dress Code, and Giving copy; renamed only the referenced visitor card to Sunday Service; removed only the Arrival/Приход card advising arrival ten minutes early. Preserved address, parking, language, duration, FAQ, and other arrival guidance.
6. Schools: renamed the relevant desktop, mobile, and footer links and page heading to Библейские школы / Bible Schools. Preserved resources.html routes. Applied the requested school description and contact invitation. The existing destination already contains registration by email, tuition/payment information, NHFC diploma requirements, teachers, course links, and audio lessons.
7. Approved follow-up: applied white light surfaces, black content headings, restrained gray body text, and Roboto headings at weight 500. Preserved the Oswald wordmark typography and dark-surface contrast. Removed only the repeated homepage YouTube section and applied the approved MTC paragraph on Home and Bible Schools in both languages. Fixed long desktop navigation labels and stacked contact choices/service cards on narrow phones.
8. Media/About: applied the requested in-person and exploring-faith invitations with matching English drafts. Kept the Media page's separate Bible-message heading unchanged because the request names a visitor card only.

## Gallery measurements

Encoded file bytes, not a network timing benchmark. Browser-selected payload varies by viewport and device pixel ratio.

| Set of eight photographs | Before | After |
| --- | ---: | ---: |
| Original gallery image sources | 34,104,446 B | — |
| Smallest responsive sources | — | 214,530 B |
| Default image sources | — | 642,626 B |
| Largest lightbox sources | — | 1,358,672 B |

Default sources are 98.1% smaller than the previous originals. At the checked desktop viewport, the browser selected 960px sources for the two wide tiles and 480px sources for the other six photographs; all eight loaded successfully. New pastor portraits total 82,588 B, compared with 683,962 B for the two previous JPEGs. Existing original assets have not been deleted.

## Approval record and remaining content gaps

### Global visual system — approved and applied

Preview: [design-preview.html](design-preview.html).

- Light surface token `--color-ivory`: `#ffffff`, flowing through `--c-bg`, `--c-bg-alt`, `--c-bg-warm`, `--c-surface-2`, and `--bg-primary`.
- Introduce heading color `--c-heading: #000000` for light-surface headings.
- Body `--c-text` / `--text-primary`: `#374151`.
- Secondary `--c-text-2`, `--c-muted`, and `--text-secondary`: `#4b5563`.
- Light borders `--c-border` / `--border-soft`: `#e5e7eb`.
- Heading family: existing self-hosted Roboto at weight 500. This is a calm modern option with Cyrillic support and needs no new font asset. The PDF's Jost/Montserrat/Manrope/Raleway names are candidates; none is currently bundled. A new font can be selected instead if preferred.
- Keep existing dark surfaces, image overlays, logos, button behavior, and appropriate white text on dark sections.
- Implementation: shared `assets/css/styles.css` and the mobile Home heading override. All 32 public pages use the updated stylesheet version. Logo typography remains Oswald.
- Validation covered all 32 public pages at 1440px, 390px, and 320px; focused header rechecks also covered 992px, 1024px, 1200px, and 1280px.

### Homepage shortening — approved and applied

Removed only the standalone YouTube promotional section (`youtube-heading`), since the official channel is now linked immediately from the introduction and remains in the footer and Media page. This removes a repeated promotion without removing any video or media access. All other homepage sections remain intact, as approved by the owner.

### Beliefs — preserved as approved

The current About page has four short Foundation cards and a separate numbered list of eight beliefs. They overlap in topics but are not identical. The owner approved retaining the full beliefs text and all other sections. The numbered list of eight and Foundation section are intact; no doctrinal sentence has been removed. The original screenshots would still be needed to identify any different duplicate intended by the brief.

### MTC — both languages approved and applied

The following approved paragraph is now used on both the homepage and Bible Schools page:

**RU:** «Missionary Training Center (MTC) — программа для тех, кто хочет глубже изучать Библию и применять полученные знания в повседневной жизни. Она также помогает будущим служителям готовиться делиться Евангелием».

**EN:** “Missionary Training Center (MTC) is a program for people who want to study the Bible more deeply and apply what they learn in everyday life. It also helps future ministers prepare to share the Gospel.”

This paragraph follows the supplied brief and was approved explicitly in both languages during this chat.

### Information to confirm before publishing

- The existing site already states Sunday 14:30 / 2:30 PM, Russian only, about 90 minutes, free parking, and children welcome. These were preserved, not independently confirmed with the church owner.
- English spelling Malko matches the current site, teacher names, and established account names. Confirm with the owner before changing that transliteration.
- MTC wording was explicitly approved in both languages. Other English changes are matching local drafts, included below for review before any future publication.
- No original 15-page screenshot document was supplied, so location-sensitive changes were limited to clear matches in the current site.
- Prayer and Worship have listing cards but no dedicated detail sections. Their existing homepage anchors remain; owner input is needed for additional detail content. No pages or descriptions have been invented.
- There are no blocks previewing multiple free audio lessons outside the school in the current homepage/resources pages. All school/course pages and audio links remain unchanged.

## English copy for approval

These are the corresponding local English drafts for the specifically requested Russian text:

| Location | English draft |
| --- | --- |
| Home welcome | A Russian-speaking church in North Hollywood where a warm welcome awaits you. Meet people, make friends, and ask the questions that matter to you. |
| Pastoral invitation | We'd love to meet you, answer your questions, and help you settle into our church. |
| Home Sunday service | Join us Sunday at 2:30 PM. The service is in Russian and lasts about 90 minutes. Free parking is available. Bring your children and wear whatever feels comfortable. |
| Next steps | Start getting to know our church at a Sunday service. We'll welcome you, help you find your way, and answer your questions. |
| Service invitation | Join us every Sunday to gather, pray, worship, and spend time together. |
| What to Expect | We want you to feel comfortable from the moment you arrive. There is no pressure or obligation — just come, meet people, and be yourself. |
| Dress Code | We have no strict dress code. Wear whatever feels comfortable. We care about you, not what you wear. |
| Giving | Giving helps support the life of the church and its ministries. It is entirely voluntary and remains your personal decision. We are glad to see you whether or not you choose to give. |
| Jesus School | Find information about available courses, teachers, and audio lessons, as well as registration, payment, and earning an NHFC diploma. |
| School contact | Send us a message, and we'll tell you more about our study programs. |
| In person | Come meet us in person! Experience our church, share the joy of spending time together, and become part of a welcoming community. We'd be delighted to see you! |
| Exploring faith | If you are just beginning to explore Christianity or looking for a church, we'd love to see you! Come meet people, spend time together, ask questions, and learn more about faith. |

## Changed files

- `en/{index,about,visit,resources,media}.html` and matching `ru/` pages.
- `partials/{en,ru}/{header,footer}.html`.
- `assets/css/styles.css`, `assets/css/about-hero.css`, `assets/css/home-hero-layout.css`.
- Stylesheet cache-version references only on the remaining 22 public HTML pages, including Give, Groups, School, course, and blog pages. School/course content and audio URLs are unchanged.
- `assets/images/gallery/{01..08}-{width}.webp` (23 responsive exports, all referenced).
- `assets/images/pastors/pastor-portrait-{01,02}.webp`.
- `docs/design-preview.html`, `docs/implementation-review.md`.

## Validation

- Passed targeted static integrity checks for 194 local asset/link references, responsive image dimensions/srcsets, exact bilingual school labels, four group detail destinations per language, and removal of only the specified Arrival card.
- Compared all eight belief entries against the original Git revision: unchanged in both languages.
- Compared the school landing pages and all twelve course pages against the original Git revision, ignoring only stylesheet version numbers: content and audio URLs unchanged.
- Browser checked all 32 public pages at 1440px, 390px, and 320px (96 page/viewport combinations). The initial global-font pass found one narrow Russian service-card heading overflow. Fixed it and passed 14 focused RU/EN homepage rechecks at 320, 390, 992, 1024, 1200, 1280, and 1440px, including header width and heading clipping.
- Verified the Russian mobile menu opens Bible Schools and the language switch opens the matching English page.
- Verified gallery opening and Escape dismissal in RU/EN; the lightbox uses the larger optimized WebP while preserving image descriptions.
- Clicked the KidsZone homepage detail link in both languages and verified the existing detail destination. Static checks verify all four detail links in both languages.
- Existing gallery overlay contains an initially empty image element; it was excluded from broken-image checks. Actual image sources have no observed load errors.
- `git diff --check` passed.
- No project build, full test suite, deployment, external form submission, or changes to backend behavior.

## Screenshots and browser evidence

Captured before editing and after local changes. These files are outside the deployable repository.


- [About before](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/about-before.jpg)
- [About after](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/about-after.jpg)
- [Home before](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/home-before.jpg)
- [Home after (desktop)](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/index-1440-after.jpg)
- [Home after (390px)](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/index-390-after.jpg)
- [Visit before](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/visit-before.jpg)
- [Visit after](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/visit-1440-after.jpg)
- [Schools before](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/schools-before.jpg)
- [Schools after](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/resources-1440-after.jpg)
- [Media before](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/media-before.jpg)
- [Media after (page)](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/media-1440-after.jpg)
- [Original visual proposal](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/design-proposal.jpg)
- [Browser checks](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/browser-checks.json)
- [Responsive rechecks](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/responsive-rechecks.json)
- [Interaction checks](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/interaction-checks.json)

- [Gallery after](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/media-after.jpg)
- [Pastors after (390px)](/Users/grigornurijanyan/.codex/visualizations/2026/11/05/01a1ad36-688b-7750-8dd6-a0b02ab06197/about-390-after.jpg)

## Git state

Base commit: `c30499f4a4fa3b0414bfb61591e9321d6cf8845e`. Changes are intentionally uncommitted for review; there is no new implementation commit hash.
