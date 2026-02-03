import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Fragment } from 'react/jsx-runtime'

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
						alt={liveMusic.cutoutAlt}
						width={402}
						height={402}
					/>
				</div>
				{liveMusic.bands.map(band => (
					<Fragment key={band.bandName}>
						<div className={styles.logoWrapper}>
							<Image
								src={band.logoSrc}
								alt={band.logoAlt}
								width={1080}
								height={1080}
							/>
						</div>
						<div className={styles.text}>
							<h3>{band.bandName}</h3>
							{band.biography.map(line => (
								<p key={line}>{line}</p>
							))}
							<a target="_blank" rel="norefferer" href={band.link}>
								{band.link}
							</a>
						</div>
					</Fragment>
				))}
			</div>
		</section>
	)
}
