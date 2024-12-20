import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Venue({
	venueSection,
	scheduleSection,
	iconAlts,
}: {
	scheduleSection: DictionaryType['homePage']['scheduleSection']
	venueSection: DictionaryType['homePage']['venueSection']
	iconAlts: DictionaryType['iconAlts']
}) {
	return (
		<section className={styles.venueSection}>
			<div className={styles.subscribeWrapper}>
				<div className={styles.registration}>
					<h2>{scheduleSection.title}</h2>
					<div className={styles.registrationContent}>
						<p>
							{scheduleSection.description}
							<Link href="/schedule">{scheduleSection.linkText}</Link>
						</p>
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
					<Link href={venueSection.learnMore.href}>
						{venueSection.learnMore.text}
					</Link>
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
