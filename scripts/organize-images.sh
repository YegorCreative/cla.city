#!/bin/bash
# CLA City Image Organization Script
# Generated: 2025-07-01
#
# This script:
#   1. Creates the required semantic image copies that pages already reference
#   2. Organizes raw files into labeled subfolders
#   3. Creates WebP optimized versions of hero candidates
#
# NOTE: Original numbered files are NOT deleted — they are copied to new locations.
# Run from the project root: bash scripts/organize-images.sh
#
# Pages currently expect these paths (all currently missing):
#   hero/home.jpg, hero/about.jpg, hero/community.jpg
#   ministries/kids.jpg, ministries/youth.jpg, ministries/women.jpg
#   ministries/worship.jpg, ministries/groups.jpg, ministries/prayer.jpg
#   gallery/01.jpg through gallery/08.jpg

set -e

IMAGES="assets/images"
echo "==> CLA City Image Organization"
echo "    Working in: $(pwd)/$IMAGES"
echo ""

# ─── 1. Create folder structure ───────────────────────────────────────────────
echo "[1/4] Creating folder structure..."
mkdir -p "$IMAGES/hero"
mkdir -p "$IMAGES/pastors"
mkdir -p "$IMAGES/worship"
mkdir -p "$IMAGES/kids"
mkdir -p "$IMAGES/youth"
mkdir -p "$IMAGES/women"
mkdir -p "$IMAGES/exterior"
mkdir -p "$IMAGES/community"
mkdir -p "$IMAGES/resources"
mkdir -p "$IMAGES/events"
mkdir -p "$IMAGES/gallery"
mkdir -p "$IMAGES/logos"
mkdir -p "$IMAGES/webp"
mkdir -p "$IMAGES/placeholders"
echo "    Done."
echo ""

# ─── 2. Create the semantic image copies the pages already reference ──────────
echo "[2/4] Creating semantic page-ready image copies..."

# Hero images (pages reference hero/home.jpg, hero/about.jpg, hero/community.jpg)
# Note: these are large originals — the WebP step below creates optimized versions.
# For now we create full-res copies; swap for WebP once optimization completes.
cp "$IMAGES/ministries/ministries16.jpg"  "$IMAGES/hero/home.jpg"
cp "$IMAGES/ministries/ministries33.jpg"  "$IMAGES/hero/about.jpg"
cp "$IMAGES/ministries/ministries1.jpeg"  "$IMAGES/hero/community.jpg"

# Ministry card images (pages reference ministries/kids.jpg etc.)
cp "$IMAGES/events/events5.jpg"           "$IMAGES/ministries/kids.jpg"
cp "$IMAGES/ministries/ministries5.jpg"   "$IMAGES/ministries/youth.jpg"
cp "$IMAGES/events/events10.jpg"          "$IMAGES/ministries/women.jpg"
cp "$IMAGES/ministries/ministries20.png"  "$IMAGES/ministries/worship.png"   # PNG kept as PNG
cp "$IMAGES/ministries/ministries8.jpeg"  "$IMAGES/ministries/groups.jpg"
cp "$IMAGES/ministries/ministries42.jpeg" "$IMAGES/ministries/prayer.jpg"

# NOTE: Pages reference ministries/worship.jpg but source is a PNG.
# Two options: convert to jpg or update the page reference.
# Copying as worship.png for now — update <img src> in ministries pages to .png
echo "    WARNING: ministries/worship source is a PNG (ministries20.png)."
echo "    Either convert it or update the page reference from .jpg to .png."
echo ""

# Gallery images (pages reference gallery/01.jpg through gallery/08.jpg)
cp "$IMAGES/events/events9.jpg"           "$IMAGES/gallery/01.jpg"
cp "$IMAGES/ministries/ministries2.jpeg"  "$IMAGES/gallery/02.jpg"
cp "$IMAGES/events/events21.jpg"          "$IMAGES/gallery/03.jpg"
cp "$IMAGES/ministries/ministries18.jpg"  "$IMAGES/gallery/04.jpg"
cp "$IMAGES/events/events16.png"          "$IMAGES/gallery/05.png"  # PNG kept as PNG
cp "$IMAGES/ministries/ministries26.jpg"  "$IMAGES/gallery/06.jpg"
cp "$IMAGES/events/events20.JPG"          "$IMAGES/gallery/07.jpg"
cp "$IMAGES/ministries/ministries39.jpeg" "$IMAGES/gallery/08.jpg"

