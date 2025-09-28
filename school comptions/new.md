# Codebase Reorganization Plan (Proposal)

This document proposes a refactor to remove duplicated logic, improve maintainability, and introduce a clean folder structure. No implementation has been done yet—awaiting approval.

## Goals
- Reduce duplication of header/footer setup and page initialization.
- Centralize shared UI/theme utilities used across pages.
- Organize files into a predictable, scalable structure.
- Keep the site buildless (no bundler) unless we decide otherwise.

## Current Findings (from quick audit)
- `js/header.js` and `js/footer.js` provide unified components, but `hospitals.js` reimplements its own header/footer.
- `hospital-page.js` contains reusable utilities: `loadScript()`, `applyTheme()`, `showLoading()`, `createAgeGroupSelection()`, and `initHospitalPage()`.
- Many HTML pages rely on `update-html-files.js` to inject `<header id="header">`, `<footer id="footer">`, and include `js/header.js`/`js/footer.js` scripts.
- Multiple per-page scripts exist (e.g., `home.js`, `hospitals.js`, `book.js`, etc.), often duplicating DOMContentLoaded bootstrapping and basic layout setup.

## Proposed Folder Structure
Keep all HTML in the repository root for now. Consolidate JS into a single `src/` tree while keeping current `js/` for compatibility during migration. After migration, we can delete old duplicates.

```
/ (repo root)
├─ *.html                 # existing pages remain
├─ src/
│  ├─ core/               # shared low-level utilities
│  │  ├─ dom.js           # query helpers, safe element creation
│  │  ├─ events.js        # DOMContentLoaded, scroll helpers
│  │  └─ net.js           # future fetch helpers if needed
│  ├─ ui/                 # shared UI components & theme
│  │  ├─ theme.js         # applyTheme(), CSS var injection
│  │  ├─ loading.js       # showLoading(show)
│  │  ├─ header.js        # moved from js/header.js (single source)
│  │  └─ footer.js        # moved from js/footer.js (single source)
│  ├─ data/
│  │  └─ age-groups.js    # exported ageGroups[] used across pages
│  ├─ pages/              # per-page initializers only
│  │  ├─ hospitals/
│  │  │  └─ animation.js  # extracted createCircleAnimation()
│  │  ├─ hospital-page.js # initHospitalPage(), selectAgeGroup()
│  │  ├─ home.js
│  │  ├─ book.js
│  │  ├─ ask.js
│  │  └─ ...               # other pages
│  └─ bootstrap.js        # global bootstrapping and route mapping
├─ js/                    # legacy location; temporarily re-export wrappers
│  ├─ header.js           # wrapper: calls src/ui/header.js
│  └─ footer.js           # wrapper: calls src/ui/footer.js
├─ scripts/
│  └─ update-html-files.js # remains, may be simplified
└─ new.md                 # this plan
```

Notes:
- We preserve `js/header.js` and `js/footer.js` as thin wrappers pointing to `src/ui/*` so existing HTML includes continue to work during migration.
- We will move reusable utilities out of `hospital-page.js` into `src/ui/theme.js`, `src/ui/loading.js`, and `src/data/age-groups.js`.

## Module Boundaries and Responsibilities
- `src/ui/header.js` and `src/ui/footer.js`: single source of truth for header/footer. No other file redefines these.
- `src/ui/theme.js`: `applyTheme(config)` injects CSS variables and shared button styles.
- `src/ui/loading.js`: `showLoading(show)` renders/removes a single spinner overlay.
- `src/data/age-groups.js`: exports the `ageGroups` array only; no DOM logic here.
- `src/pages/*`: page-specific initialization only (no shared components).
- `src/pages/hospital-page.js`: keeps `initHospitalPage(config)` and `selectAgeGroup()`, but imports shared utilities from `src/ui` and `src/data`.
- `src/pages/hospitals/animation.js`: contains `createCircleAnimation()` used by Hospitals page only.
- `src/bootstrap.js`: a small router that runs on DOMContentLoaded; mounts header/footer and then calls the right page initializer using a `data-page` attribute on `<body>`.

