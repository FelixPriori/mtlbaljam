import Image from 'next/image'
import styles from './styles.module.scss'
import { Fragment } from 'react/jsx-runtime'
import { PortableText } from '@portabletext/react'
import TextLink from '@/app/[lang]/components/TextLink'
import SanityImage from '@/app/[lang]/components/SanityImage'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import type { SanityBandOrDj } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Band({
	bands,
	title,
	lang,
}: {
	bands: SanityBandOrDj[]
	title: { en: string | null; fr: string | null } | null
	lang: Locales
}) {
	return (
		<section className={styles.bandSection}>
			{title && <h2>{localize(title, lang)}</h2>}
			<div className={styles.content}>
				<div className={styles.cutout}>
					<Image
						src="/michael-cutout.png"
						alt="Michael Srey"
						width={402}
						height={402}
					/>
				</div>
				{bands.map((band) => (
					<Fragment key={band._id}>
						{band.logo && (
							<div className={styles.logoWrapper}>
								<SanityImage
									src={urlFor(band.logo).width(1080).height(1080).url()}
									alt={localize(band.logo.alt, lang) ?? ''}
									width={1080}
									height={1080}
								/>
							</div>
						)}
						<div className={styles.text}>
							<h3>{band.name}</h3>
							<PortableText value={localize(band.biography, lang) ?? []} />
							{band.link && (
								<TextLink href={band.link}>{band.link}</TextLink>
							)}
						</div>
					</Fragment>
				))}
			</div>
		</section>
	)
}
