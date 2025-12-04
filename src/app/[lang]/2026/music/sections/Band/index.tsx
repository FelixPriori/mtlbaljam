import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Band({
	liveMusic,
}: {
	liveMusic: DictionaryType['mbj2026']['musicPage']['liveMusic']
}) {
	return (
		<section className={styles.bandSection}>
			<h2>{liveMusic.title}</h2>
			<div className={styles.content}>
				<div className={styles.cutout}>
					<Image
						src="/michael-cutout.png"
						alt={liveMusic.logoAlt}
						width={402}
						height={402}
					/>
				</div>
				<div className={styles.logoWrapper}>
					<Image
						src="/legacy-band.png"
						alt={liveMusic.logoAlt}
						width={270}
						height={291}
					/>
				</div>
				<div className={styles.text}>
					<h3>{liveMusic.bandName}</h3>
					{liveMusic.biography.map(line => (
						<p key={line}>{line}</p>
					))}
					<a target="_blank" rel="norefferer" href={liveMusic.link}>
						{liveMusic.link}
					</a>
				</div>
			</div>
		</section>
	)
}
