# CLA City — Content Gap Report
> Audit date: 2026-06-10
> Compared against: CONTENT_SOURCE_OF_TRUTH.md
> Scope: All 14 HTML pages (en/ + ru/)
> Action: Audit only — no files modified.

---

## Home
**Files:** `en/index.html` / `ru/index.html`

### VERIFIED
- Church name, tagline, and identity copy
- Service time: Sunday 2:30 PM / ~90 minutes
- Address displayed correctly in service card
- Map embed (no API key, correct address)
- YouTube link correct
- Facebook link correct
- Donation link `cla.city/pozhertvovat` present on Give page (linked from CTA)
- Hero image updated to real worship congregation photo
- Ministry preview cards: KidsZone, Youth, Women, Life Groups
- Email in footer: `russianspeakingchurch@gmail.com`

### NEEDS OWNER INPUT
- **Testimonials section:** Three testimonials ("Marina K., arrived from Ukraine", "James T., Los Angeles", "Семья Соколовых") — these read as placeholder/illustrative quotes. Are these real people who consented to being named on the website?
- **Community section image** (`webp/hero-community-congregation.webp`) — the entire webp folder has mislabeled filenames. This image has not been visually verified to show a congregation. Owner should confirm what image actually appears.

### PLACEHOLDER CONTENT
- Testimonials names and quotes — likely illustrative, not verified real people

### MISSING CONTENT
- Phone number not displayed anywhere on homepage (only in visit.html footer)

### DESIGN DEBT
- None on this page

---

## About
**Files:** `en/about.html` / `ru/about.html`

