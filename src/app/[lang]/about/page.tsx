import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Description, Staff } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}`
	if (lang === 'fr') {
		return {
			title: 'À propos | MTL BAL JAM',
			description: 'À propos de MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/about`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM logo',
						width: 512,
						height: 512,
					},
				],
				title: 'À propos | MTL BAL JAM',
				locale: 'fr',
				description: 'À propos de MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'About | MTL BAL JAM',
			description: 'About MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/about`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM logo',
						width: 512,
						height: 512,
					},
				],
				title: 'About | MTL BAL JAM',
				locale: 'en',
				description: 'About MTL BAL JAM',
			},
		}
	}
}

export default async function MbjAbout({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { aboutPage, landAcknowledgement, iconAlts } = await getDictionary(lang)

	return (
		<>
			<Description
				aboutPage={aboutPage}
				landAcknowledgement={landAcknowledgement}
				iconAlts={iconAlts}
			/>
			<Staff staffSection={aboutPage.staffSection} />
		</>
	)
}
