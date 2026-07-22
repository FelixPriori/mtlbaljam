'use server'

import { sanityFetch } from '@/lib/sanity/fetch'
import { ALBUM_PHOTOS_QUERY } from '@/lib/sanity/queries'
import type { ALBUM_PHOTOS_QUERY_RESULT } from '@/sanity.types'

export async function getAlbumPhotos(albumId: string) {
	const result = await sanityFetch<ALBUM_PHOTOS_QUERY_RESULT>(ALBUM_PHOTOS_QUERY, { id: albumId })
	return result?.photos ?? []
}
