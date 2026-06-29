import { sanityClient } from '@/lib/sanity/client'
import { ALL_EDITION_YEARS_QUERY } from '@/lib/sanity/queries'
import type { ALL_EDITION_YEARS_QUERY_RESULT } from '@/sanity.types'
import { ReactNode } from 'react'

export async function generateStaticParams() {
	const editions = await sanityClient.fetch<ALL_EDITION_YEARS_QUERY_RESULT>(ALL_EDITION_YEARS_QUERY)
	return editions
		.filter((e) => e.year != null)
		.map((e) => ({ year: String(e.year) }))
}

export default function YearLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
