import styles from './styles.module.scss'
import Skeleton from '@/app/[lang]/components/Skeleton'
import SanityImage from '@/app/[lang]/components/SanityImage'
import MagnifyingGlass from '@/assets/svgs/magnifying-glass'

interface GalleryThumbnailProps {
	src: string
	alt: string
	sizes: string
	isLoaded: boolean
	onLoad: () => void
	priority?: boolean
	onClick?: () => void
	wrapperClassName: string
	imageClassName: string
}

/**
 * A clickable (or static) image tile with a skeleton shown until it loads and a
 * magnifying-glass badge signaling it's interactive. Shared by album covers and
 * per-album photo cells — renders as a `<button>` when `onClick` is passed, a
 * plain `<div>` otherwise (e.g. an album cover nested inside its own click target).
 */
export default function GalleryThumbnail({
	src,
	alt,
	sizes,
	isLoaded,
	onLoad,
	priority,
	onClick,
	wrapperClassName,
	imageClassName,
}: GalleryThumbnailProps) {
	const content = (
		<>
			{!isLoaded && <Skeleton wrapperClass={styles.skeletonOverlay} boxClass="" />}
			<SanityImage
				src={src}
				alt={alt}
				fill
				priority={priority}
				sizes={sizes}
				className={imageClassName}
				onLoad={onLoad}
			/>
			<span className={styles.magnifyIcon} aria-hidden="true">
				<MagnifyingGlass />
			</span>
		</>
	)

	if (onClick) {
		return (
			<button type="button" className={wrapperClassName} onClick={onClick}>
				{content}
			</button>
		)
	}

	return <div className={wrapperClassName}>{content}</div>
}
