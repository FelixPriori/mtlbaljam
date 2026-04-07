import { sanityClient } from '@/lib/sanity/client'
import { ALL_EDITION_YEARS_QUERY } from '@/lib/sanity/queries'
import type { ALL_EDITION_YEARS_QUERY_RESULT } from '@/sanity.types'
import { ReactNode } from 'react'

// Years with their own static route folders (JSON-based, not Sanity-backed)
const STATIC_YEAR_FOLDERS = new Set([2024, 2025])

export async function generateStaticParams() {
	const editions = await sanityClient.fetch<ALL_EDITION_YEARS_QUERY_RESULT>(ALL_EDITION_YEARS_QUERY)
	return editions
		.filter((e) => e.year != null && !STATIC_YEAR_FOLDERS.has(e.year))
		.map((e) => ({ year: String(e.year) }))
}

export default function YearLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
