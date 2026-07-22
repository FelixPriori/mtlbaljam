'use client'

import { useMemo, useState } from 'react'
import AlbumList from './AlbumList'
import AlbumDetail from './AlbumDetail'
import { useAlbumPhotos } from '@/app/[lang]/gallery/hooks/useAlbumPhotos'
import { useLoadedImageKeys } from '@/app/[lang]/gallery/hooks/useLoadedImageKeys'
import { useScrollReveal } from '@/app/[lang]/gallery/hooks/useScrollReveal'
import type { SanityAlbum } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Gallery({
	albums,
	title,
	lang,
}: {
	albums: SanityAlbum[]
	title: string
	lang: Locales
}) {
	const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null)
	const [openPhoto, setOpenPhoto] = useState<number | null>(null)

	const { isLoaded, markLoaded } = useLoadedImageKeys()
	const { getPhotos, isLoading, ensureLoaded } = useAlbumPhotos()

	const albumsByYear = useMemo(() => {
		const map = new Map<number, SanityAlbum[]>()
		for (const album of albums) {
			if (album.year == null) continue
			const list = map.get(album.year) ?? []
			list.push(album)
			map.set(album.year, list)
		}
		return [...map.entries()].sort((a, b) => b[0] - a[0])
	}, [albums])

	const selectedAlbum = albums.find(album => album._id === selectedAlbumId) ?? null
	const photos = selectedAlbum ? getPhotos(selectedAlbum._id) : []
	const isLoadingPhotos = selectedAlbum != null && isLoading(selectedAlbum._id)

	const { visibleCount, sentinelRef, reset, hasMore } = useScrollReveal(photos.length)

	const selectAlbum = (id: string) => {
		setSelectedAlbumId(id)
		reset()
		ensureLoaded(id)
	}

	if (selectedAlbum) {
		return (
			<AlbumDetail
				album={selectedAlbum}
				photos={photos}
				isLoadingPhotos={isLoadingPhotos}
				visibleCount={visibleCount}
				hasMore={hasMore}
				sentinelRef={sentinelRef}
				isPhotoLoaded={isLoaded}
				onPhotoLoad={markLoaded}
				openPhoto={openPhoto}
				onOpenPhoto={setOpenPhoto}
				onCloseLightbox={() => setOpenPhoto(null)}
				onNavigateLightbox={setOpenPhoto}
				onBack={() => setSelectedAlbumId(null)}
				lang={lang}
			/>
		)
	}

	return (
		<AlbumList
			title={title}
			albumsByYear={albumsByYear}
			isCoverLoaded={isLoaded}
			onCoverLoad={markLoaded}
			onSelectAlbum={selectAlbum}
			lang={lang}
		/>
	)
}
