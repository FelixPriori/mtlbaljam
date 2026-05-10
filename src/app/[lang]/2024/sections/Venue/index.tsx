import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'

export default function Venue({
	venueSection,
	competitionsSection,
	iconAlts,
	lang,
}: {
	venueSection: DictionaryType['mbj2024']['homePage']['venueSection']
	competitionsSection: DictionaryType['mbj2024']['homePage']['competitionsSection']
	iconAlts: DictionaryType['iconAlts']
	lang: Locales
}) {
	return (
		<section className={styles.venueSection}>
			<div className={styles.competitions}>
				<h2>{competitionsSection.title}</h2>
				<ul>
					{competitionsSection.competitions.map(name => (
						<li key={name}>{name}</li>
					))}
				</ul>
				<p className={styles.judges}>
					<span>{competitionsSection.judgesTitle}: </span>
					{competitionsSection.judges}
				</p>
				<Link href={`/${lang}${competitionsSection.learnMore.href}`}>
					{competitionsSection.learnMore.text}
				</Link>
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
					<Link href={`/${lang}${venueSection.learnMore.href}`}>
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