echo "    NOTE: gallery/05 source is a PNG → copied as gallery/05.png."
echo "          Update gallery page reference from .jpg to .png if needed."
echo ""
echo "    Done."
echo ""

# ─── 3. Organize raw files into semantic subfolders ───────────────────────────
echo "[3/4] Organizing raw source files into labeled subfolders..."

# WORSHIP
cp "$IMAGES/hero/hero1.jpg"                        "$IMAGES/worship/hero-worship-crowd-wide-01.jpg"
cp "$IMAGES/hero/hero2.jpeg"                       "$IMAGES/worship/hero-worship-crowd-wide-02.jpg"
cp "$IMAGES/hero/hero3.jpeg"                       "$IMAGES/worship/hero-worship-crowd-wide-03.jpg"
cp "$IMAGES/ministries/ministries1.jpeg"           "$IMAGES/worship/worship-congregation-raised-hands-01.jpg"
cp "$IMAGES/ministries/ministries16.jpg"           "$IMAGES/worship/hero-worship-raised-hands-best.jpg"
cp "$IMAGES/ministries/ministries17.jpg"           "$IMAGES/worship/hero-worship-congregation-from-behind-01.jpg"
cp "$IMAGES/ministries/ministries19.jpg"           "$IMAGES/worship/worship-congregation-02.jpg"
cp "$IMAGES/ministries/ministries20.png"           "$IMAGES/worship/worship-band-on-stage-01.png"
cp "$IMAGES/ministries/ministries21.png"           "$IMAGES/worship/worship-band-wide-stage-01.png"
cp "$IMAGES/ministries/ministries40.jpeg"          "$IMAGES/worship/worship-congregation-raised-hands-portrait-01.jpg"
cp "$IMAGES/ministries/ministries44.jpeg"          "$IMAGES/worship/worship-congregation-sanctuary-01.jpg"
cp "$IMAGES/ministries/ministries45.jpeg"          "$IMAGES/worship/worship-team-guitarist-blue-light-01.jpg"
cp "$IMAGES/ministries/ministries15.jpeg"          "$IMAGES/worship/worship-team-guitarist-01.jpg"
cp "$IMAGES/events/events9.jpg"                    "$IMAGES/worship/hero-worship-concert-crowd-01.jpg"
cp "$IMAGES/events/events21.jpg"                   "$IMAGES/worship/worship-band-on-stage-02.jpg"

# PRAYER
cp "$IMAGES/ministries/ministries42.jpeg"          "$IMAGES/worship/prayer-women-at-cross-01.jpg"

# PASTORS / LEADERSHIP
cp "$IMAGES/pastors/pastors1.jpg"                  "$IMAGES/pastors/pastor-portrait-01.jpg"
cp "$IMAGES/pastors/pastors2.jpg"                  "$IMAGES/pastors/pastor-portrait-02.jpg"
cp "$IMAGES/ministries/ministries33.jpg"           "$IMAGES/pastors/pastor-speaking-on-stage-01.jpg"
cp "$IMAGES/ministries/ministries39.jpeg"          "$IMAGES/pastors/senior-pastor-couple-formal-portrait-01.jpg"
cp "$IMAGES/ministries/ministries26.jpg"           "$IMAGES/pastors/leadership-team-restoration-group-01.jpg"
cp "$IMAGES/ministries/ministries27.jpg"           "$IMAGES/pastors/leadership-guest-speakers-restoration-01.jpg"
cp "$IMAGES/ministries/ministries28.jpg"           "$IMAGES/pastors/leadership-pastors-restoration-01.jpg"
cp "$IMAGES/ministries/ministries29.jpg"           "$IMAGES/pastors/leadership-pastor-portrait-restoration-01.jpg"

