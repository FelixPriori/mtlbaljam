import styles from '../styles.module.scss'
import Credit from '@/app/[lang]/components/Credit'
import GalleryThumbnail from '../GalleryThumbnail'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityAlbum } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

interface AlbumCardProps {
	album: SanityAlbum
	isCoverLoaded: boolean
	onCoverLoad: () => void
	priority: boolean
	onSelect: () => void
	lang: Locales
}

export default function AlbumCard({ album, isCoverLoaded, onCoverLoad, priority, onSelect, lang }: AlbumCardProps) {
	const cover = album.coverImage

	return (
		<div className={styles.albumCard}>
			<button type="button" className={styles.albumButton} onClick={onSelect}>
				{cover && (
					<GalleryThumbnail
						src={urlFor(cover).width(500).height(500).quality(60).auto('format').url()}
						alt={localize(cover.alt, lang) ?? ''}
						sizes="(max-width: 576px) 90vw, (max-width: 992px) 45vw, 300px"
						isLoaded={isCoverLoaded}
						onLoad={onCoverLoad}
						priority={priority}
						wrapperClassName={styles.albumCoverWrapper}
						imageClassName={styles.albumCover}
					/>
				)}
				<span className={styles.albumName}>{localize(album.title, lang)}</span>
			</button>
			{album.author && <Credit name={album.author} url={album.authorUrl} className={styles.albumAuthor} />}
		</div>
	)
}
