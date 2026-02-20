import { NavigationData } from '../app/[lang]/components/Navigation'

export const checkIsCurrent = (page: string, current: string) => {
	if (current === '/' && page === 'home') {
		return true
	} else if (page === current) {
		return true
	}
	return false
}

export const getSlugFromPathname = (pathname: string) => {
	const pathnameArray = pathname.split('/')
	const slug = pathnameArray[pathnameArray.length - 1]

	switch (slug) {
		case 'fr':
			return '/'
		case 'en':
			return '/'
		default:
			return `/${slug}`
	}
}

export const getPageNameFromSlug = (pathname: string) => {
	const slug = getSlugFromPathname(pathname)
	return slug.slice(1)
}

// When the user starts browsing, we need to figure out which navigation
// section to have expanded. This applies only when the user loads a page
// directly, coming from an external source.
export const getDefaultToggledTab = (pathname: string, navigation: NavigationData) => {
	// If the user is on the homepage, we should expand the navigation section
	// for the most recent event (to make the details more discoverable).
	if (pathname === "/en" || pathname === "/fr") {
		return Object.keys(navigation).filter(
			key => /\d{4}/.test(key)
		).sort().reverse()[0] ?? null
	}
	// Otherwise, figure out which tab should be expanded, based on the current
	// page.
	for (const [key, value] of Object.entries(navigation)) {
		if (typeof value === 'object' && 'subtabs' in value) {
			for (const tab of value.subtabs) {
				if (tab.href == pathname) {
					return key
				}
			}
		}
	}
	// For any other situation, don't expand any tab by default.
	return null;
}