import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import Socials from '@/app/[lang]/components/Socials'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function MusicSection({
	musicSection,
	iconAlts,
	socials,
}: {
	musicSection: DictionaryType['homePage']['musicSection']
	iconAlts: DictionaryType['iconAlts']
	socials: DictionaryType['socials']
}) {
	return (
		<section className={styles.bandSection}>
			<div className={styles.bandName}>
				<div className={styles.bandImageWrapper}>
					<Image
						src="/legacy-band.png"
						alt="Legacy Band logo"
						width={270}
						height={291}
					/>
				</div>
				<div className={styles.text}>
					<h2>{musicSection.title}</h2>
					<h3>{musicSection.bandName}</h3>
					<p>{musicSection.description}</p>
					<Link href={musicSection.learnMore.href}>
						{musicSection.learnMore.text}
					</Link>
				</div>
			</div>

			<div className={styles.socialsWrapper}>
				<IconBox
					src="/mbj-toaster-black.png"
					alt={iconAlts.toaster}
					width={50}
					height={50}
					position="topRight"
				/>
				<Socials socials={socials} />
			</div>
		</section>
	)
}
