import { ReactNode } from 'react'
import { Caveat_Brush, Josefin_Sans } from 'next/font/google'

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

export const metadata = {
	metadataBase: new URL('https://mtlbaljam.org'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning data-scroll-behavior="smooth" className={`${caveatBrush.variable} ${josephinSans.variable}`}>
			<body suppressHydrationWarning>{children}</body>
		</html>
	)
}
