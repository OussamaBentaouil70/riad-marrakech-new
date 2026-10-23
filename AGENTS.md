# AGENTS.md — Project Guide for AI Agents

> Read this file first. It describes what this project is, how it is built, where everything lives, what is finished, what is intentionally temporary, and the rules to follow when making changes.

---

## 1. What this project is

**Riad Marrakech** — a single-page marketing / lead-generation website for a **curated collection of boutique riads in Marrakech, Morocco**, focused on **private riad buyouts, events & celebrations, and bespoke experiences**.

It is **not** a single-hotel site (it was originally built as one fictional riad called "Riad Azahar", then repositioned to "Nelia Marrakech", then renamed again). The brand is now **"Riad Marrakech"** — the collection itself — and the four riads are *venue options*, not owned properties. All copy is written to reflect that: availability, event permissions, capacity, and rates are "confirmed individually". The brand mark is an **arch-shaped terracotta badge with `DoorIcon`** (a Moroccan horseshoe-arch door) — do not reintroduce the old star-in-circle logo.

The site's job is to convert visitors into **event inquiries** via:
1. An inquiry form (rendered twice — hero + final section — sharing one state),
2. WhatsApp deep links (navbar, sticky floating button, riad gallery modal),
3. Anchor navigation to the contact section.

**There is no backend.** Form submission is client-side only: it validates, generates a reference code (`RM-XXXXXX`), and shows an animated confirmation summary. Nothing is emailed or persisted. This is a known, intentional limitation (see §9 TODOs).

### The four riads (order matters — user specified it)
| # | Name | Category | Location | Cover image |
|---|------|----------|----------|-------------|
| 1 | Almaha Marrakech | Luxury Boutique Riad | Kasbah District | `images/Almaha Marrakech.jpg` |
| 2 | Riad Noa Marrakech | Private Luxury Riad | Marrakech Medina | `images/Riad Noa Marrakech.jpg` |
| 3 | Maison Ziri | Boutique Heritage Riad | Marrakech Medina | `images/Maison Ziri.jpg` |
| 4 | Riad Marrakech | Moroccan Riad Collection | Marrakech Medina | `images/Nelia Marrakech.jpg` (file name kept — matches the original property) |

All section photography now comes from the owner's **`images/` folder** (root), wired through `src/data/images.ts` → `collection.ts`. Filenames map 1:1 to their section entries — match by title when swapping. **Do not rename/move files without updating `images.ts`.** Each riad additionally has 4 gallery photos in **`images/RIADS/<riad>/`** (webp/avif + a duplicate of the cover jpg — do not import the duplicate, it would double the bundle). Only the Buyouts arched courtyard figure is still a remote Pexels image.

---

## 2. Tech stack & tooling

- **React 19** + **TypeScript** (strict) + **Vite 7**
- **Tailwind CSS v4** via `@tailwindcss/vite` — *no `tailwind.config.js`*. The design system lives in `src/index.css` using `@theme` tokens and `@utility` rules.
- **framer-motion** (`^14.x`) for all animation: scroll reveals, parallax, modals (`AnimatePresence`), carousel/marquee.
- **lucide-react** for icons. ⚠️ This version has **no brand icons** (`Instagram`, `Facebook` were removed) — inline SVG components are used instead. **All WhatsApp CTAs use `WhatsAppIcon`** from `src/components/icons.tsx` (official WhatsApp glyph, `fill="currentColor"`), never a lucide chat bubble.
- **clsx + tailwind-merge** via `cn()` helper at `src/utils/cn.ts`.
- **vite-plugin-singlefile** — the production build inlines ALL JS/CSS into one `dist/index.html`. Do not assume separate asset chunks exist. Imported images are base64-inlined too, so `dist/index.html` is currently **~9 MB** (31 photos). If that matters, move the folder to `public/` instead of importing (produces separate files).
- Path alias `@` → `src` (configured in `vite.config.ts`), though most imports use relative paths.

### Commands
```bash
npm run dev       # dev server
npm run build     # production build → dist/index.html (single file)
npx tsc --noEmit  # type check (ALWAYS run after edits, alongside build)
```

