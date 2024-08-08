import { NextIntlClientProvider } from 'next-intl'
import { Caveat_Brush, Josefin_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import Main from '@/layout/Main'
import Navigation from './components/Navigation'
import { Footer, Header } from './sections'
import styles from './globals.module.scss'
import '@/app/[locale]/globals.css'

const locales = ['en', 'fr']

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
	params: { locale },
}: {
	children: React.ReactElement
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	let messages
	try {
		messages = (await import(`../../../messages/${locale}.json`)).default
	} catch (error) {
		notFound()
	}

	return (
		<html lang={locale}>
			<body
				suppressHydrationWarning
				style={styles}
				className={`${caveatBrush.variable} ${josephinSans.variable} ${styles.body}`}
			>
				<NextIntlClientProvider
					timeZone="America/Toronto"
					locale={locale}
					messages={messages}
					now={new Date()}
				>
					<div className={styles.wrapper}>
						<Navigation />
						<Header />
						<Main styles={styles.main}>{children}</Main>
						<Footer />
					</div>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
