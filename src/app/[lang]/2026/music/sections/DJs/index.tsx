import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type DJs = keyof DictionaryType['mbj2026']['musicPage']['djMusic']['djs']

const keys: DJs[] = ['felix', 'gab', 'dan']

export default function DJs({
	djMusic,
}: {
	djMusic: DictionaryType['mbj2026']['musicPage']['djMusic']
}) {
	return (
		<section className={styles.djSection}>
			<h2 className={styles.title}>{djMusic.title}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<FeatureCard
						key={key}
						name={djMusic.djs[key].name}
						image={{
							src: djMusic.djs[key].image.src,
							alt: djMusic.djs[key].image.alt,
						}}
					>
						<p className={styles.djName}>{djMusic.djs[key].djName}</p>
						<p className={styles.pronouns}>{djMusic.djs[key].pronouns}</p>
						<p className={styles.biography}>{djMusic.djs[key].biography}</p>
					</FeatureCard>
				))}
			</div>
		</section>
	)
}
