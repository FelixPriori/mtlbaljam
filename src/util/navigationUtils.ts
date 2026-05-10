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

const CURRENT_YEAR = new Date().getFullYear()

const NAV_EXCLUDED_KEYS = new Set(['title', 'archiveLabel'])

export const isPastYearKey = (key: string): boolean => {
	const match = key.match(/(\d{4})/)
	return match ? parseInt(match[1]) < CURRENT_YEAR : false
}

export const getPastYearKeys = (navigation: NavigationData): string[] =>
	Object.keys(navigation)
		.filter(key => !NAV_EXCLUDED_KEYS.has(key) && isPastYearKey(key))
		.sort()
		.reverse()

export const getSortedMainTabs = (navigation: NavigationData): string[] =>
	Object.keys(navigation)
		.filter(key => !NAV_EXCLUDED_KEYS.has(key) && !isPastYearKey(key))
		.sort((a, b) => {
			if (a === 'about') return -1
			if (a === 'travel') return 1
			const year1 = a.split('202')[1]
			const year2 = b.split('202')[1]
			return year1 < year2 ? 1 : -1
		})

// When the user starts browsing, we need to figure out which navigation
// section to have expanded. This applies only when the user loads a page
// directly, coming from an external source.
export const getDefaultToggledTab = (pathname: string, navigation: NavigationData) => {
	// If the user is on the homepage, we should expand the navigation section
	// for the most recent current-year event (to make the details more discoverable).
	if (pathname === "/en" || pathname === "/fr") {
		return Object.keys(navigation)
			.filter(key => /\d{4}/.test(key) && !isPastYearKey(key))
			.sort().reverse()[0] ?? null
	}
	// Otherwise, figure out which tab should be expanded, based on the current page.
	// For year-based tabs, match by path segment so both root (/en/2025) and
	// sub-pages (/en/2025/instructors) open the correct tab.
	const pathSegments = pathname.split('/')
	for (const [key, value] of Object.entries(navigation)) {
		if (typeof value !== 'object' || !('subtabs' in value)) continue
		const yearMatch = key.match(/(\d{4})/)
		if (yearMatch && pathSegments.includes(yearMatch[1])) {
			return isPastYearKey(key) ? 'archive' : key
		}
		for (const tab of value.subtabs) {
			if (tab.href === pathname) {
				return key
			}
		}
	}
	// For any other situation, don't expand any tab by default.
	return null
}