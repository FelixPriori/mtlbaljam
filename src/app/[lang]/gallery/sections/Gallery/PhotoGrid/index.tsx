import styles from '../styles.module.scss'
import Skeleton from '@/app/[lang]/components/Skeleton'
import GalleryThumbnail from '../GalleryThumbnail'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityAlbumPhoto } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

const SKELETON_COUNT = 12

interface PhotoGridProps {
	photos: SanityAlbumPhoto[]
	visibleCount: number
	isLoading: boolean
	isPhotoLoaded: (key: string) => boolean
	onPhotoLoad: (key: string) => void
	onOpenPhoto: (index: number) => void
	lang: Locales
}

export default function PhotoGrid({
	photos,
	visibleCount,
	isLoading,
	isPhotoLoaded,
	onPhotoLoad,
	onOpenPhoto,
	lang,
}: PhotoGridProps) {
	if (isLoading) {
		return (
			<div className={styles.grid}>
				{Array.from({ length: SKELETON_COUNT }).map((_, i) => (
					<div key={i} className={styles.thumbButton}>
						<Skeleton wrapperClass={styles.skeletonOverlay} boxClass="" />
					</div>
				))}
			</div>
		)
	}

	return (
		<div className={styles.grid}>
			{photos.slice(0, visibleCount).map((photo, photoIndex) => {
				const key = photo.asset?._id ?? String(photoIndex)
				return (
					<GalleryThumbnail
						key={key}
						src={urlFor(photo).width(400).height(400).quality(60).auto('format').url()}
						alt={localize(photo.alt, lang) ?? ''}
						sizes="(max-width: 576px) 45vw, (max-width: 992px) 30vw, 200px"
						isLoaded={isPhotoLoaded(key)}
						onLoad={() => onPhotoLoad(key)}
						onClick={() => onOpenPhoto(photoIndex)}
						wrapperClassName={styles.thumbButton}
						imageClassName={styles.thumb}
					/>
				)
			})}
		</div>
	)
}
