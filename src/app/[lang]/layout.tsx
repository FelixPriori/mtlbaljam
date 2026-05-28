import { Caveat_Brush, Josefin_Sans } from 'next/font/google'
import Main from '@/layout/Main'
import Navigation from './components/Navigation'
import { Footer, Header } from './sections'
import { Locales, locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { EDITIONS_FOR_NAV_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type {
	EDITIONS_FOR_NAV_QUERY_RESULT,
	SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity.types'
import { localize } from '@/lib/sanity/localize'
import { SanityLive } from '@/lib/sanity/live'
import '@/app/[lang]/globals.css'
import type { NavigationConfig, NavSection } from '@/types/navigation'

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

const caveatBrush = Caveat_Brush({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	variable: '--font-caveat-brush',
})

const josephinSans = Josefin_Sans({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-josephin-sans',
})

function buildNavigationConfig(
	editions: EDITIONS_FOR_NAV_QUERY_RESULT,
	siteSettings: SITE_SETTINGS_QUERY_RESULT,
	lang: Locales,
): NavigationConfig {
	const currentYear = new Date().getFullYear()

	const aboutSection: NavSection =
		lang === 'fr'
			? {
					key: 'about',
					title: 'À propos',
					subtabs: [
						{ text: 'Vision et équipe', href: '/fr/about' },
						{ text: 'Code de conduite', href: '/fr/code-of-conduct' },
						{ text: 'Bénévolat', href: '/fr/volunteering' },
					],
				}
			: {
					key: 'about',
					title: 'About',
					subtabs: [
						{ text: 'Team and vision', href: '/en/about' },
						{ text: 'Code of conduct', href: '/en/code-of-conduct' },
						{ text: 'Volunteering', href: '/en/volunteering' },
					],
				}

	const travelSection: NavSection =
		lang === 'fr'
			? {
					key: 'travel',
					title: 'Voyage',
					subtabs: [
						{ text: 'Visiter Montréal / Tiohtià:ke', href: '/fr/visiting' },
						{ text: 'Info voyage', href: '/fr/travel' },
					],
				}
			: {
					key: 'travel',
					title: 'Travel',
					subtabs: [
						{ text: 'Visiting Montréal / Tiohtià:ke', href: '/en/visiting' },
						{ text: 'Traveling information', href: '/en/travel' },
					],
				}

	const mainEditions: NavSection[] = editions
		.filter(e => e.year != null && e.year >= currentYear)
		.map(e => ({
			key: `mbj${e.year}`,
			title: `MTL BAL JAM ${e.year}`,
			subtabs: (e.navPages ?? []).map(p => ({
				text: localize(p.label, lang) ?? p.pageSlug ?? '',
				href: `/${lang}/${e.year}/${p.pageSlug}`,
			})),
		}))

	const archiveEntries = editions
		.filter(e => e.year != null && e.year < currentYear)
		.map(e => ({
			key: `mbj${e.year}`,
			title: `MTL BAL JAM ${e.year}`,
			href: `/${lang}/${e.year}`,
		}))

	return {
		menuTitle: 'Menu',
		archiveLabel:
			localize(siteSettings?.labels?.archiveNavLabel, lang) ??
			(lang === 'fr' ? 'Archives' : 'Archive'),
		mainSections: [aboutSection, ...mainEditions, travelSection],
		archiveEntries,
	}
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<'/[lang]'>) {
	const lang = (await params).lang as Locales

	const [editions, siteSettings] = await Promise.all([
		sanityFetch<EDITIONS_FOR_NAV_QUERY_RESULT>(EDITIONS_FOR_NAV_QUERY),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])

	const navigationConfig = buildNavigationConfig(editions ?? [], siteSettings, lang)

	const datesMap: Record<number, string> = {}
	for (const edition of editions ?? []) {
		const date = localize(edition.displayDate, lang)
		if (edition.year != null && date) datesMap[edition.year] = date
	}

	const registrationUrl = siteSettings?.registrationUrl ?? ''
	const registerNow =
		localize(siteSettings?.labels?.registerNow, lang) ??
		(lang === 'fr' ? 'INSCRIVEZ-VOUS !' : 'REGISTER NOW!')
	const logoAlt =
		localize(siteSettings?.labels?.mbjLogoAlt, lang) ?? 'MTL BAL JAM Logo'
	const copyright =
		localize(siteSettings?.copyright, lang) ??
		(lang === 'fr' ? '© Campus Balboa, 2026' : '©2026 Campus Balboa')
	const knifeAlt =
		localize(siteSettings?.labels?.knifeIconAlt, lang) ?? 'Butterknife icon'

	return (
		<html lang={lang}>
			<body
				suppressHydrationWarning
				className={`${caveatBrush.variable} ${josephinSans.variable}`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							name: 'MTL BAL JAM',
							url: 'https://mtlbaljam.org',
						}),
					}}
				/>
				<div className="wrapper">
					<Navigation config={navigationConfig} lang={lang} />
					<Header
						datesMap={datesMap}
						registrationUrl={registrationUrl}
						registerNow={registerNow}
						logoAlt={logoAlt}
						lang={lang}
					/>
					<Main>{children}</Main>
					<Footer copyright={copyright} knifeAlt={knifeAlt} />
				</div>
				<SanityLive />
			</body>
		</html>
	)
}
