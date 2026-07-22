'use client'

import { useState } from 'react'
import { getAlbumPhotos } from '@/app/[lang]/gallery/actions'
import type { SanityAlbumPhoto } from '@/lib/sanity/queryTypes'

/** Fetches an album's photos on demand (via a Server Action) and caches them per album id. */
export function useAlbumPhotos() {
	const [photosByAlbum, setPhotosByAlbum] = useState<Record<string, SanityAlbumPhoto[]>>({})
	const [loadingAlbumId, setLoadingAlbumId] = useState<string | null>(null)

	const ensureLoaded = (albumId: string) => {
		if (albumId in photosByAlbum) return
		setLoadingAlbumId(albumId)
		getAlbumPhotos(albumId).then(photos => {
			setPhotosByAlbum(prev => ({ ...prev, [albumId]: photos }))
			setLoadingAlbumId(prev => (prev === albumId ? null : prev))
		})
	}

	const getPhotos = (albumId: string) => photosByAlbum[albumId] ?? []
	const isLoading = (albumId: string) => loadingAlbumId === albumId && getPhotos(albumId).length === 0

	return { getPhotos, isLoading, ensureLoaded }
}
