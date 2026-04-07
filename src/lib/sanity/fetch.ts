import 'server-only'
import type { QueryParams } from 'next-sanity'
import { sanityFetchLive } from './live'

/**
 * Fetch data from Sanity using the Live Content API.
 * Cache is automatically invalidated when content is published in the studio.
 * The revalidate parameter is kept for API compatibility but is ignored —
 * defineLive handles revalidation automatically.
 */
export async function sanityFetch<T>(
	query: string,
	params: QueryParams = {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_revalidate?: number | false,
): Promise<T> {
	const { data } = await sanityFetchLive({ query, params })
	return data as T
}
