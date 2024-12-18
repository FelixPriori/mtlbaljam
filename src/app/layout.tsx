import { ReactNode } from 'react'

export const metadata = {
	metadataBase: new URL('https://mtlbaljam.org'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return children
}