### Hard rules from the environment
- **Never edit `package.json` or `vite.config.ts` directly.** Install packages with `npm install <pkg>`.
- Entry point is the default-exported `App` component in `src/App.tsx` (`src/main.tsx` mounts it in `StrictMode`).
- Always finish by running `npm run build` successfully; prefer also `npx tsc --noEmit`.

---

## 3. File map (current, authoritative)

```
images/                        # Owner's photography (31 files, named after their section/title)
  RIADS/<riad>/                # Per-riad gallery photos (almaha, riad noa, maison ziri, nelia)
index.html                     # Title "Riad Marrakech · Private Riads, Events & Experiences",
                               # meta description, Google Fonts (Fraunces, Manrope, Amiri),
                               # terracotta star SVG favicon
src/
  main.tsx                     # StrictMode + createRoot mount
  vite-env.d.ts                # Ambient `*.jpg` / `*.png` / ... module declarations (for image imports)
  App.tsx                      # Owns ALL shared inquiry state; composes page; sticky WhatsApp + back-to-top
  index.css                    # Tailwind v4 theme tokens, patterns, textures, .field form styles
  utils/cn.ts                  # cn() = twMerge(clsx(...))
  data/images.ts               # Imports every file from /images (+ /images/RIADS/*) and exports them
                               # grouped by section (heroImage, contactImage, riadImages,
                               # riadGalleryImages, buyoutImages, eventImages, experienceImages).
                               # ALL image wiring happens here.
  data/collection.ts           # SINGLE SOURCE OF TRUTH: riads, galleries, events, experiences,
                               # buyout benefits, planning steps, FAQs, EventInquiry type,
                               # whatsappBusinessNumber (EMPTY), whatsappLink(), navLinks
  components/
    Navbar.tsx                 # Fixed header, 3-zone flex layout, scrollspy, full-screen mobile menu
    Hero.tsx                   # Split hero: story left, InquiryForm right, full-bleed `Hero image.jpg` bg
    Marquee.tsx                # Sage-green scrolling strip of brand phrases
    Buyouts.tsx                # §01 Exclusive buyouts: copy left + ARCHED image right + 4 benefits row (each with photo)
    RiadCollection.tsx         # §02 Four riad cards (square images) + per-riad gallery MODAL (portal),
                               # 5-photo galleries, thumbnails in a grid-cols-5 strip
    EventOccasions.tsx         # §03 12 celebration types, 2-col grid, square clickable images
    UniqueExperiences.tsx      # §04 9 experiences, indigo background, 2-col grid, square clickable images
    Planning.tsx               # §05 4-step planning process
    Faq.tsx                    # §06 Accordion (7 questions), sticky intro column
    Contact.tsx                # §07 Final conversion section + second InquiryForm instance,
                               # photo background (`Your Marrakech Experience Starts Here.jpg`) under
                               # moss scrim (background only — no photo column beside the form)
    Footer.tsx                 # Dark footer, brand, nav columns, riad list
    InquiryForm.tsx            # Shared form ("hero" | "contact" variants) + success state
    PhotoLightbox.tsx          # ZoomableImage + PhotoLightbox (portal) for events/experiences
    Reveal.tsx                 # Reveal / RevealGroup — framer-motion whileInView wrappers
    Ornament.tsx               # Star8, Star8Outline, Eyebrow, ArchDivider (Moroccan khatam motifs)
    icons.tsx                  # WhatsAppIcon (real WhatsApp glyph) + DoorIcon (Moroccan door = brand mark)
```

**Deleted legacy files** (do NOT resurrect): `About.tsx`, `Suites.tsx`, `Services.tsx`, `Gallery.tsx`, `Testimonials.tsx`, `ReservationPanel.tsx`, `src/data/content.ts`. All references to "Riad Azahar", nightly suite pricing, check-in/check-out booking, and the host "Yasmina" were removed from the codebase.

---

## 4. Design system (keep this look — user approved it)