# KIDS MINISTRY
cp "$IMAGES/events/events5.jpg"                    "$IMAGES/kids/kids-classroom-activity-01.jpg"
cp "$IMAGES/events/events6.jpg"                    "$IMAGES/kids/kids-smiling-girls-01.jpg"
cp "$IMAGES/events/events13.jpg"                   "$IMAGES/kids/kids-child-microphone-01.jpg"
cp "$IMAGES/events/events14.jpg"                   "$IMAGES/kids/kids-child-microphone-02.jpg"
cp "$IMAGES/ministries/ministries9.JPG"            "$IMAGES/kids/kids-vbs-rocky-railway-volunteers-01.jpg"
cp "$IMAGES/ministries/ministries10.JPG"           "$IMAGES/kids/kids-vbs-group-exterior-01.jpg"
cp "$IMAGES/ministries/ministries11.png"           "$IMAGES/kids/kids-vbs-outdoor-games-01.png"
cp "$IMAGES/ministries/ministries12.JPG"           "$IMAGES/kids/kids-vbs-outdoor-activity-01.jpg"
cp "$IMAGES/ministries/ministries13.JPG"           "$IMAGES/kids/kids-vbs-outdoor-activity-02.jpg"
cp "$IMAGES/ministries/ministries14.JPG"           "$IMAGES/kids/kids-vbs-group-01.jpg"
cp "$IMAGES/ministries/ministries46.jpg"           "$IMAGES/kids/kids-girl-portrait-01.jpg"
cp "$IMAGES/ministries/ministries47.jpg"           "$IMAGES/kids/kids-boy-portrait-01.jpg"
cp "$IMAGES/ministries/ministries48.jpg"           "$IMAGES/kids/kids-child-portrait-03.jpg"

# YOUTH MINISTRY
cp "$IMAGES/ministries/ministries4.JPG"            "$IMAGES/youth/youth-celebration-balloons-01.jpg"
cp "$IMAGES/ministries/ministries5.jpg"            "$IMAGES/youth/youth-outdoor-games-01.jpg"
cp "$IMAGES/ministries/ministries6.jpg"            "$IMAGES/youth/youth-sports-outdoor-01.jpg"
cp "$IMAGES/events/events4.jpg"                    "$IMAGES/youth/youth-outdoor-event-01.jpg"
cp "$IMAGES/events/events20.JPG"                   "$IMAGES/youth/youth-jumprope-exterior-01.jpg"
cp "$IMAGES/ministries/ministries36.jpg"           "$IMAGES/youth/youth-restoration-conference-01.jpg"

# WOMEN'S MINISTRY
cp "$IMAGES/events/events7.jpg"                    "$IMAGES/women/women-painting-event-01.jpg"
cp "$IMAGES/events/events10.jpg"                   "$IMAGES/women/women-painting-event-02.jpg"
cp "$IMAGES/events/events17.jpg"                   "$IMAGES/women/women-painting-event-03.jpg"
cp "$IMAGES/events/events18.jpeg"                  "$IMAGES/women/women-art-event-01.jpg"
cp "$IMAGES/events/events19.jpg"                   "$IMAGES/women/women-painting-event-04.jpg"
cp "$IMAGES/ministries/ministries22.jpg"           "$IMAGES/women/women-restoration-conference-01.jpg"
cp "$IMAGES/ministries/ministries23.jpg"           "$IMAGES/women/women-restoration-conference-speaker-01.jpg"
cp "$IMAGES/ministries/ministries34.jpg"           "$IMAGES/women/women-restoration-group-01.jpg"

