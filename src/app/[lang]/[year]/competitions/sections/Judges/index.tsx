import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityJudge, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Judges({
	judges,
	labels,
	lang,
}: {
	judges: SanityJudge[]
	labels: SanityLabels
	lang: Locales
}) {
	if (!judges.length) return null
	return (
		<section className={styles.judgesSection}>
			<h2 className={styles.title}>{localize(labels?.judges, lang) ?? (lang === 'fr' ? 'Juges' : 'Judges')}</h2>
			<div className={styles.content}>
				{judges.map((judge) => (
					<FeatureCard
						key={judge._id}
						name={judge.name ?? ''}
						image={
							judge.image
								? {
										src: urlFor(judge.image).width(150).height(150).url(),
										alt: localize(judge.image.alt, lang) ?? judge.name ?? '',
									}
								: { src: '', alt: judge.name ?? '' }
						}
					/>
				))}
			</div>
		</section>
	)
}
