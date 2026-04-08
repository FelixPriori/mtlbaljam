import { defineQuery } from 'next-sanity'

// ── Shared projections ────────────────────────────────────────────────────────

const localizedStringFragment = /* groq */ `{ en, fr }`
const localizedSimpleTextFragment = /* groq */ `{ en, fr }`
const localizedTextFragment = /* groq */ `{ en, fr }`

const imageWithAltFragment = /* groq */ `{
  asset->{ _id, url, metadata { dimensions } },
  hotspot,
  crop,
  alt ${localizedStringFragment}
}`

const instructorFragment = /* groq */ `{
  _id,
  name,
  pronouns,
  slug,
  cutoutImage ${imageWithAltFragment},
  youtubeUrl,
  externalLink,
  biography ${localizedTextFragment},
  schemaDescription
}`

const bandOrDjFragment = /* groq */ `{
  _id,
  name,
  type,
  pronouns,
  logo ${imageWithAltFragment},
  biography ${localizedTextFragment},
  link,
  schemaDescription
}`

const judgeFragment = /* groq */ `{
  _id,
  name,
  image ${imageWithAltFragment}
}`

const sponsorWithTierFragment = /* groq */ `{
  tier,
  sponsorRef->{ _id, name, logo ${imageWithAltFragment}, link }
}`

const venueFragment = /* groq */ `{
  _id,
  name,
  address,
  website,
  description ${localizedSimpleTextFragment},
  photo ${imageWithAltFragment},
  position { lat, lng },
  markerTitle,
  infoWindowText
}`

// ── Event Edition ─────────────────────────────────────────────────────────────

export const EVENT_EDITION_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0] {
    year,
    startDate,
    endDate,
    registrationOpenDate,
    registrationCloseDate,
    venueRef-> ${venueFragment},
    instructors[]-> ${instructorFragment},
    bands[]-> ${bandOrDjFragment},
    djs[]-> ${bandOrDjFragment},
    sponsors[] ${sponsorWithTierFragment},
    scheduleEvents[] {
      id,
      title ${localizedStringFragment},
      start,
      end,
      type,
      location,
      instructorRef->{ _id, name, slug }
    },
    competitions[] {
      type,
      title ${localizedStringFragment},
      description ${localizedSimpleTextFragment},
      price,
      format ${localizedStringFragment},
      when ${localizedStringFragment}
    },
    "judges": judges[]-> ${judgeFragment},
    tracks[] {
      trackName ${localizedStringFragment},
      trackDescription ${localizedSimpleTextFragment},
      classes[] {
        title ${localizedStringFragment},
        description ${localizedSimpleTextFragment},
        instructorRef->{ _id, name, slug }
      }
    },
    tracksPageDescription ${localizedSimpleTextFragment},
    levelInfo ${localizedSimpleTextFragment},
    registrationPage {
      isOpen,
      registerUrl,
      fullPassDescription ${localizedStringFragment},
      partyPassDescription ${localizedStringFragment},
      classPassDescription ${localizedStringFragment},
      ticketsDetailsTitle ${localizedStringFragment},
      fullPassIncludes ${localizedSimpleTextFragment},
      partyPassIncludes ${localizedSimpleTextFragment},
      classPassIncludes ${localizedSimpleTextFragment},
      priceTiers[] {
        dateLabel ${localizedStringFragment},
        endDate,
        fullPassPrice,
        partyPassPrice,
        classPassPrice
      },
      subsidyTitle ${localizedStringFragment},
      subsidyInfo ${localizedSimpleTextFragment},
      subsidyEligibilityTitle ${localizedStringFragment},
      subsidyEligibility ${localizedSimpleTextFragment},
      termsUrl,
      termsLinkText ${localizedStringFragment},
      termsContent ${localizedStringFragment}
    },
    extras[] {
      key,
      title ${localizedStringFragment},
      price,
      soldOut,
      when ${localizedStringFragment},
      description ${localizedSimpleTextFragment},
      images[] ${imageWithAltFragment},
      orderInstructions ${localizedSimpleTextFragment}
    }
  }
`)

// ── Instructors (for a specific edition) ─────────────────────────────────────

export const EDITION_INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0].instructors[]-> ${instructorFragment}
`)

// ── Per-edition page queries (pass { year: number } as params) ────────────────

export const INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "instructors": instructors[]-> ${instructorFragment}
  }
`)

export const MUSIC_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "bands": bands[]-> ${bandOrDjFragment},
    "djs": djs[]-> ${bandOrDjFragment}
  }
`)

export const VENUE_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "venue": venueRef-> ${venueFragment}
  }
`)

export const COMPETITIONS_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "scheduleNote": competitionsScheduleNote ${localizedStringFragment},
    "competitionNote": competitionsNote ${localizedStringFragment},
    "musicTitle": competitionsMusicTitle ${localizedStringFragment},
    "musicDescription": competitionsMusicDescription ${localizedStringFragment},
    "competitions": competitions[] {
      type,
      title ${localizedStringFragment},
      description ${localizedSimpleTextFragment},
      price,
      format ${localizedStringFragment},
      when ${localizedStringFragment}
    },
    "judges": judges[]-> ${judgeFragment}
  }
`)

