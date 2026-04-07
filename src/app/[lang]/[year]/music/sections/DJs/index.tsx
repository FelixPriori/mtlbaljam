import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { PortableText } from '@portabletext/react'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import type { SanityBandOrDj } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function DJs({
	djs,
	lang,
}: {
	djs: SanityBandOrDj[]
	lang: Locales
}) {
	return (
		<section className={styles.djSection}>
			<h2 className={styles.title}>DJs</h2>
			<div className={styles.content}>
				{djs.map((dj) => (
					<FeatureCard
						key={dj._id}
						name={dj.name ?? ''}
						image={
							dj.logo
								? {
										src: urlFor(dj.logo).width(150).height(150).url(),
										alt: localize(dj.logo.alt, lang) ?? dj.name ?? '',
									}
								: { src: '', alt: dj.name ?? '' }
						}
					>
						<p className={styles.djName}>{dj.name}</p>
						<p className={styles.pronouns}>{dj.pronouns}</p>
						<div className={styles.biography}>
							<PortableText value={localize(dj.biography, lang)?.slice(0, 1) ?? []} />
						</div>
					</FeatureCard>
				))}
			</div>
		</section>
	)
}
