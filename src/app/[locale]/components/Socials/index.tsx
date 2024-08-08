'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import Image from 'next/image'

const keys = ['facebook', 'instagram', 'email'] as const

export default function Socials({
	position = 'bottomLeft',
}: {
	position?: 'bottomLeft' | 'topRight'
}) {
	const t = useTranslations('MtlBalJam.socials')

	return (
		<ul className={`${styles.socials} ${styles[position]}`}>
			{keys.map(key => (
				<li key={key}>
					<a href={t(`${key}.href`)} target="_blank" rel="noreferrer">
						<span className="sr-only">{t(`${key}.alt`)}</span>
						<Image
							src={t(`${key}.logo`)}
							alt={t(`${key}.alt`)}
							width={50}
							height={50}
						/>
					</a>
				</li>
			))}
		</ul>
	)
}
