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
	musicSection: DictionaryType['mbj2026']['homePage']['musicSection']
	iconAlts: DictionaryType['iconAlts']
	socials: DictionaryType['socials']
}) {
	return (
		<section className={styles.bandSection}>
			<div className={styles.bandsArea}>
				<h2>{musicSection.title}</h2>
				<div className={styles.bands}>
					<div className={styles.band}>
						<div className={styles.bandImageWrapper}>
							<Image
								src="/legacy-band.png"
								alt="Legacy Band logo"
								width={270}
								height={291}
							/>
						</div>
						<div className={styles.bandText}>
							<h3>{musicSection.bandName}</h3>
							<p>{musicSection.description}</p>
						</div>
					</div>
					<div className={styles.band}>
						<div className={styles.bandImageWrapper}>
							<Image
								src="/michael-johancsik.webp"
								alt="Michael Johancsik Swing Orchestra logo"
								fill
								sizes="112px"
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div className={styles.bandText}>
							<h3>{musicSection.secondBandName}</h3>
							<p>{musicSection.secondDescription}</p>
						</div>
					</div>
				</div>
				<Link href={musicSection.learnMore.href}>
					{musicSection.learnMore.text}
				</Link>
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