export const TRACKS_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "tracks": tracks[] {
      trackName ${localizedStringFragment},
      trackDescription ${localizedSimpleTextFragment},
      classes[] {
        title ${localizedStringFragment},
        description ${localizedSimpleTextFragment},
        instructorRef->{ _id, name, slug }
      }
    },
    "tracksPageDescription": tracksPageDescription ${localizedSimpleTextFragment},
    "levelInfo": levelInfo ${localizedSimpleTextFragment},
    "levelInfoConcepts": levelInfoConcepts ${localizedSimpleTextFragment}
  }
`)

export const REGISTRATION_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "registrationPage": registrationPage {
      isOpen,
      registerUrl,
      fullPassDescription ${localizedStringFragment},
      partyPassDescription ${localizedStringFragment},
      classPassDescription ${localizedStringFragment},
      ticketsDetailsTitle ${localizedStringFragment},
      fullPassIncludes ${localizedSimpleTextFragment},
      partyPassIncludes ${localizedSimpleTextFragment},
      classPassIncludes ${localizedSimpleTextFragment},
      priceTiers[] {
        dateLabel ${localizedStringFragment},
        endDate,
        fullPassPrice,
        partyPassPrice,
        classPassPrice
      },
      subsidyTitle ${localizedStringFragment},
      subsidyInfo ${localizedSimpleTextFragment},
      subsidyEligibilityTitle ${localizedStringFragment},
      subsidyEligibility ${localizedSimpleTextFragment},
      termsUrl,
      termsLinkText ${localizedStringFragment},
      termsContent ${localizedStringFragment}
    }
  }
`)

export const EXTRAS_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "extras": extras[] {
      key,
      title ${localizedStringFragment},
      price,
      soldOut,
      when ${localizedStringFragment},
      description ${localizedSimpleTextFragment},
      images[] ${imageWithAltFragment},
      orderInstructions ${localizedSimpleTextFragment}
    }
  }
`)

// ── Staff ─────────────────────────────────────────────────────────────────────

export const STAFF_QUERY = defineQuery(`
  *[_type == "staffMember"] | order(name asc) {
    _id,
    name,
    pronouns,
    role ${localizedStringFragment},
    photo ${imageWithAltFragment},
    isCurrent
  }
`)

// ── Static pages ──────────────────────────────────────────────────────────────

export const STATIC_PAGE_QUERY = defineQuery(`
  *[_type == "staticPage" && pageKey == $pageKey][0] {
    pageKey,
    content { en, fr },
    foodSectionImage ${imageWithAltFragment},
    sightseeingSectionImage ${imageWithAltFragment},
    mapUrl,
    mapLabel ${localizedStringFragment}
  }
`)

// ── Home page ─────────────────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "homePage": homePage {
      instructorSectionTitle ${localizedStringFragment},
      instructorLinkText ${localizedStringFragment},
      featuredInstructorGroups[] {
        groupImage ${imageWithAltFragment},
        groupName,
        shortBio ${localizedSimpleTextFragment}
      },
      musicSectionTitle ${localizedStringFragment},
      musicLearnMoreText ${localizedStringFragment},
      venueSectionTitle ${localizedStringFragment},
      venueLearnMoreText ${localizedStringFragment},
      sponsorSectionTitle ${localizedStringFragment},
      featuredSponsors[]->{ _id, name, logo ${imageWithAltFragment}, link },
      sponsorNoteText ${localizedStringFragment}
    },
    "bands": bands[]->{ _id, name, biography ${localizedTextFragment}, logo ${imageWithAltFragment}, schemaDescription }
  }
`)

// ── All edition years (for generateStaticParams) ──────────────────────────────

export const ALL_EDITION_YEARS_QUERY = defineQuery(`
  *[_type == "eventEdition"] | order(year desc) { year }
`)


// ── Site settings (singleton) ─────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    facebookUrl,
    instagramUrl,
    contactEmail,
    labels {
      competitions ${localizedStringFragment},
      judges ${localizedStringFragment},
      price ${localizedStringFragment},
      format ${localizedStringFragment},
      when ${localizedStringFragment},
      soldOut ${localizedStringFragment},
      howToOrder ${localizedStringFragment},
      registration ${localizedStringFragment},
      registerNow ${localizedStringFragment},
      fullPass ${localizedStringFragment},
      partyPass ${localizedStringFragment},
      classPass ${localizedStringFragment},
      ticketsInclude ${localizedStringFragment},
      helpSomeoneAttend ${localizedStringFragment},
      eligibilityAndGuidelines ${localizedStringFragment},
      priceCalendar ${localizedStringFragment},
      termsAndConditions ${localizedStringFragment},
      tracks ${localizedStringFragment},
      levelRequirement ${localizedStringFragment},
      learnMore ${localizedStringFragment},
      instructors ${localizedStringFragment},
      music ${localizedStringFragment},
      sponsors ${localizedStringFragment},
      venue ${localizedStringFragment},
      checkOutOurVenue ${localizedStringFragment},
      viewFullMap ${localizedStringFragment},
      ourTeam ${localizedStringFragment},
      currentTeam ${localizedStringFragment},
      pastTeam ${localizedStringFragment},
      toasterIconAlt ${localizedStringFragment},
      archImageAlt ${localizedStringFragment},
      loafIconAlt ${localizedStringFragment},
    }
  }
`)
