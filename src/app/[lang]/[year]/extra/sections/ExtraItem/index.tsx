import Image from 'next/image'
import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import type { SanityExtraItem, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function ExtraItem({
	extra,
	labels,
	lang,
}: {
	extra: SanityExtraItem
	labels: SanityLabels
	lang: Locales
}) {
	const firstImage = extra.images?.[0]
	const description = localize(extra.description, lang)
	const instructions = localize(extra.orderInstructions, lang)

	return (
		<section className={styles.extraSection}>
			<h2>{localize(extra.title, lang)}</h2>
			<div className={styles.content}>
				{firstImage && (
					<div className={styles.imageWrapper}>
						<Image
							src={urlFor(firstImage).width(1000).height(1000).url()}
							width={1000}
							height={1000}
							alt={localize(firstImage.alt, lang) ?? ''}
						/>
					</div>
				)}
				<div className={styles.text}>
					{extra.soldOut ? (
						<p className={styles.soldOut}>{localize(labels?.soldOut, lang) ?? (lang === 'fr' ? 'Épuisé' : 'Sold out')}</p>
					) : (
						extra.price && <p>{extra.price}</p>
					)}
					{extra.when && <p className={styles.when}>{localize(extra.when, lang)}</p>}
					{description && (
						<div className={styles.description}>
							{description.map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					)}
					{instructions && instructions.length > 0 && (
						<div className={styles.instructions}>
							<h3>{localize(labels?.howToOrder, lang) ?? (lang === 'fr' ? 'Comment commander' : 'How to order')}</h3>
							<PortableText value={instructions} />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