### Palette — Tailwind tokens defined in `src/index.css` `@theme`
| Token | Hex | Use |
|---|---|---|
| `cream` | `#faf6ee` | Page background |
| `parchment` | `#f4ecdd` | Alternating section bg |
| `sand` / `sand-deep` / `clay` | `#eadfc8` / `#d5c29c` / `#b08d64` | Borders, subtle fills |
| `sage` / `sage-deep` / `moss` | `#8ba07e` / `#4c6353` / `#31443a` | Green accents; moss = hero/contact bg |
| `terracotta` / `terracotta-deep` | `#c16a45` / `#9e4f2d` | PRIMARY accent, buttons, emphasis italics |
| `dusk` / `dusk-soft` | `#dca48e` / `#eed3c3` | Pink accents on dark sections |
| `indigo-deep` | `#27334f` | Experiences section background |
| `ink` | `#2c2620` | Text / dark footer |
| WhatsApp green (literal) | `#1f6a4a` (hover `#175238`) | All WhatsApp CTAs, used inline, not a token |

### Typography
- `font-display` → **Fraunces** (humanist serif; light 300 headings with `italic` accent phrases in terracotta/dusk)
- `font-sans` → **Manrope** (body, airy `leading-[1.85]`)
- `font-arabic` → **Amiri** (decorative Arabic: مرحباً بكم, شكراً, أهلاً وسهلاً)

### Custom utilities (`src/index.css`)
- `.pattern-zellige` / `.pattern-zellige-light` — inline-SVG eight-point-star lattice, always at low opacity (`opacity-[0.035]`–`0.06`) as a background wash.
- `.texture-linen` — fine crosshatch repeating gradients.
- `.arch` — `border-radius: 999px 999px 1.4rem 1.4rem` (Moroccan door shape). **Currently used ONLY on the Buyouts section image** — user explicitly requested all other imagery be plain **square** (`aspect-square`, no arch mask). Do not reintroduce arches elsewhere.
- `.dappled` (+ `.animate-drift`) — soft-light dappled-sunlight overlay.
- `.field`, `.field-error`, `.field-label` — the form input system (warm off-white, clay border, terracotta focus ring). Reuse for any new inputs.
- Animations: `--animate-marquee` (46s), `--animate-drift` (16s), `--animate-spin-slow`.

### Visual language rules
- Section eyebrows use `Eyebrow` component: `01 · Section name` with khatam stars + rules.
- Sections alternate: parchment → cream → parchment → indigo-deep → cream → parchment → moss → ink footer.
- Scroll reveals via `<Reveal delay={n}>` everywhere; stagger index-based delays.
- Images: `object-cover`, slow hover zoom (`duration-[1.2s] ease-out scale-[1.05]`).
- Buttons: pill (`rounded-full`), uppercase, `tracking-[0.12em–0.16em]`, bold, small (0.72–0.8rem).

---

## 5. Page structure & anchors (in render order)

| Order | Component | Section `id` | Notes |
|---|---|---|---|
| — | `Navbar` | — | Fixed; transparent over hero → cream/blur after 32px scroll |
| 1 | `Hero` | `top` (+ `inquiry` on form wrapper) | Left: headline "Your private riad in Marrakech. Your celebration, your way." Right: full inquiry form. BG: `images/Hero image.jpg` with moss gradient overlays + parallax |
| 2 | `Marquee` | — | Decorative strip |
| 3 | `Buyouts` | `buyouts` | §01 — text + **arched courtyard image** (still Pexels 38891222) + 4 benefits, each with a photo from `images/` |
| 4 | `RiadCollection` | `riads` | §02 — 4 cards, **square** covers, gallery modal |
| 5 | `EventOccasions` | `events` | §03 — 12 occasions, **2 columns max** (`sm:grid-cols-2`, no lg:3), square zoomable images |
| 6 | `UniqueExperiences` | `experiences` | §04 — 9 experiences, **2 columns max**, square zoomable images, indigo bg |
| 7 | `Planning` | `approach` | §05 — 4 numbered steps |
| 8 | `Faq` | `faq` | §06 — accordion, first item open by default |
| 9 | `Contact` | `contact` | §07 — conversion copy + second inquiry form, over a scrimmed photo background |
| 10 | `Footer` | — | Links use same anchors |

`navLinks` (in `collection.ts`): Buyouts, The riads, Events, Experiences, Approach, FAQ — labels were shortened deliberately so the navbar fits at xl.

---

## 6. State architecture & key interactions

