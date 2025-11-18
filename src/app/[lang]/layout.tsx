import { Caveat_Brush, Josefin_Sans } from 'next/font/google'
import Main from '@/layout/Main'
import Navigation from './components/Navigation'
import { Footer, Header } from './sections'
import { Locales, locales } from '@/i18n'
import { getDictionary } from './dictionaries'
import { ReactElement } from 'react'
import '@/app/[lang]/globals.css'

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

export default async function LocaleLayout({
	children,
	params,
}: {
	children: ReactElement
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params

	const { header, copyright, iconAlts, navigation } = await getDictionary(lang)

	return (
		<html lang={lang}>
			<body
				suppressHydrationWarning
				className={`${caveatBrush.variable} ${josephinSans.variable}`}
			>
				<div className="wrapper">
					<Navigation navigation={navigation} lang={lang} />
					<Header header={header} iconAlts={iconAlts} />
					<Main>{children}</Main>
					<Footer copyright={copyright} iconAlts={iconAlts} />
				</div>
			</body>
		</html>
	)
}
