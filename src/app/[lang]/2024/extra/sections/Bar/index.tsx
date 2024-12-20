import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Bar({
	bar,
}: {
	bar: DictionaryType['mbj2024']['extrasPage']['bar']
}) {
	return (
		<section className={styles.barSection}>
			<h2>{bar.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={bar.imageSrc}
						width={1080}
						height={1080}
						alt={bar.imageAlt}
					/>
				</div>
				<div className={styles.text}>
					<p className={styles.when}>{bar.when}</p>
					<div className={styles.description}>
						{bar.description.map(line => (
							<p key={line}>{line}</p>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