## HTML Conventions (Lightweight Routing)
- Add `data-page="home"`, `data-page="hospitals"`, etc. to `<body>` in each HTML file.
- Ensure every page includes the following scripts before `</body>` (order):
  1. Bootstrap Icons CSS already added in `<head>` by `update-html-files.js`.
  2. `js/header.js`, `js/footer.js` (legacy wrappers for now).
  3. `src/bootstrap.js` (new). This file internally decides which page initializer to call.

Example snippet to add before `</body>`:
```html
<script src="js/header.js"></script>
<script src="js/footer.js"></script>
<script type="module" src="src/bootstrap.js"></script>
```

## Deduplication Plan
1. Unify header/footer:
   - Delete header/footer creation from `hospitals.js` and any other page scripts.
   - Ensure all pages rely solely on `src/ui/header.js` and `src/ui/footer.js` (via legacy wrappers in `js/`).
2. Extract shared utilities from `hospital-page.js`:
   - Move `applyTheme()` to `src/ui/theme.js`.
   - Move `showLoading()` to `src/ui/loading.js`.
   - Move `ageGroups` to `src/data/age-groups.js`.
   - Keep `initHospitalPage()` and `selectAgeGroup()` but update imports.
3. Isolate hospitals animation:
   - Move `createCircleAnimation()` to `src/pages/hospitals/animation.js`.
   - Update `hospitals.js` to import and call only page-specific pieces (or convert it into `src/pages/hospitals/index.js`).
4. Standardize bootstrapping:
   - Introduce `src/bootstrap.js` that mounts header/footer and calls per-page initializers based on `document.body.dataset.page`.

## Migration Steps (Incremental, Safe)
- Phase 0 (Prep):
  - Create `src/` structure and migrate `js/header.js`/`js/footer.js` into `src/ui/`, leaving wrappers in `js/` that call the new modules.
- Phase 1 (Shared utilities):
  - Extract theme/loading/age-groups from `hospital-page.js` into `src/ui` and `src/data`.
  - Update `hospital-page.js` to import from new locations (keep same exported API).
- Phase 2 (Hospitals page):
  - Extract `createCircleAnimation()` into `src/pages/hospitals/animation.js`.
  - Remove header/footer duplication from `hospitals.js`.
  - Option A (minimal): keep `hospitals.js` but import from `src/pages/hospitals/animation.js`.
  - Option B (clean): replace `hospitals.js` with `src/pages/hospitals/index.js` and update HTML to load via `bootstrap.js`.
- Phase 3 (Bootstrap & HTML):
  - Add `data-page` attributes to each HTML.
  - Include `src/bootstrap.js` on all pages.
  - Ensure `update-html-files.js` inserts the correct script tags if missing (extend it slightly if needed).
- Phase 4 (Cleanup):
  - Remove dead code paths and duplicated functions.
  - Optionally remove legacy wrappers in `js/` after all pages are confirmed migrated.

## Risks and Mitigations
- Risk: Mixed module systems (script tags vs ES modules).
  - Mitigation: Keep `js/header.js` and `js/footer.js` as wrappers; use `type="module"` for `src/bootstrap.js` and imports.
- Risk: HTML pages missing `data-page`.
  - Mitigation: Extend `update-html-files.js` to add `data-page` heuristically or provide a checklist.
- Risk: Styling regressions.
  - Mitigation: Snapshot visual checks and ensure `applyTheme()` injects the same CSS variables currently used by `header.js`/`footer.js`.

## Testing & Verification Checklist
- Header/Footer
  - Header renders once per page without duplicates.
  - Footer renders once per page without duplicates.
  - Active nav state correct on each page.
- Theming
  - `applyTheme()` sets `--primary-color`, `--secondary-color`, `--accent-color` and buttons reflect hover/active states.
- Loading
  - `showLoading(true/false)` overlays appear/disappear correctly and do not stack.
- Page Initializers
  - `hospitals` page animation renders and navigates correctly.
  - `hospital-page` age-group selection navigates correctly.
- HTML Integration
  - All pages include `js/header.js`, `js/footer.js`, and `src/bootstrap.js` in correct order.
  - All `<body>` tags have `data-page` set correctly.

