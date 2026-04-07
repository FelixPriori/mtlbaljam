/**
 * Types derived from TypeGen-generated `src/sanity.types.ts`.
 * Do NOT edit shapes here — update the Sanity schema or GROQ queries instead,
 * then run `npm run typegen` to regenerate `sanity.types.ts`.
 *
 * Exported names are intentionally identical to the old manual types so
 * that no component imports need to change.
 */
import type {
  INSTRUCTORS_QUERY_RESULT,
  MUSIC_QUERY_RESULT,
  VENUE_QUERY_RESULT,
  COMPETITIONS_QUERY_RESULT,
  TRACKS_QUERY_RESULT,
  REGISTRATION_QUERY_RESULT,
  EXTRAS_QUERY_RESULT,
  HOME_PAGE_QUERY_RESULT,
  STAFF_QUERY_RESULT,
  EVENT_EDITION_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity.types'

// ── Re-exported primitives (kept manual — not derivable from query results) ────

export type LocalizedString = { en: string | null; fr: string | null } | null
export type LocalizedStringArray = { en: Array<string> | null; fr: Array<string> | null } | null

// ── Derived types ──────────────────────────────────────────────────────────────

export type SanityInstructor = NonNullable<NonNullable<INSTRUCTORS_QUERY_RESULT>['instructors']>[number]

export type SanityBandOrDj = NonNullable<NonNullable<MUSIC_QUERY_RESULT>['bands']>[number]

export type SanityVenue = NonNullable<NonNullable<VENUE_QUERY_RESULT>['venue']>

export type SanityJudge = NonNullable<NonNullable<COMPETITIONS_QUERY_RESULT>['judges']>[number]

export type SanityTrack = NonNullable<NonNullable<TRACKS_QUERY_RESULT>['tracks']>[number]

export type SanityTrackClass = NonNullable<SanityTrack['classes']>[number]

type _RegPage = NonNullable<NonNullable<REGISTRATION_QUERY_RESULT>['registrationPage']>
export type SanityPriceTier = NonNullable<_RegPage['priceTiers']>[number]
export type SanityRegistrationPage = _RegPage

export type SanityExtraItem = NonNullable<NonNullable<EXTRAS_QUERY_RESULT>['extras']>[number]

export type SanityStaffMember = STAFF_QUERY_RESULT[number]

type _HomePage = NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['homePage']>
export type SanityHomePage = _HomePage
export type SanityInstructorGroup = NonNullable<_HomePage['featuredInstructorGroups']>[number]

type _EventEdition = NonNullable<EVENT_EDITION_QUERY_RESULT>
export type SanityEventEdition = _EventEdition
export type SanityScheduleEvent = NonNullable<_EventEdition['scheduleEvents']>[number]
export type SanityCompetition = NonNullable<_EventEdition['competitions']>[number]
export type SanitySponsorEntry = NonNullable<_EventEdition['sponsors']>[number]

export type SanityLabels = NonNullable<SITE_SETTINGS_QUERY_RESULT>['labels']

// ── Static page ───────────────────────────────────────────────────────────────

export type SanityStaticPage = {
  pageKey: string | null
  content: {
    en: unknown[] | null
    fr: unknown[] | null
  } | null
} | null

// ── Legacy aliases kept for backward compat ───────────────────────────────────

/** @deprecated Use `SanityInstructor['biography']` shape directly */
export type LocalizedPortableText = SanityInstructor['biography']

/** @deprecated Image shape is inlined in derived types; use urlFor() directly */
export type ImageWithAlt = NonNullable<SanityInstructor['cutoutImage']>
export type SanityImageAsset = NonNullable<ImageWithAlt['asset']>
