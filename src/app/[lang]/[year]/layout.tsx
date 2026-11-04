import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity/client'
import { sanityFetch } from '@/lib/sanity/fetch'
import { ALL_EDITION_YEARS_QUERY, EDITIONS_FOR_NAV_QUERY } from '@/lib/sanity/queries'
import type { ALL_EDITION_YEARS_QUERY_RESULT, EDITIONS_FOR_NAV_QUERY_RESULT } from '@/sanity.types'

export async function generateStaticParams() {
	const editions = await sanityClient.fetch<ALL_EDITION_YEARS_QUERY_RESULT>(ALL_EDITION_YEARS_QUERY)
	return editions
		.filter((e) => e.year != null)
		.map((e) => ({ year: String(e.year) }))
}

export default async function YearLayout({ children, params }: LayoutProps<'/[lang]/[year]'>) {
	const { year } = await params
	const editions = await sanityFetch<EDITIONS_FOR_NAV_QUERY_RESULT>(EDITIONS_FOR_NAV_QUERY)
	if (!editions?.some((e) => String(e.year) === year)) notFound()

	return <>{children}</>
}
