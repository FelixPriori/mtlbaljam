import styles from './styles.module.scss'
import Image from 'next/image'
import { DictionaryType } from '../../dictionaries'

type SocialMedias = keyof DictionaryType['socials']

const keys: SocialMedias[] = ['facebook', 'instagram', 'email']

export default function Socials({
	position = 'bottomLeft',
	socials,
}: {
	position?: 'bottomLeft' | 'topRight'
	socials: DictionaryType['socials']
}) {
	return (
		<ul className={`${styles.socials} ${styles[position]}`}>
			{keys.map(key => (
				<li key={key}>
					<a href={socials[key].href} target="_blank" rel="noreferrer">
						<span className="sr-only">{socials[key].alt}</span>
						<Image
							src={socials[key].logo}
							alt={socials[key].alt}
							width={2084}
							height={2084}
						/>
					</a>
				</li>
			))}
		</ul>
	)
}