### VERIFIED
- Pastor names and roles: Leonid Malko (Lead Pastor), Marina Malko (Co-Pastor · Women's Ministry)
- Pastor portrait images using correct paths (`pastor-portrait-01.jpg`, `pastor-portrait-02.jpg`)
- Leonid bio references MTC — acceptable as a passing reference per SOT
- 8 beliefs listed — factual theological content, no contradictions
- "Founded in Los Angeles — 2021" stat — verified
- "6 Active Ministries" stat — verified
- Mission copy is accurate and makes no false claims

### NEEDS OWNER INPUT
- **About hero image** (`webp/hero-about-pastor-speaking.webp` as `<source>`, `hero/about.jpg` as fallback): The webp is from the mislabeled folder and has not been visually verified. Fallback JPG `hero/about.jpg` is used if webp fails — needs visual check.
- **"2 Languages" stat** — the website is in 2 languages; the service is in 1 (Russian only). The stat could mislead visitors into thinking services are bilingual. Owner should confirm the framing is intentional.

### PLACEHOLDER CONTENT
- None

### MISSING CONTENT
- None

### DESIGN DEBT
- None

---

## Visit
**Files:** `en/visit.html` / `ru/visit.html`

### VERIFIED
- Service time: Sunday 2:30 PM, Main Sanctuary, ~90 minutes
- Address: 5853 Laurel Canyon Boulevard, North Hollywood, CA 91607
- Map embed correct
- Phone: +1 (747) 279-9715 in FAQ and footer (visit.html only)
- Email: `russianspeakingchurch@gmail.com`
- KidsZone ages 0–12 mentioned correctly
- No false payment/service claims

### NEEDS OWNER INPUT
- **"Russian translation is available throughout"** (FAQ, EN only, line 218): The service IS in Russian — this phrasing implies Russian is a translation of something else (i.e. implies English is the primary language). Should read something like "The service is conducted in Russian" instead.
- **"English-speaking guests are welcome — ask at the welcome desk for assistance"** (Practical Info card): Implies some English accommodation exists at a welcome desk. Is this accurate? Needs owner confirmation.
- **"Free Parking is available on-site"**: Unverified. Needs owner confirmation.
- **"Coffee & Connection — After the service, stay for coffee"**: Unverified. Needs owner confirmation.
- **"KidsZone desk near the entrance"** and check-in process described: Unverified operational detail. Needs owner confirmation.

### PLACEHOLDER CONTENT
- None

### MISSING CONTENT
- None

### DESIGN DEBT
- **Broken "Get Directions" link in footer** (`en/visit.html` line 295, `ru/visit.html` line 281): Links to bare `https://maps.google.com/` with no address. All other pages use the full address URL. This is a bug.

---

## Ministries
**Files:** `en/ministries.html` / `ru/ministries.html`

### VERIFIED
- All 6 ministry names and age ranges correct
- Ministry contact links all use verified email `russianspeakingchurch@gmail.com`
- Life Groups detail section: "Groups run primarily in Russian" — accurate
- KidsZone detail references Sunday service time (2:30 PM) — consistent with SOT

### NEEDS OWNER INPUT
- **"Corporate prayer nights every Wednesday"**: Specific day and frequency not verified in SOT. SOT explicitly states: "Do not list meeting times for individual ministries unless verified."
- **"8–15 people"** (Life Groups): Specific group size claim — unverified.
- **"In homes and coffee shops across greater LA"**: Specific location type claim — unverified.
- **KidsZone schedule: "Sundays 2:30 PM – 4:00 PM"**: The end time (4:00 PM) is inferred, not explicitly verified.
- **Worship Team: "We're looking for passionate musicians, singers, and sound techs"**: Implies active open recruitment. Needs owner confirmation that recruitment is currently open.

### PLACEHOLDER CONTENT
- None

### MISSING CONTENT
- None

### DESIGN DEBT
- None

---

## Media
**Files:** `en/media.html` / `ru/media.html`

### VERIFIED
- YouTube channel URL is correct
- No fake sermon cards or titles
- Live stream section references correct time (2:30 PM PT)

### NEEDS OWNER INPUT
- **"Sunday service is streamed live on YouTube"**: Is the service actually live-streamed? This is a direct factual claim. Needs owner confirmation.
- **Gallery section — all 8 items are CSS gradient placeholders**: No real photos are displayed. The gallery section appears as colored gradient blocks to all visitors. The `data-src` attributes reference `assets/images/gallery/01.jpg` through `08.jpg` but no actual images load because the HTML uses `<div class="gallery-placeholder">` instead of `<img>`. Owner must decide: show real photos or remove the gallery section entirely.

### PLACEHOLDER CONTENT
- **Gallery: 8 of 8 items are CSS gradient placeholder divs** — no real images are displayed. This is the most visible placeholder issue on the site. Visitors see colored blocks where photos should be.

### MISSING CONTENT
- No actual sermon content — acceptable per SOT (YouTube link only is correct approach)

### DESIGN DEBT
- Gallery section must either be populated with real images or removed

---

## Resources
**Files:** `en/resources.html` / `ru/resources.html`

### VERIFIED
- Jesus School name and concept match SOT (MTC-adjacent content, acceptable as reference)
- Email `russianspeakingchurch@gmail.com` used for Bible plan and some downloads

### NEEDS OWNER INPUT
- **Jesus School courses** (6 courses with specific names, durations, and levels): Are these real courses currently offered? Are the names, durations, and levels accurate? These are highly specific claims.
- **"Reflections written by Pastor Leonid Malko and the Church LA team"** (Bible in One Year): Claims specific authorship of unpublished content. Needs owner confirmation.
- **"Bible in One Year — Available on our website in Russian and English"**: No such feature exists on the website. This is a false claim.
- **Prayer Guide and Family Devotions downloads**: Described as real downloadable materials. Do they exist? Links route to email, which is honest, but the card copy implies ready-to-download materials.
- **"Attending a Wednesday study"** (CTA section): Implies Wednesday study sessions exist. Unverified per SOT.

### PLACEHOLDER CONTENT
- **Bible in One Year image**: Uses `<div class="img-grad img-grad--warm">` CSS gradient — no real image. (Both EN and RU.)

### MISSING CONTENT
- None beyond what SOT permits

### DESIGN DEBT
- Bible in One Year section image placeholder needs a real image or removal

### ERRORS
- **`school@cla.city` email** (Enroll buttons, lines 122 and 187 in both EN and RU): This email address is NOT verified in SOT. Only `russianspeakingchurch@gmail.com` is verified. All enrollment links should use the verified email. Present in 4 locations total.

---

## Give
**Files:** `en/give.html` / `ru/give.html`

### VERIFIED
- Donation link: `https://www.cla.city/pozhertvovat` — correct
- Mailing address: 5853 Laurel Canyon Blvd, North Hollywood, CA 91607 — correct
- No Venmo, Zelle, PayPal, or cash instructions
- Email: `russianspeakingchurch@gmail.com` — correct
- Scripture quote (2 Cor 9:7) — accurate

### NEEDS OWNER INPUT
- **"Church LA is a registered 501(c)(3) nonprofit organization"**: UNVERIFIED. This is a legal claim. If untrue or unconfirmed, it is a serious credibility and legal risk.
- **"You will receive an annual tax receipt by email"**: UNVERIFIED operational claim.
- **"All gifts are tax-deductible to the full extent permitted by law"**: Dependent on 501(c)(3) status being confirmed.
- **Fund designations (Building Fund, Global Missions, KidsZone)**: The designation dropdown and fund descriptions imply these are active, tracked separate funds. Do separate fund accounts exist? Needs owner confirmation.
- **"Long-term goal of owning our own space"** (Building Fund): Is this an official stated goal of the church? Needs owner confirmation.
- **"We partner with missionaries and church-planting networks in Eastern Europe, Central Asia, and beyond"** (Global Missions): Specific geographic claims about mission partnerships. Unverified.
- **Give widget amount buttons ($25–$500) and fund dropdown**: These are cosmetic UI elements only — they do not actually pre-populate the external donation page. Visitors may expect them to affect their gift. This is potentially misleading UX.

### PLACEHOLDER CONTENT
- None

### MISSING CONTENT
- None

### DESIGN DEBT
- The give amount/designation widget is cosmetic-only and does not connect to the donation page — misleading UX

---

## Footer
**Appears on:** All 14 pages

### VERIFIED
- YouTube link correct on all pages
- Facebook link correct on all pages
- Email link correct on all pages
- Address and service time in footer correct

### ERRORS — HIGH PRIORITY
- **Instagram link `https://www.instagram.com/cla.city/` is present on ALL 14 pages** (twice per page — once in footer-brand social row, once in footer-bottom social row = 28 total occurrences). Instagram is explicitly listed as **NOT verified** in CONTENT_SOURCE_OF_TRUTH.md Section 8. This is the single most widespread content violation on the site.

### NEEDS OWNER INPUT
- Is `https://www.instagram.com/cla.city/` an active, managed account? If yes, add to SOT and keep. If no, remove from all pages.

---

## Navigation
**Appears on:** All 14 pages (desktop + mobile)

### VERIFIED
- All 7 nav links are correct (Home, About, Visit, Ministries, Resources, Media, Give)
- Language switch links are correct on all pages
- Mobile nav matches desktop nav

### NEEDS OWNER INPUT
- None

### MISSING CONTENT
- No phone number in navigation — acceptable (not standard)

---

## Global Issues

| # | Issue | Severity | Pages Affected |
|---|-------|----------|----------------|
| 1 | **Instagram link unverified** — present 28× across all 14 pages | 🔴 HIGH | All 14 |
| 2 | **`school@cla.city` unverified email** — used in Resources enrollment buttons | 🔴 HIGH | en/resources.html, ru/resources.html |
| 3 | **501(c)(3) claim unverified** — legal/credibility risk | 🔴 HIGH | en/give.html, ru/give.html |
| 4 | **Media gallery is 100% placeholder** — 8 colored blocks, no real photos | 🟠 MEDIUM | en/media.html, ru/media.html |
| 5 | **Broken Get Directions link in Visit footer** — links to `maps.google.com` with no address | 🟠 MEDIUM | en/visit.html, ru/visit.html |
| 6 | **"Russian translation available throughout"** — backwards phrasing implies English is primary | 🟠 MEDIUM | en/visit.html |
| 7 | **"Wednesday prayer nights"** unverified schedule | 🟡 LOW | en/ministries.html, ru/ministries.html |
| 8 | **Bible in One Year** — claims to exist on website when it doesn't | 🟡 LOW | en/resources.html, ru/resources.html |
| 9 | **Bible in One Year image** is CSS gradient placeholder | 🟡 LOW | en/resources.html, ru/resources.html |
| 10 | **Give widget** (amounts + fund selector) is cosmetic-only, misleading UX | 🟡 LOW | en/give.html, ru/give.html |
| 11 | **Testimonial names** unverified (possibly placeholder people) | 🟡 LOW | en/index.html, ru/index.html |
| 12 | **webp image folder** — all filenames mislabeled vs actual content | 🟡 LOW | Multiple pages |
| 13 | **"Free Parking"** claim unverified | 🟡 LOW | en/visit.html, ru/visit.html |
| 14 | **"Live-streamed on YouTube"** claim unverified | 🟡 LOW | en/media.html, ru/media.html |

---

## Priority Order for Fixes

1. Remove Instagram links from all 14 pages (or confirm account and add to SOT) — 28 occurrences
2. Replace `school@cla.city` with `russianspeakingchurch@gmail.com` in Resources — 4 occurrences
3. Remove or verify 501(c)(3) claim in Give FAQ — 2 occurrences
4. Fix broken Get Directions link in Visit footer — 2 occurrences
5. Fix "Russian translation available throughout" phrasing — 1 occurrence
6. Resolve Media gallery (add real images or remove section) — owner decision required first
7. Remove "Bible in One Year available on our website" line — factually false
8. Owner input on: free parking, coffee hour, Wednesday prayer, live streaming, testimonial names, 501(c)(3), give widget, Jesus School course details