# COMMUNITY / RESTORATION CONFERENCE
cp "$IMAGES/ministries/ministries2.jpeg"           "$IMAGES/community/baptism-ceremony-01.jpg"
cp "$IMAGES/ministries/ministries18.jpg"           "$IMAGES/community/community-gathering-balloons-01.jpg"
cp "$IMAGES/events/events15.jpg"                   "$IMAGES/community/community-family-moment-01.jpg"
cp "$IMAGES/events/events16.png"                   "$IMAGES/community/community-large-group-cda-01.png"
cp "$IMAGES/ministries/ministries24.jpg"           "$IMAGES/community/community-restoration-mother-baby-01.jpg"
cp "$IMAGES/ministries/ministries25.jpg"           "$IMAGES/community/community-restoration-father-daughter-01.jpg"
cp "$IMAGES/ministries/ministries30.jpg"           "$IMAGES/community/community-restoration-group-01.jpg"
cp "$IMAGES/ministries/ministries31.jpg"           "$IMAGES/community/community-restoration-group-02.jpg"
cp "$IMAGES/ministries/ministries32.jpg"           "$IMAGES/community/community-restoration-group-03.jpg"
cp "$IMAGES/ministries/ministries35.jpg"           "$IMAGES/community/community-restoration-group-04.jpg"
cp "$IMAGES/ministries/ministries37.jpg"           "$IMAGES/community/community-restoration-group-05.jpg"
cp "$IMAGES/events/events8.jpg"                    "$IMAGES/community/community-portrait-01.jpg"
cp "$IMAGES/events/events11.jpg"                   "$IMAGES/community/community-portrait-02.jpg"
cp "$IMAGES/ministries/ministries38.jpg"           "$IMAGES/community/community-portrait-03.jpg"
cp "$IMAGES/ministries/ministries41.jpeg"          "$IMAGES/community/community-portrait-04.jpg"
cp "$IMAGES/ministries/ministries43.jpeg"          "$IMAGES/community/community-portrait-05.jpg"
cp "$IMAGES/ministries/ministries7.jpg"            "$IMAGES/community/community-professional-portrait-02.jpg"
cp "$IMAGES/events/events12.jpg"                   "$IMAGES/community/community-professional-portrait-01.jpg"

# CHURCH EXTERIOR
cp "$IMAGES/ministries/ministries3.jpeg"           "$IMAGES/exterior/church-exterior-youth-signs-01.jpg"
cp "$IMAGES/ministries/ministries10.JPG"           "$IMAGES/exterior/church-exterior-vbs-group-01.jpg"
cp "$IMAGES/events/events20.JPG"                   "$IMAGES/exterior/church-exterior-youth-activity-01.jpg"

# RESOURCES / JESUS SCHOOL
cp "$IMAGES/ministries/ministries8.jpeg"           "$IMAGES/resources/resources-jesus-school-mcpherson-parsonage-01.jpg"

# EVENT POSTERS
cp "$IMAGES/events/events1.PNG"                    "$IMAGES/events/poster-summer-camp-shagi-very-2026-01.png"
cp "$IMAGES/events/events2.PNG"                    "$IMAGES/events/poster-summer-camp-shagi-very-2026-02.png"
cp "$IMAGES/events/events3.PNG"                    "$IMAGES/events/poster-summer-camp-shagi-very-2026-03.png"

# AI PLACEHOLDERS (move out of root)
cp "$IMAGES/../hero.png"                           "$IMAGES/placeholders/hero-placeholder-ai.png"        2>/dev/null || true
cp "$IMAGES/../community.png"                      "$IMAGES/placeholders/community-placeholder-ai.png"   2>/dev/null || true
cp "$IMAGES/../worship.png"                        "$IMAGES/placeholders/worship-placeholder-ai.png"     2>/dev/null || true

echo "    Done."
echo ""

# ─── 4. WebP optimization for hero candidates ─────────────────────────────────
echo "[4/4] Creating WebP-optimized versions of hero candidates..."
echo "    Resizing to max 2400px wide using sips..."
echo ""

webp_convert() {
  local SRC="$1"
  local OUT="$2"
  local MAXW="${3:-2400}"

  if [ ! -f "$SRC" ]; then
    echo "    SKIP: $SRC not found"
    return
  fi

  WIDTH=$(sips -g pixelWidth "$SRC" 2>/dev/null | awk '/pixelWidth/{print $2}')

  if [ "$WIDTH" -gt "$MAXW" ]; then
    # Resize first, then convert
    TMPFILE="/tmp/cla_resize_$$.jpg"
    sips -Z "$MAXW" "$SRC" --out "$TMPFILE" > /dev/null 2>&1
    sips -s format webp "$TMPFILE" --out "$OUT" > /dev/null 2>&1
    rm -f "$TMPFILE"
    echo "    ✓ $SRC  →  $OUT  (resized to ${MAXW}px + WebP)"
  else
    sips -s format webp "$SRC" --out "$OUT" > /dev/null 2>&1
    echo "    ✓ $SRC  →  $OUT  (WebP, original size preserved)"
  fi
}

