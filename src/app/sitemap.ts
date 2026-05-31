import { MetadataRoute } from 'next'
import { readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import { sanityClient } from '@/lib/sanity/client'
import { ALL_EDITION_YEARS_QUERY } from '@/lib/sanity/queries'
import type { ALL_EDITION_YEARS_QUERY_RESULT } from '@/sanity.types'

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

function getPriority(urlPath: string): number {
	if (urlPath === '') return 1
	if (urlPath.includes('/2026')) return 0.7
	if (urlPath.includes('/2025')) return 0.5
	if (urlPath.includes('/2024')) return 0.3
	return 0.7
}

function getChangeFrequency(urlPath: string): SitemapEntry['changeFrequency'] {
	if (urlPath === '' || urlPath.includes('/2026')) return 'weekly'
	if (urlPath.includes('/2024') || urlPath.includes('/2025')) return 'yearly'
	return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages = findStaticPages(PAGES_ROOT)
	const yearSubpages = findYearSubpages()

	const editions = await sanityClient.fetch<ALL_EDITION_YEARS_QUERY_RESULT>(ALL_EDITION_YEARS_QUERY)
	const years = editions.map(e => e.year).filter((y): y is number => y != null)

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
			changeFrequency: getChangeFrequency(urlPath),
			priority: getPriority(urlPath),
		}))
	)
}
