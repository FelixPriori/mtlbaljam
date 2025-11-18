import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Venue({
	venueSection,
	workshopsSection,
	iconAlts,
	comingSoon,
}: {
	workshopsSection: DictionaryType['mbj2025']['homePage']['workshopsSection']
	venueSection: DictionaryType['mbj2025']['homePage']['venueSection']
	iconAlts: DictionaryType['iconAlts']
	comingSoon: DictionaryType['comingSoon']
}) {
	return (
		<section className={styles.venueSection}>
			<div className={styles.subscribeWrapper}>
				<div className={styles.registration}>
					<h2>{workshopsSection.title}</h2>
					<div className={styles.registrationContent}>
						<p>{comingSoon.title}</p>
						{/* <p>{workshopsSection.description}</p>
						<Link className={styles.link} href="/2025/tracks">
							{workshopsSection.learnMore.text}
						</Link> */}
					</div>
				</div>
			</div>
			<div className={styles.archWrapper}>
				<div className={styles.arch}>
					<Image
						src="/salmon-arch.png"
						alt={iconAlts.arch}
						width={500}
						height={500}
					/>
				</div>

				<div className={styles.text}>
					<h2>{venueSection.title}</h2>
					<p>{comingSoon.title}</p>
					{/* <Link href={venueSection.learnMore.href}>
						{venueSection.learnMore.text}
					</Link> */}
				</div>

				<IconBox
					src="/mbj-loaf-white.png"
					alt={iconAlts.loaf}
					width={50}
					height={50}
					position="topLeft"
				/>
			</div>
		</section>
	)
}
