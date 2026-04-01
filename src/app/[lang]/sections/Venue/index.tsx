import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type SponsorsSection = DictionaryType['mbj2026']['homePage']['sponsorsSection']
type SponsorKey = keyof SponsorsSection['sponsors']

const sponsorKeys: SponsorKey[] = ['swingCalendar', 'swingPlanIt', 'balboaOnTheRiver']

export default function Venue({
	venueSection,
	sponsorsSection,
	iconAlts,
}: {
	sponsorsSection: SponsorsSection
	venueSection: DictionaryType['mbj2026']['homePage']['venueSection']
	iconAlts: DictionaryType['iconAlts']
}) {
	return (
		<section className={styles.venueSection}>
			<div className={styles.subscribeWrapper}>
				<div className={styles.registration}>
					<h2>{sponsorsSection.title}</h2>
					<div className={styles.sponsorsList}>
						{sponsorKeys.map(key => (
							<a
								href={sponsorsSection.sponsors[key].link}
								key={key}
								className={styles.sponsorItem}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className={styles.sponsorLogo}>
									<Image
										src={sponsorsSection.sponsors[key].image.src}
										alt={sponsorsSection.sponsors[key].image.alt}
										width={100}
										height={100}
									/>
								</div>
								<span className={styles.sponsorName}>
									{sponsorsSection.sponsors[key].name}
								</span>
							</a>
						))}
					</div>
					<p className={styles.sponsorNote}>
						{sponsorsSection.notes.text}
						<a href={sponsorsSection.notes.link.link}>
							{sponsorsSection.notes.link.text}
						</a>
					</p>
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
					{/* <p>{comingSoon.title}</p> */}
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
