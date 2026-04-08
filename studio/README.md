# MTL BAL JAM — Sanity Studio

Content management studio for the MTL BAL JAM website, built with [Sanity v5](https://www.sanity.io/).

- **Project ID:** `tdfa35ku`
- **Dataset:** `production`
- **Workspace:** `mtlbaljam`
- **Hosted studio:** [mtlbaljam.sanity.studio](https://mtlbaljam.sanity.studio)

---

## Setup

The studio has its own `node_modules` and must be installed separately from the Next.js app.

```bash
cd studio
npm install
```

Create a `.env` file in this directory (already gitignored):

```env
SANITY_STUDIO_PROJECT_ID=tdfa35ku
SANITY_STUDIO_DATASET=production
```

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the studio locally at `http://localhost:3333` |
| `npm run build` | Build the studio for production |
| `npm run deploy` | Deploy the studio UI to Sanity hosting |
| `npm run typegen` | Regenerate TypeScript types from the current schema |

From the **root** of the project you can also use:

| Command | Description |
|---|---|
| `npm run studio` | Start the studio locally |
| `npm run studio:build` | Build the studio |
| `npm run studio:deploy` | Deploy the studio UI |
| `npm run typegen` | Extract schema + regenerate types (runs from studio dir) |

### Deploy schema to content lake

After modifying any schema files, run this to make the schema available to tools:

```bash
cd studio
npx sanity schema deploy
```

> Note: `sanity deploy` (UI hosting) and `sanity schema deploy` (content lake schema) are separate commands, both need to be run after schema changes.

---

## Regenerating TypeScript types

The Next.js app uses generated types from `src/sanity.types.ts`. After changing any schema or GROQ query:

1. Run typegen from the root:
   ```bash
   npm run typegen
   ```
2. This extracts `studio/schema.json` then regenerates `src/sanity.types.ts`.
3. If you add a new field to a query, also update `src/lib/sanity/queryTypes.ts` if needed (it re-exports derived types).

> `src/sanity.types.ts` is auto-generated — do not edit it by hand.

---

## Schema structure

```
schemaTypes/
  primitives/         # Reusable field types used across all documents
    localizedString   # { en, fr } string, used for all bilingual labels
    imageWithAlt      # Sanity image + localized alt text
    geoCoordinates    # { lat, lng } for map pins

  objects/            # Embedded objects (not standalone documents)
    scheduleEvent     # A single item in the weekend schedule
    competition       # A competition entry (type, title, description, price…)
    extraItem         # An à-la-carte add-on (merch, excursions, etc.)
    priceTier         # A registration price tier with date range
    registrationPageContent  # All registration page fields grouped
    trackItem / trackClass   # Class track + individual classes within it
    instructorGroup   # A group of instructors shown on the home page
    homePageContent   # Hero/featured sections for the home page

  documents/          # Top-level Sanity documents (appear in the sidebar)
    eventEdition      # One festival year (2024, 2025…), the main document
    instructor        # An instructor with bio, photo, and YouTube link
    bandOrDj          # A band or DJ with logo and biography
    judge             # A competition judge with photo
    sponsor           # A sponsor with logo and link
    venue             # The event venue with address, photo, and map pin
    staffMember       # A team member (current or alumni)
    staticPage        # A content-managed page (About, Travel, etc.)
    siteSettings      # Singleton — global UI labels and social links
```

---

## Key documents

### `eventEdition`

The central document for each festival year. It holds references to instructors, bands, DJs, judges, sponsors, the venue, and all event-specific content: schedule, competitions, tracks, registration page, and extras.

One `eventEdition` per year. The `year` field (e.g. `2026`) is used in URLs (`/en/2026/schedule`) and as a query parameter throughout the Next.js app.

### `siteSettings`

A singleton document (only one exists). Holds:
- Social media URLs (Facebook, Instagram)
- Contact email
- **UI Labels** — localized strings for section titles and button text used across the site (e.g. "Our Team", "Current Team", "Register Now"). Edit these here instead of in code.

### `staticPage`

One document per static page. The `pageKey` field links it to a Next.js route:

| Page key | Route |
|---|---|
| `about` | `/[lang]/about` |
| `code-of-conduct` | `/[lang]/code-of-conduct` |
| `travel` | `/[lang]/travel` |
| `visiting` | `/[lang]/visiting` |
| `volunteering` | `/[lang]/volunteering` |

Each static page has:
- `metaTitle` / `metaDescription` — SEO metadata (EN + FR)
- `content` — full page body as Portable Text (EN + FR)
- Visiting page extras: food image, sightseeing image, map URL/label

### `staffMember`

Team members shown on the About page. Toggle **Current Staff Member** to move someone between the current team and alumni sections.

---

## Localization

All user-facing text is bilingual (EN/FR). Fields use one of three localized primitives:

| Type | Shape | Use for |
|---|---|---|
| `localizedString` | `{ en: string, fr: string }` | Short labels, titles |
| `localizedSimpleText` | `{ en: string[], fr: string[] }` | Simple text arrays |
| `localizedText` | `{ en: Block[], fr: Block[] }` | Rich text / Portable Text |

The Next.js app resolves the correct language at render time using `localize(field, lang)` from `src/lib/sanity/localize.ts`.

---

## Vision tool

The studio includes the [Vision plugin](https://www.sanity.io/docs/the-vision-plugin) for running GROQ queries directly against the dataset. Access it via the **Vision** tab in the studio sidebar — useful for testing queries before adding them to the codebase.