## Open Questions
- Keep everything buildless or introduce a simple bundler (e.g., Vite) later? Proposal: stay buildless for now.
- Do we want language/RTL toggles in header/footer now, or later?

## Duplicated Logic Inventory (Detailed)
- Header/Footer duplication
  - Files redefining headers: `about.js`, `contact.js`, `hospitals.js`, `spec-el3am.js`, `elgeldia-spec.js`, `elhomiat-spec.js`, `elkebd-spec.js`, `elramad-spec.js`, `elsader-spec.js`, and more.
  - Files redefining footers: same list as above; some embed mini footers with slight content differences.
  - Plan impact: remove page-local header/footer creation and rely on single source `src/ui/header.js` and `src/ui/footer.js` via legacy wrappers under `js/` during migration.

- Booking flow duplication
  - Files: `book.js`, `middle.js`, `teen.js`, `old.js` all contain near-identical logic: `addStyles()`, `typeText()/typewriter`, `PRICES`, `PAYMENT_NUMBERS`, `initializeBookingForm()`, `calculateTotal()`, `handleFormSubmit()`, `setupInputValidation()`.
  - Plan impact: extract to `src/pages/booking/booking-core.js` (shared logic) + small per-variant config in `src/pages/booking/variants/{adult,teen,old,children}.js`. Optionally converge to a single `book.html` with query param (e.g., `?age=teen`).

- Typewriter/text effects duplication
  - Found in: `book.js`, `middle.js`, `teen.js`, `old.js`, `spec-el3am.js`, `about.html` inline script.
  - Plan impact: `src/ui/typewriter.js` with a debounced, interruptible API.

- Chat UI/message rendering duplication
  - Files: `ask.js` and `review.js` both implement chat bubbles, message appending, and typing delays.
  - Plan impact: `src/ui/chat.js` (renderMessage, typingIndicator, autoScroll) with language-support hooks; `ask.js` becomes a thin controller using shared UI.

- Theme/CSS variable injection duplication
  - Files: `hospital-page.js` (`applyTheme()`), plus multiple pages manually inject button/nav colors.
  - Plan impact: consolidate in `src/ui/theme.js` and reuse.

- Hospital animation logic coupling
  - File: `hospitals.js` contains `createCircleAnimation()` tightly coupled to page init and also re-creates header/footer.
  - Plan impact: move animation to `src/pages/hospitals/animation.js`; page init only wires events.

- Ad-hoc auth/session snippets
  - Files: `login.js` (stores `sessionStorage.user`), `log.js` (unused/legacy), some pages assume header presence.
  - Plan impact: optional `src/core/session.js` helper for consistent read/write; remove `log.js` if confirmed unused.

## Page Inventory and Routing Map (Proposed `data-page` values)
- `home.html` → `data-page="home"` → `src/pages/home.js`
- `hospitals.html` → `data-page="hospitals"` → `src/pages/hospitals/index.js`
- `hospital-template.html`, `al3am-hospital.html` → `data-page="hospital-page"` → `src/pages/hospital-page.js`
- Specialties pages:
  - `spec-el3am.html` → `data-page="specialties-general"` → `src/pages/specialties/general.js`
  - `elgeldia-spec.html` → `data-page="specialties-dermatology"` → `src/pages/specialties/dermatology.js`
  - `elhomiat-spec.html` → `data-page="specialties-fever"` → `src/pages/specialties/fever.js`
  - `elkebd-spec.html` → `data-page="specialties-liver"` → `src/pages/specialties/liver.js`
  - `elramad-spec.html` → `data-page="specialties-eye"` → `src/pages/specialties/eye.js`
  - `elsader-spec.html` → `data-page="specialties-chest"` → `src/pages/specialties/chest.js`
- Booking variants:
  - `book.html` → `data-page="booking-adult"`
  - `teen.html` → `data-page="booking-teen"`
  - `midlle.html` → `data-page="booking-middle"` (note: filename typo vs `middle.js`)
  - `old.html` → `data-page="booking-old"`
- Other pages:
  - `ask.html` → `data-page="ask"`
  - `contact.html` → `data-page="contact"`
  - `about.html` → `data-page="about"`
  - `review.html` → `data-page="review"`
  - `polices.html` → `data-page="policies"`
  - `login.html` → `data-page="login"`
  - `sign.html` → `data-page="signup"`
  - `password.html` → `data-page="password-recovery"`

