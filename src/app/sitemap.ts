import { MetadataRoute } from 'next'
import { readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

const LOCALES = ['en', 'fr'] as const
const SITE = 'https://mtlbaljam.org'
const PAGES_ROOT = join(process.cwd(), 'src/app/[lang]')

// Non-route directories to skip at any depth
const SKIP_DIRS = new Set(['components', 'sections'])

type SitemapEntry = MetadataRoute.Sitemap[number]

function findPages(dir: string, urlPath = ''): { urlPath: string; lastModified: Date }[] {
	const results: { urlPath: string; lastModified: Date }[] = []
	const pageFile = join(dir, 'page.tsx')

	if (existsSync(pageFile)) {
		results.push({ urlPath, lastModified: statSync(pageFile).mtime })
	}

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		if (SKIP_DIRS.has(entry.name)) continue
		if (entry.name.startsWith('_') || entry.name.startsWith('(')) continue

		results.push(...findPages(join(dir, entry.name), `${urlPath}/${entry.name}`))
	}

	return results
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

export default function sitemap(): MetadataRoute.Sitemap {
	const pages = findPages(PAGES_ROOT)

	return pages.flatMap(({ urlPath, lastModified }) =>
		LOCALES.map(locale => ({
			url: `${SITE}/${locale}${urlPath}`,
			lastModified,
			changeFrequency: getChangeFrequency(urlPath),
			priority: getPriority(urlPath),
		}))
	)
}
