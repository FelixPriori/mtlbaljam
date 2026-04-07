import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[lang]/components/IconBox'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityHomePage, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Venue({
	featuredSponsors,
	sponsorSectionTitle,
	sponsorNoteText,
	venueSectionTitle,
	venueLearnMoreText,
	labels,
	year,
	lang,
}: {
	featuredSponsors: SanityHomePage['featuredSponsors']
	sponsorSectionTitle: string | null
	sponsorNoteText: string | null
	venueSectionTitle: string | null
	venueLearnMoreText: string | null
	labels: SanityLabels
	year: string
	lang: Locales
}) {
	return (
		<section className={styles.venueSection}>
			<div className={styles.subscribeWrapper}>
				<div className={styles.registration}>
					<h2>{sponsorSectionTitle ?? localize(labels?.sponsors, lang) ?? (lang === 'fr' ? 'Partenaires' : 'Sponsors')}</h2>
					<div className={styles.sponsorsList}>
						{(featuredSponsors ?? []).map(sponsor => (
							<a
								href={sponsor.link ?? undefined}
								key={sponsor._id}
								className={styles.sponsorItem}
								target="_blank"
								rel="noopener noreferrer"
							>
								{sponsor.logo && (
									<div className={styles.sponsorLogo}>
										<Image
											src={urlFor(sponsor.logo).width(100).url()}
											alt={localize(sponsor.logo.alt, lang) ?? sponsor.name ?? ''}
											width={100}
											height={100}
										/>
									</div>
								)}
								<span className={styles.sponsorName}>{sponsor.name}</span>
							</a>
						))}
					</div>
					{sponsorNoteText && (
						<p className={styles.sponsorNote}>{sponsorNoteText}</p>
					)}
				</div>
			</div>
			<div className={styles.archWrapper}>
				<div className={styles.arch}>
					<Image
						src="/salmon-arch.png"
						alt={localize(labels?.archImageAlt, lang) ?? (lang === 'fr' ? 'Dessin d\'une arche saumon sur fond bleu' : 'Drawing of a salmon arch on blue background')}
						width={500}
						height={500}
					/>
				</div>

				<div className={styles.text}>
					<h2>{venueSectionTitle ?? localize(labels?.venue, lang) ?? (lang === 'fr' ? 'Lieu' : 'Venue')}</h2>
					<Link href={`/${lang}/${year}/venue`}>
						{venueLearnMoreText ?? localize(labels?.checkOutOurVenue, lang) ?? (lang === 'fr' ? 'Découvrez notre lieu...' : 'Check out our venue...')}
					</Link>
				</div>

				<IconBox
					src="/mbj-loaf-white.png"
					alt={localize(labels?.loafIconAlt, lang) ?? (lang === 'fr' ? 'Icône de pain' : 'Loaf of bread icon')}
					width={50}
					height={50}
					position="topLeft"
				/>
			</div>
		</section>
	)
}
