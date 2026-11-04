import { MetadataRoute } from 'next'
import { readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import { sanityClient } from '@/lib/sanity/client'
import { EDITIONS_FOR_NAV_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { EDITIONS_FOR_NAV_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { getHomeYear, isEditionListed } from '@/lib/editions'

const LOCALES = ['en', 'fr'] as const
const SITE = 'https://mtlbaljam.org'
const PAGES_ROOT = join(process.cwd(), 'src/app/[lang]')
const YEAR_ROOT = join(PAGES_ROOT, '[year]')

const SKIP_DIRS = new Set(['components', 'sections'])

type SitemapEntry = MetadataRoute.Sitemap[number]

function findStaticPages(dir: string, urlPath = ''): { urlPath: string; lastModified: Date }[] {
	const results: { urlPath: string; lastModified: Date }[] = []
	const pageFile = join(dir, 'page.tsx')

	if (existsSync(pageFile)) {
		results.push({ urlPath, lastModified: statSync(pageFile).mtime })
	}

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		if (SKIP_DIRS.has(entry.name)) continue
		if (entry.name.startsWith('_') || entry.name.startsWith('(')) continue
		if (entry.name.startsWith('[')) continue // dynamic segments handled separately

		results.push(...findStaticPages(join(dir, entry.name), `${urlPath}/${entry.name}`))
	}

	return results
}

function findYearSubpages(): string[] {
	const subpages: string[] = [''] // '' = the year home page itself
	for (const entry of readdirSync(YEAR_ROOT, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		if (SKIP_DIRS.has(entry.name)) continue
		if (entry.name.startsWith('_') || entry.name.startsWith('(') || entry.name.startsWith('[')) continue
		if (existsSync(join(YEAR_ROOT, entry.name, 'page.tsx'))) {
			subpages.push(`/${entry.name}`)
		}
	}
	return subpages
}

const yearOf = (urlPath: string) => {
	const match = urlPath.match(/^\/(\d{4})(\/|$)/)
	return match ? Number(match[1]) : null
}

function getPriority(urlPath: string, homeYear: number | null): number {
	if (urlPath === '') return 1
	const year = yearOf(urlPath)
	if (year == null || homeYear == null || year >= homeYear) return 0.7
	return homeYear - year === 1 ? 0.5 : 0.3
}

function getChangeFrequency(urlPath: string, homeYear: number | null): SitemapEntry['changeFrequency'] {
	if (urlPath === '') return 'weekly'
	const year = yearOf(urlPath)
	if (year == null) return 'monthly'
	if (homeYear != null && year < homeYear) return 'yearly'
	return 'weekly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages = findStaticPages(PAGES_ROOT)
	const yearSubpages = findYearSubpages()

	const [editions, siteSettings] = await Promise.all([
		sanityClient.fetch<EDITIONS_FOR_NAV_QUERY_RESULT>(EDITIONS_FOR_NAV_QUERY),
		sanityClient.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const homeYear = getHomeYear(editions, siteSettings?.currentEditionYear)
	const years = editions
		.filter(isEditionListed)
		.map(e => e.year)
		.filter((y): y is number => y != null)

	const yearPages = years.flatMap(year =>
		yearSubpages.map(sub => ({
			urlPath: `/${year}${sub}`,
			lastModified: new Date(),
		}))
	)

	const allPages = [...staticPages, ...yearPages]

	return allPages.flatMap(({ urlPath, lastModified }) =>
		LOCALES.map(locale => ({
			url: `${SITE}/${locale}${urlPath}`,
			lastModified,
			changeFrequency: getChangeFrequency(urlPath, homeYear),
			priority: getPriority(urlPath, homeYear),
		}))
	)
}