### Shared inquiry state — owned by `App.tsx`
```ts
interface EventInquiry {
  name: string; email: string; phone: string;
  eventType: string; eventDate: string; guestCount: string;
  preferredRiad: string; message: string;
}
```
- `App` holds `inquiry`, `inquiryReference` (`string | null`), passes both + setters to **Hero → InquiryForm(variant="hero")** and **Contact → InquiryForm(variant="contact")**. The two forms are always in sync.
- ⚠️ **Removed by user request — do not re-add**: `budget`, `currency`, `marketingOptIn` fields (inputs, types, validation, summary rows all deleted).
- Required fields: name (≥2 chars), valid email, eventType, guestCount (1–1000). Errors are inline, `aria-invalid` wired; errors reset when `reference` changes.
- Submit → `onSubmitInquiry()` in App generates `RM-${random base36 upper}` → both forms switch to animated success panel (reference + summary dl + "Start another inquiry" resets everything).
- **"Discuss this riad" flow**: `RiadCollection` modal reservation CTA → `onChoose(riadId)` → App sets `preferredRiad` + smooth-scrolls to `#contact`. Hero form's "Request a tailored quote" button anchors to `#inquiry`.

### Riad gallery modal (`RiadCollection.tsx`)
- Rendered with `createPortal(document.body)` — **critical**: it lives outside the `overflow-hidden` section so it isn't clipped. Keep the portal.
- Click card image → modal: large image w/ prev/next (wrap-around), thumbnail strip (`aria-pressed`), caption, counter, description, highlights, "Ideal for", **WhatsApp CTA** (`whatsappLink(...)` w/ riad-specific prefilled message) + **Request a reservation CTA**.
- Keyboard: `Esc` close, `←/→` navigate. Body scroll locked while open. Backdrop click closes. `RiadPhoto` sub-component has an error fallback (zellige pattern + name) via `onError`, and uses `referrerPolicy="no-referrer"` for hotlink-friendly CDNs.

### Photo zoom (`PhotoLightbox.tsx`)
- `ZoomableImage` wraps event/experience images in a button (zoom-in icon on hover, `cursor-zoom-in`).
- `PhotoLightbox` = portal lightbox: full image `object-contain`, `max-h-[78vh]`, caption, close button, `Esc`/backdrop close, body scroll lock. Used independently by EventOccasions and UniqueExperiences (each holds its own `zoomedPhoto` state).

### Navbar (`Navbar.tsx`)
- Three flex zones in a `max-w-[100rem]` container: brand (`shrink-0`) / centered links (`flex-1`, **xl+ only**) / actions (`shrink-0`). This layout was fixed after an overlap bug — preserve the `shrink-0`/`flex-1`/`whitespace-nowrap` structure.
- Links show at `xl:` (1280px+); hamburger shows below `xl`. WhatsApp button shows `lg+`; "Plan your event" shows `sm+`.
- Scrollspy: `IntersectionObserver` with `rootMargin: "-38% 0px -55% 0px"` sets active anchor (diamond marker under link).
- Full-screen moss mobile menu with staggered links, "Start planning your event", and "WhatsApp us" buttons; locks body scroll.

### Floating elements (App.tsx)
- Sticky **WhatsApp** pill: fixed `right-5 bottom-24`, green, always visible.
- **Back-to-top** button: fixed `right-5 bottom-5`, appears after `scrollY > 900` via `AnimatePresence`.
- Note: riad modal z-index is 80, photo lightbox 90, mobile menu 60, navbar 50, floaters 40 — keep this stacking order if adding overlays.

---

## 7. Data layer (`src/data/collection.ts`)

Everything content-related is centralized here. Types: `Riad`, `RiadImage`, `EventOccasion`, `MarrakechExperience`, `FaqItem`, `EventInquiry`.

- `riads: Riad[4]` — id, name, category, location, `image` (local cover from `images.ts`), `description`, `highlights[]`, `idealFor`, `imagePosition`, `gallery: RiadImage[4]`.
- `riadGallery` — each gallery is **cover + 4 local photos** from `images/RIADS/<riad>/`, built by the local `gallery(id, cover, captions)` helper. Captions (the visible modal text) live in `collection.ts`, not `images.ts`.
- `eventOccasions[12]`, `marrakechExperiences[9]` — each has `title`, `description`, `image` (local file via `images.ts`), `imageAlt`.
- `buyoutBenefits[4]` — `title`, `description`, `image`, `imageAlt` (rendered as a 4/3 photo above each benefit), `planningSteps[4]`, `faqs[7]`.
- `eventTypeOptions[13]` — dropdown values incl. "Other / bespoke event".
- `defaultEventInquiry()` factory — used for init and reset.
- `formatEventDate(iso)` — en-GB long date; dates parsed at `T12:00:00` to dodge timezone bugs.
- **`whatsappBusinessNumber = "212728585823"`** (entered as `0728585823`, converted to +212 Morocco — wa.me needs the country code and no leading zero) and `whatsappLink(message)` → `https://wa.me/${number}?text=${encodeURIComponent(message)}`. All WhatsApp CTAs (navbar ×2, sticky, modal) funnel through this helper.

