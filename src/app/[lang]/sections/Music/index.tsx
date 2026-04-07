import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import IconBox from '@/app/[lang]/components/IconBox'
import Socials from '@/app/[lang]/components/Socials'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { HOME_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import type { Locales } from '@/i18n'

export default function MusicSection({
	bands,
	sectionTitle,
	learnMoreText,
	year,
	lang,
	siteSettings,
}: {
	bands: NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>['bands']>
	sectionTitle: string | null
	learnMoreText: string | null
	year: string
	lang: Locales
	siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
	const displayBands = bands.slice(0, 2)

	return (
		<section className={styles.bandSection}>
			<div className={styles.bandsArea}>
				<h2>{sectionTitle ?? localize(siteSettings?.labels?.music, lang) ?? (lang === 'fr' ? 'Musique' : 'Music')}</h2>
				<div className={styles.bands}>
					{displayBands.map((band) => (
						<div key={band._id} className={styles.band}>
							<div className={styles.bandImageWrapper}>
								{band.logo ? (
									<Image
										src={urlFor(band.logo).width(270).url()}
										alt={localize(band.logo.alt, lang) ?? band.name ?? ''}
										width={270}
										height={291}
									/>
								) : null}
							</div>
							<div className={styles.bandText}>
								<h3>{band.name}</h3>
								<PortableText value={localize(band.biography, lang)?.slice(0, 1) ?? []} />
							</div>
						</div>
					))}
				</div>
				<Link href={`/${lang}/${year}/music`}>
					{learnMoreText ?? localize(siteSettings?.labels?.learnMore, lang) ?? (lang === 'fr' ? 'En savoir plus...' : 'Learn more...')}
				</Link>
			</div>

			<div className={styles.socialsWrapper}>
				<IconBox
					src="/mbj-toaster-black.png"
					alt={localize(siteSettings?.labels?.toasterIconAlt, lang) ?? (lang === 'fr' ? 'Icône de grille-pain' : 'Toaster icon')}
					width={50}
					height={50}
					position="topRight"
				/>
				<Socials socials={{
					facebook: {
						alt: 'Facebook',
						href: siteSettings?.facebookUrl ?? 'https://www.facebook.com/MTLBALJAM',
						logo: '/facebook-white.png',
					},
					instagram: {
						alt: 'Instagram',
						href: siteSettings?.instagramUrl ?? 'https://www.instagram.com/MTLBALJAM/',
						logo: '/instagram-white.png',
					},
					email: {
						alt: 'Email',
						href: `mailto:${siteSettings?.contactEmail ?? 'info@campusbalboa.org'}`,
						logo: '/email-white.png',
					},
				}} />
			</div>
		</section>
	)
}