## Additional Phases (Beyond Phases 0–4)
- Phase 5 (Booking refactor):
  - Create `src/pages/booking/booking-core.js` with shared UI, validation, payment display, and price calc.
  - Implement variant config files (labels, defaults). Optionally fold pages into one `book.html?age=...`.
  - Update `book.js`, `middle.js`, `teen.js`, `old.js` to delegate to `booking-core.js` and remove local duplicates.

- Phase 6 (Chat UI refactor):
  - Create `src/ui/chat.js` for message bubbles, timestamps, typing indicator, auto-scroll.
  - Update `ask.js` and `review.js` to use `chat.js`; keep domain strings and flows local.

- Phase 7 (Typewriter consolidation):
  - Create `src/ui/typewriter.js` and replace calls in booking pages, `spec-el3am.js`, and `about.html` inline script.

- Phase 8 (Session/utils hardening):
  - Introduce `src/core/session.js` for `sessionStorage` ops and constants; remove `log.js` if unused.
  - Audit for CSP compatibility (script/order); ensure `type="module"` use is consistent.

## Rollout Timeline (Quick View)
- Week 1: Phases 0–1 (core structure, header/footer move, theme/loading/age-groups extraction).
- Week 2: Phase 2 (hospitals animation), Phase 3 (bootstrap router + `data-page`), start Phase 5 (booking-core).
- Week 3: Finish Phase 5, Phase 6 (chat UI), Phase 7 (typewriter), Phase 8 (session/utils), Phase 4 cleanup.

## Acceptance Criteria (Additions)
- No page includes locally defined header/footer builders; all via `src/ui/*`.
- Booking pages share one JS core; business rules configurable per variant.
- Chat UIs (`ask`, `review`) render via shared components; i18n works as before.
- Typewriter effect standardized; no duplicate implementations remain.
- Lighthouse basic pass: no duplicated inline styles for common UI; minimal inline scripts except page bootstrap.

---
If you approve, I will start with Phase 0 and proceed incrementally, validating each step.

---

## Implementation Status (2025-09-13)

- Completed Phases
  - Phase 3: Added `data-page` to all pages and included `src/bootstrap.js` globally.
  - Phase 4: Removed duplicate header/footer initializers from page scripts; rely on `src/ui/header.js` and `src/ui/footer.js` via `js/*` wrappers.
  - Phase 5: Implemented `src/pages/booking/booking-core.js` and routed booking pages to a shared init.
  - Phase 6/7: Created `src/ui/chat-core.js` (Ask/Review) and `src/ui/typewriter.js`. Routed Ask/Review/ About to shared modules. Removed inline scripts.

- Actual `data-page` routing map in use
  - Booking pages: `booking-adult` (book), `booking-teen` (teen), `booking-middle` (midlle), `booking-old` (old)
  - Chat pages: `ask`, `review`
  - About page: `about` (typewriter init + tab switching)
  - Auth/recovery: `login` (login.html), `signup` (sign.html), `password` (password.html), `code` (code.html)
  - Other pages currently rely on their page scripts without a router handler (e.g., policies/contact) but include the global bootstrap and wrappers.

- Inline script removals (migrated to modules/router)
  - about.html, ask.html, review.html, contact.html, password.html, code.html, booking pages.

- Shared modules now in place
  - `src/ui/chat-core.js`, `src/ui/typewriter.js`
  - `src/pages/booking/booking-core.js`
  - `src/bootstrap.js` extended with routes for booking, ask, review, about, password, code

- Next actions (Phase 5b)
  - Remove dead files that are no longer referenced:
    - `about.js`, `ask.js`, `review.js`, `teen.js`, `middle.js`, `old.js`, `log.js`
  - Optional: move remaining inline logic (if any) into dedicated modules and add routes.
  - Optional: author a README describing routing/data-page conventions and shared modules.

- Smoke test checklist (quick)
  - Verify single header/footer per page, booking totals/payment toggles, Ask language toggle + suggestions, Review chat replies, About typewriter, contact form submission, password/code flows.
