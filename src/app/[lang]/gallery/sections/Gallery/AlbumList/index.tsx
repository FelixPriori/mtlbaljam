import styles from '../styles.module.scss'
import AlbumCard from '../AlbumCard'
import type { SanityAlbum } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

interface AlbumListProps {
	title: string
	albumsByYear: [number, SanityAlbum[]][]
	isCoverLoaded: (key: string) => boolean
	onCoverLoad: (key: string) => void
	onSelectAlbum: (id: string) => void
	lang: Locales
}

export default function AlbumList({
	title,
	albumsByYear,
	isCoverLoaded,
	onCoverLoad,
	onSelectAlbum,
	lang,
}: AlbumListProps) {
	return (
		<section className={styles.gallerySection}>
			<h2>{title}</h2>
			{albumsByYear.map(([year, yearAlbums], yearIndex) => (
				<div key={year} className={styles.yearGroup}>
					<h3>{year}</h3>
					<div className={styles.albumGrid}>
						{yearAlbums.map((album, albumIndex) => {
							const coverKey = album.coverImage?.asset?._id ?? album._id
							return (
								<AlbumCard
									key={album._id}
									album={album}
									isCoverLoaded={isCoverLoaded(coverKey)}
									onCoverLoad={() => onCoverLoad(coverKey)}
									priority={yearIndex === 0 && albumIndex === 0}
									onSelect={() => onSelectAlbum(album._id)}
									lang={lang}
								/>
							)
						})}
					</div>
				</div>
			))}
		</section>
	)
}