---

## 8. Conventions & gotchas for future edits

1. **Tailwind v4 syntax** — tokens/custom utilities go in `src/index.css` (`@theme`, `@utility`), NOT a config file. Arbitrary values like `bg-[#1f6a4a]`, `text-[0.7rem]` are used liberally and are fine.
2. **Always use `cn()`** for conditional classes; framer-motion `AnimatePresence` for mount/unmount transitions.
3. **All modals must be portals** to `document.body` (sections have `overflow-hidden`).
4. **Square imagery** for riad cards, occasions, and experiences. Exception: Buyouts — the `.arch` hero figure, plus the 4 benefit photos (4/3). User was explicit about this.
5. **2-column max** for EventOccasions and UniqueExperiences grids (`sm:grid-cols-2` only). Don't "upgrade" to 3.
6. **No budget/currency/marketing inputs** in the form. User removed them.
7. Content edits belong in `collection.ts`, not inline in components. Keep the four riads in the given order.
8. New icons: check they exist in installed `lucide-react` — brand icons don't; use inline SVG (pattern in old Footer) if needed.
9. Fonts load from Google Fonts in `index.html` — if adding a family, add the `<link>` there.
10. External images: only the Buyouts arch figure is remote — keep `referrerPolicy="no-referrer"` and graceful `onError` fallbacks (pattern: `RiadPhoto`) on any image that isn't bundled.
11. Preserve calm pacing: generous section padding (`py-24 sm:py-32`), one idea per viewport, `Reveal` animations on new content.
12. After any change: `npm run build` **and** `npx tsc --noEmit` must both pass.

---

## 9. Known TODOs / intentionally unfinished (owner's plans)

| Item | Where | Status |
|---|---|---|
| ~~WhatsApp business number~~ | `whatsappBusinessNumber` in `src/data/collection.ts` | **Done:** `212728585823` (+212 Morocco, from the owner's `0728585823`). All 4 CTAs are live. |
| **Analytics** | `index.html` | Google Tag Manager `GTM-N3TLW44X` (head script + body noscript) and the Search Console verification meta are installed. Single-page app → GTM fires once on load; add a History API trigger if you later need per-section pageviews. |
| **Remaining stock photography** | Buyouts arched courtyard figure in `Buyouts.tsx` | Still a Pexels URL — the only remote image left. Every other image (hero, contact, riad covers + galleries, events, experiences, benefits) comes from the owner's `images/` folder. |
| **Form delivery backend** | `InquiryForm.tsx` / `App.tsx` `submitInquiry()` | Client-side demo confirmation only. Needs an email service/API endpoint to actually send inquiries. Do not claim it sends email. |
| Real riad links ("Visit Almaha", etc.) | Removed in favor of modal + inquiry flow | Could be re-added inside the gallery modal if requested. |

---

## 10. Quick orientation for a fresh agent

- Start at `src/App.tsx` to see composition + state, then `src/data/collection.ts` for all content, then `src/index.css` for the visual language.
- The two `InquiryForm` instances are one component — edit once, both update.
- If asked to "add a section", follow the numbered-eyebrow pattern (§01–§07) and insert an anchor into `navLinks`; keep alternating background rhythm.
- If asked to change images: edit `src/data/images.ts` (imports) or `collection.ts` (mapping) — never hardcode paths in components. Keep the four riad covers mapping to their own filenames.
- The design brief the owner approved: *calm, intentional, grounded — warm sand / sage / off-white with terracotta, dusk pink, deep indigo accents; humanist serif headings; airy body; generous margins; zellige and linen textures; dappled light.* Match it.