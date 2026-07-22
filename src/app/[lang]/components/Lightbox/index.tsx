'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Skeleton from '@/app/[lang]/components/Skeleton'
import Credit from '@/app/[lang]/components/Credit'
import SanityImage from '@/app/[lang]/components/SanityImage'

interface LightboxPhoto {
	src: string
	alt: string
}

interface LightboxProps {
	photos: LightboxPhoto[]
	index: number
	author?: string | null
	authorUrl?: string | null
	onClose: () => void
	onNavigate: (index: number) => void
}

export default function Lightbox({ photos, index, author, authorUrl, onClose, onNavigate }: LightboxProps) {
	const dialogRef = useRef<HTMLDivElement>(null)
	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const [loaded, setLoaded] = useState(false)
	const [loadedForIndex, setLoadedForIndex] = useState(index)
	if (index !== loadedForIndex) {
		setLoadedForIndex(index)
		setLoaded(false)
	}

	useEffect(() => {
		const previousFocus = document.activeElement as HTMLElement | null
		closeButtonRef.current?.focus()

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			} else if (e.key === 'ArrowRight' && photos.length > 1) {
				onNavigate((index + 1) % photos.length)
			} else if (e.key === 'ArrowLeft' && photos.length > 1) {
				onNavigate((index - 1 + photos.length) % photos.length)
			} else if (e.key === 'Tab') {
				const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
				if (!focusable?.length) return
				const first = focusable[0]
				const last = focusable[focusable.length - 1]
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault()
					last.focus()
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault()
					first.focus()
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			previousFocus?.focus()
		}
	}, [index, photos.length, onClose, onNavigate])

	const photo = photos[index]

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={photo.alt || 'Photo'}
				className={styles.dialogWrapper}
				onClick={e => e.stopPropagation()}
			>
				<div className={styles.dialog}>
					<button
						ref={closeButtonRef}
						type="button"
						className={styles.close}
						onClick={onClose}
						aria-label="Close"
					>
						×
					</button>

					{photos.length > 1 && (
						<button
							type="button"
							className={styles.prev}
							onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
							aria-label="Previous photo"
						>
							‹
						</button>
					)}

					<div className={styles.imageWrapper}>
						{!loaded && <Skeleton wrapperClass={styles.skeletonOverlay} boxClass="" />}
						<SanityImage
							key={photo.src}
							src={photo.src}
							alt={photo.alt}
							fill
							sizes="90vw"
							className={styles.image}
							onLoad={() => setLoaded(true)}
						/>
					</div>

					{photos.length > 1 && (
						<button
							type="button"
							className={styles.next}
							onClick={() => onNavigate((index + 1) % photos.length)}
							aria-label="Next photo"
						>
							›
						</button>
					)}
				</div>

				{author && <Credit as="div" name={author} url={authorUrl} className={styles.credit} />}

				{photos.length > 1 && (
					<p className={styles.counter} aria-live="polite">
						{index + 1} / {photos.length}
					</p>
				)}
			</div>
		</div>
	)
}
