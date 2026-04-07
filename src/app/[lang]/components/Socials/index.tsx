import styles from './styles.module.scss'
import Image from 'next/image'

type SocialEntry = { alt: string; href: string; logo: string }
type SocialsData = { facebook: SocialEntry; instagram: SocialEntry; email: SocialEntry }

const keys: (keyof SocialsData)[] = ['facebook', 'instagram', 'email']

export default function Socials({
	position = 'bottomLeft',
	socials,
}: {
	position?: 'bottomLeft' | 'topRight'
	socials: SocialsData
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
