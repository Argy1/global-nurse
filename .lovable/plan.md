
# Home Page Rebuild — Trust + Conversion Focused

## Overview
Completely rewrite `src/pages/Index.tsx` to follow the exact 9-section layout, plus add a new `TutorialModal` component for the first-time-visit welcome video.

## Sections (in order)

### 1. Hero Section with AI Intro Video
- New title: "The Journey to Becoming a Global Nurse"
- Subtitle covering: global demand, aging populations, readiness gaps (CGFNS/TrueMerit, IELTS 6.5+7 speaking, NCLEX), structured preparation
- Visual pathway pills: "Nurse ID -> Singapore", "Nurse ID -> Canada", "Nurse ID -> USA"
- Video embed: reads `ai_intro_video_url` from site_settings; if UPDATE_ME, show a placeholder card with play icon
- 3 CTAs: Register (primary), WhatsApp Support (secondary), Quickstart Guide (tertiary)

### 2. Tutorial Video Block
- Card with "How to Use This Website in 60 Seconds"
- Reads `site_tutorial_video_url`; if UPDATE_ME, show placeholder with "Video coming soon"
- "Watch Tutorial" button opens video or placeholder
- New component: `src/components/home/TutorialModal.tsx`
  - Triggered on first visit when `enable_tutorial_modal === "true"`
  - Stores `gp_tutorial_seen` in localStorage
  - Modal with embedded video (autoplay muted if available), "Watch Now", "Skip", and "Don't show again" checkbox
  - Dismissing sets localStorage flag

### 3. Trust Badges Row
- Reuse existing `TrustBadgesStrip` component (default variant) with 4 badges:
  - Ethical pathway, Transparent steps, Community support, Nurse-focused education

### 4. Quickstart Guide Teaser
- Horizontal scrollable row of 10 journey topic cards
- Hardcoded topic titles (since DB is empty) as clickable links to `/quickstart`
- Topics like: "Is Working Abroad Right for You?", "Understanding Licensing", "English Proficiency", "NCLEX Preparation", etc.

### 5. Register CTA Section
- Reassuring privacy text with lock icon
- Big Register button (primary CTA)
- WhatsApp button (secondary)
- Disclaimer: consent-based, no fees

### 6. News & Insights Highlights
- Fetch latest 4 published News from `content_items` using `useContent("News")`
- Grid of article cards linking to `/news/[slug]`
- Empty state: "Articles coming soon"
- "View All News" link

### 7. Success Stories Highlights
- Fetch latest 3 published stories from `success_stories` using `useSuccessStories()`
- Card grid with nurse name, route, excerpt
- Empty state: "Stories coming soon — yours could be next"
- "View All Stories" link

### 8. Social + Contact Strip
- Read `instagram_url`, `linkedin_url`, `facebook_url` from settings
- Show cards for each platform; if UPDATE_ME show "Coming soon" label
- Contact email from `support_email`

### 9. Footer
- Already handled by Layout component — no changes needed

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Full rewrite with all 9 sections |
| `src/components/home/TutorialModal.tsx` | New — welcome modal with video + localStorage |

## Technical Details

- **Settings access**: Use `useSiteSettings()` hook to read all keys (`ai_intro_video_url`, `site_tutorial_video_url`, `enable_tutorial_modal`, `support_email`, `whatsapp_direct_chat_link`, `instagram_url`, `linkedin_url`, `facebook_url`, `help_mobile`)
- **Content hooks**: `useContent("News")` for news, `useSuccessStories()` for stories
- **Video handling**: Render an `<iframe>` for YouTube/Vimeo URLs, or `<video>` for direct URLs; if UPDATE_ME, render a styled placeholder with play icon
- **Tutorial modal**: Uses Radix Dialog via `@/components/ui/dialog`; checks `localStorage.getItem("gp_tutorial_seen")` on mount; autoplay muted via iframe params or video element attributes
- **Quickstart topics**: Hardcoded array of 10 topic objects (title + slug), rendered as a horizontally scrollable row using `overflow-x-auto`
- **Social strip**: Read from site_settings directly (not from the old `social_links` table), include Facebook alongside Instagram and LinkedIn
- **Global layout**: FloatingWhatsApp and StickyBottomCTA already exist in Layout and are unchanged
- **No database changes needed** — all data sources already exist
