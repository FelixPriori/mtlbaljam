// Primitives
import { localizedString, localizedSimpleText, localizedText } from './primitives/localizedString'
import { imageWithAlt } from './primitives/imageWithAlt'
import { geoCoordinates } from './primitives/geoCoordinates'

// Embedded objects
import { scheduleEvent } from './objects/scheduleEvent'
import { competition } from './objects/competition'
import { extraItem } from './objects/extraItem'
import { priceTier } from './objects/priceTier'
import { registrationPageContent } from './objects/registrationPageContent'
import { trackItem, trackClass } from './objects/trackItem'
import { instructorGroup } from './objects/instructorGroup'
import { homePageContent } from './objects/homePageContent'

// Documents
import { instructor } from './documents/instructor'
import { judge } from './documents/judge'
import { sponsor } from './documents/sponsor'
import { bandOrDj } from './documents/bandOrDj'
import { venue } from './documents/venue'
import { staffMember } from './documents/staffMember'
import { staticPage } from './documents/staticPage'
import { eventEdition } from './documents/eventEdition'
import { siteSettings } from './documents/siteSettings'

export const schemaTypes = [
  // Primitives first (referenced by everything else)
  localizedString,
  localizedSimpleText,
  localizedText,
  imageWithAlt,
  geoCoordinates,

  // Embedded objects
  scheduleEvent,
  competition,
  extraItem,
  priceTier,
  registrationPageContent,
  trackClass,
  trackItem,
  instructorGroup,
  homePageContent,

  // Documents
  instructor,
  judge,
  sponsor,
  bandOrDj,
  venue,
  staffMember,
  staticPage,
  eventEdition,
  siteSettings,
]
