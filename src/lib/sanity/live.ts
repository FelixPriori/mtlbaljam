import { defineLive } from 'next-sanity/live'
import { sanityClient } from './client'

export const { sanityFetch: sanityFetchLive, SanityLive } = defineLive({
	client: sanityClient.withConfig({ apiVersion: '2026-02-01' }),
	serverToken: process.env.SANITY_STUDIO_API_READ_TOKEN,
	browserToken: process.env.SANITY_STUDIO_API_READ_TOKEN,
})
