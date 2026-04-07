import Image from 'next/image'
import styles from './styles.module.scss'
import ExternalLink from '@/assets/svgs/external-link'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { PortableTextBlock } from '@portabletext/types'
import type { STATIC_PAGE_QUERY_RESULT } from '@/sanity.types'
import type { SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

type ImageField = NonNullable<NonNullable<STATIC_PAGE_QUERY_RESULT>['foodSectionImage']>

export default function VisitingContent({
	blocks,
	foodImage,
	sightseeingImage,
	mapUrl,
	mapLabel,
	labels,
	lang,
}: {
	blocks: PortableTextBlock[]
	foodImage: ImageField | null
	sightseeingImage: ImageField | null
	mapUrl: string | null
	mapLabel: string | null
	labels: SanityLabels
	lang: Locales
}) {
	// Split blocks at the first h2 — that's the sightseeing section heading
	const splitIdx = blocks.findIndex(
		(b) => (b as { style?: string }).style === 'h2',
	)
	const foodBlocks = splitIdx === -1 ? blocks : blocks.slice(0, splitIdx)
	const sightseeingBlocks = splitIdx === -1 ? [] : blocks.slice(splitIdx)

	return (
		<section className={styles.visitingContent}>
			<div className={styles.blogCollection}>
				{/* Food & Drinks */}
				<div className={styles.blogSection}>
					{foodImage && (
						<div className={styles.image}>
							<Image
								src={urlFor(foodImage).width(1080).height(1080).url()}
								alt={localize(foodImage.alt, lang) ?? ''}
								width={1080}
								height={1080}
							/>
						</div>
					)}
					<div className={styles.blogDetails}>
						{mapUrl && (
							<div className={styles.buttonContainer}>
								<a
									className={styles.button}
									href={mapUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{mapLabel ?? localize(labels?.viewFullMap, lang) ?? (lang === 'fr' ? 'Voir la carte complète' : 'View full map')}
									<ExternalLink />
								</a>
							</div>
						)}
						<PortableText
							value={foodBlocks}
							components={{
								marks: {
									link: ({ value, children }) => (
										<a href={value?.href} target="_blank" rel="noopener noreferrer">
											{children}
										</a>
									),
								},
							}}
						/>
					</div>
				</div>

				{/* Sightseeing */}
				{sightseeingBlocks.length > 0 && (
					<div className={`${styles.blogSection} ${styles.reversed}`}>
						{sightseeingImage && (
							<div className={styles.image}>
								<Image
									src={urlFor(sightseeingImage).width(1080).height(1080).url()}
									alt={localize(sightseeingImage.alt, lang) ?? ''}
									width={1080}
									height={1080}
								/>
							</div>
						)}
						<div className={styles.blogDetails}>
							<PortableText
								value={sightseeingBlocks}
								components={{
									marks: {
										link: ({ value, children }) => (
											<a href={value?.href} target="_blank" rel="noopener noreferrer">
												{children}
											</a>
										),
									},
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
