import type { RefObject } from 'react'
import styles from '../styles.module.scss'
import Credit from '@/app/[lang]/components/Credit'
import Lightbox from '@/app/[lang]/components/Lightbox'
import PhotoGrid from '../PhotoGrid'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityAlbum, SanityAlbumPhoto } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

interface AlbumDetailProps {
	album: SanityAlbum
	photos: SanityAlbumPhoto[]
	isLoadingPhotos: boolean
	visibleCount: number
	hasMore: boolean
	sentinelRef: RefObject<HTMLParagraphElement | null>
	isPhotoLoaded: (key: string) => boolean
	onPhotoLoad: (key: string) => void
	openPhoto: number | null
	onOpenPhoto: (index: number) => void
	onCloseLightbox: () => void
	onNavigateLightbox: (index: number) => void
	onBack: () => void
	lang: Locales
}

export default function AlbumDetail({
	album,
	photos,
	isLoadingPhotos,
	visibleCount,
	hasMore,
	sentinelRef,
	isPhotoLoaded,
	onPhotoLoad,
	openPhoto,
	onOpenPhoto,
	onCloseLightbox,
	onNavigateLightbox,
	onBack,
	lang,
}: AlbumDetailProps) {
	return (
		<section className={styles.gallerySection}>
			<button type="button" className={styles.backButton} onClick={onBack}>
				{lang === 'fr' ? '← Retour aux albums' : '← Back to albums'}
			</button>
			<h2>{localize(album.title, lang)}</h2>
			{album.author && (
				<Credit as="p" name={album.author} url={album.authorUrl} className={styles.albumDetailAuthor} />
			)}

			<PhotoGrid
				photos={photos}
				visibleCount={visibleCount}
				isLoading={isLoadingPhotos}
				isPhotoLoaded={isPhotoLoaded}
				onPhotoLoad={onPhotoLoad}
				onOpenPhoto={onOpenPhoto}
				lang={lang}
			/>

			{!isLoadingPhotos && hasMore && (
				<p ref={sentinelRef} className={styles.scrollSentinel}>
					{lang === 'fr' ? 'Chargement de plus de photos…' : 'Loading more photos…'}
				</p>
			)}

			{openPhoto != null && (
				<Lightbox
					photos={photos.map(photo => ({
						src: urlFor(photo).width(1600).quality(80).auto('format').url(),
						alt: localize(photo.alt, lang) ?? '',
					}))}
					index={openPhoto}
					author={album.author}
					authorUrl={album.authorUrl}
					onClose={onCloseLightbox}
					onNavigate={onNavigateLightbox}
				/>
			)}
		</section>
	)
}
