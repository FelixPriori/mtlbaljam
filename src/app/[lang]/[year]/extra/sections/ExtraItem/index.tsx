import styles from './styles.module.scss'
import NoteBox from '@/app/[lang]/components/NoteBox'
import TextLink from '@/app/[lang]/components/TextLink'
import SanityImage from '@/app/[lang]/components/SanityImage'
import { PortableText } from '@portabletext/react'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import { formatCurrency } from '@/util/formatCurrency'
import type { SanityExtraItem, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function ExtraItem({
	extra,
	labels,
	lang,
	contactEmail,
}: {
	extra: SanityExtraItem
	labels: SanityLabels
	lang: Locales
	contactEmail?: string | null
}) {
	const firstImage = extra.images?.[0]
	const content = localize(extra.content, lang)

	const orderMethodLabel = (method: string) => {
		switch (method) {
			case 'whileRegistering':
				return localize(labels?.orderWhileRegistering, lang)
			case 'editRegistration':
				return localize(labels?.orderEditRegistration, lang)
			case 'atTheEvent':
				return localize(labels?.orderAtTheEvent, lang)
			case 'contactUs':
				return contactEmail ? (
					<>
						{localize(labels?.orderContactUs, lang)}{' '}
						<TextLink href={`mailto:${contactEmail}`}>{contactEmail}</TextLink>
					</>
				) : (
					localize(labels?.orderContactUs, lang)
				)
			default:
				return null
		}
	}

	return (
		<section className={styles.extraSection}>
			<h2>{localize(extra.title, lang)}</h2>
			<div className={styles.content}>
				{firstImage && (
					<div className={styles.imageWrapper}>
						<SanityImage
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
						extra.price != null && (
							<p>
								{localize(labels?.price, lang)}
								{formatCurrency(extra.price, lang)}
							</p>
						)
					)}
					{content && content.length > 0 && (
						<div className={styles.description}>
							<PortableText
								value={content}
								components={{
									marks: {
										link: ({ value, children }) => (
											<TextLink href={value?.href ?? ''}>{children}</TextLink>
										),
									},
								}}
							/>
						</div>
					)}
					{extra.orderMethods && extra.orderMethods.length > 0 && (
						<NoteBox variant="dotted" className={styles.instructions}>
							<h3>{localize(labels?.howToOrder, lang) ?? (lang === 'fr' ? 'Comment commander' : 'How to order')}</h3>
							<ul>
								{extra.orderMethods.map((method) => (
									<li key={method}>{orderMethodLabel(method)}</li>
								))}
							</ul>
						</NoteBox>
					)}
				</div>
			</div>
		</section>
	)
}
