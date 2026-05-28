import type { NavigationConfig } from '@/types/navigation'

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

export const getDefaultToggledTab = (pathname: string, config: NavigationConfig): string | null => {
	if (pathname === '/en' || pathname === '/fr') {
		return config.mainSections.find(s => s.key !== 'about' && s.key !== 'travel')?.key ?? null
	}
	const pathSegments = pathname.split('/')

	for (const entry of config.archiveEntries) {
		const yearNum = entry.href.split('/').pop()
		if (yearNum && pathSegments.includes(yearNum)) return 'archive'
	}

	for (const section of config.mainSections) {
		const yearMatch = section.key.match(/(\d{4})/)
		if (yearMatch && pathSegments.includes(yearMatch[1])) return section.key
		for (const subtab of section.subtabs) {
			if (subtab.href === pathname) return section.key
		}
	}

	return null
}