# Priority 1 — Hero banner candidates
webp_convert "$IMAGES/ministries/ministries16.jpg"  "$IMAGES/webp/hero-home-worship-raised-hands.webp"       2400
webp_convert "$IMAGES/ministries/ministries33.jpg"  "$IMAGES/webp/hero-about-pastor-speaking.webp"           1600
webp_convert "$IMAGES/ministries/ministries1.jpeg"  "$IMAGES/webp/hero-community-congregation.webp"          2400
webp_convert "$IMAGES/ministries/ministries17.jpg"  "$IMAGES/webp/hero-worship-congregation-from-behind.webp" 2400
webp_convert "$IMAGES/events/events9.jpg"           "$IMAGES/webp/hero-worship-concert-crowd.webp"           2400
webp_convert "$IMAGES/events/events21.jpg"          "$IMAGES/webp/worship-band-on-stage.webp"                2400
webp_convert "$IMAGES/ministries/ministries40.jpeg" "$IMAGES/webp/worship-raised-hands-portrait.webp"        853

# Priority 2 — Key ministry card images
webp_convert "$IMAGES/events/events5.jpg"           "$IMAGES/webp/kids-classroom-activity.webp"              1200
webp_convert "$IMAGES/ministries/ministries5.jpg"   "$IMAGES/webp/youth-outdoor-games.webp"                  1200
webp_convert "$IMAGES/events/events10.jpg"          "$IMAGES/webp/women-painting-event.webp"                 1200
webp_convert "$IMAGES/ministries/ministries20.png"  "$IMAGES/webp/worship-band-on-stage-1080p.webp"          1920
webp_convert "$IMAGES/ministries/ministries42.jpeg" "$IMAGES/webp/prayer-women-at-cross.webp"                853
webp_convert "$IMAGES/ministries/ministries8.jpeg"  "$IMAGES/webp/resources-jesus-school.webp"               1280

# Priority 3 — Leadership / pastors
webp_convert "$IMAGES/ministries/ministries39.jpeg" "$IMAGES/webp/senior-pastor-couple-portrait.webp"        833
webp_convert "$IMAGES/pastors/pastors1.jpg"         "$IMAGES/webp/pastor-portrait-01.webp"                   800
webp_convert "$IMAGES/pastors/pastors2.jpg"         "$IMAGES/webp/pastor-portrait-02.webp"                   800
webp_convert "$IMAGES/ministries/ministries26.jpg"  "$IMAGES/webp/leadership-team-group.webp"                1600

# Priority 4 — Gallery
webp_convert "$IMAGES/ministries/ministries2.jpeg"  "$IMAGES/webp/gallery-baptism.webp"                      1600
webp_convert "$IMAGES/ministries/ministries18.jpg"  "$IMAGES/webp/gallery-community-gathering.webp"          1200
webp_convert "$IMAGES/events/events20.JPG"          "$IMAGES/webp/gallery-church-exterior.webp"              1200

# Large PNGs that must be converted
webp_convert "$IMAGES/ministries/ministries21.png"  "$IMAGES/webp/worship-band-wide-stage.webp"              2400
webp_convert "$IMAGES/events/events16.png"          "$IMAGES/webp/community-large-group.webp"                1600

echo ""
echo "==> Done! WebP files saved to $IMAGES/webp/"
echo ""
echo "=== NEXT STEPS ==="
echo "1. Review the semantic copies in hero/, ministries/, gallery/"
echo "2. Swap page <img src> references to point to webp/ versions"
echo "   (use <picture> element with webp source + jpg fallback)"
echo "3. For ministries/worship — update page refs from .jpg to .png"
echo "   or run: sips -s format jpeg ministries/worship.png --out ministries/worship.jpg"
echo "4. Visually verify the 10 unverified images listed in image-map.json"
echo "5. Delete or archive the original numbered source files once done"
echo ""
