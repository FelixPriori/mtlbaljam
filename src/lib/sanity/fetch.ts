import 'server-only'
import { cache } from 'react'
import type { QueryParams } from 'next-sanity'
import { sanityFetchLive } from './live'

/**
 * Fetch data from Sanity using the Live Content API.
 * Cache is automatically invalidated when content is published in the studio.
 * The revalidate parameter is kept for API compatibility but is ignored —
 * defineLive handles revalidation automatically.
 *
 * Wrapped in React's `cache()` so that multiple components calling the same
 * query with the same (or omitted) params during a single request — e.g. a
 * layout and a page both fetching SITE_SETTINGS_QUERY — share one underlying
 * fetch instead of each hitting Sanity separately.
 */
export const sanityFetch = cache(async function sanityFetch<T>(
	query: string,
	params: QueryParams = {},
	_revalidate?: number | false,
): Promise<T> {
	const { data } = await sanityFetchLive({ query, params })
	return data as T
})
