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
