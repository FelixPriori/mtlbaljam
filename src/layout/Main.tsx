import { ReactNode } from 'react'

export default function Main({
	children,
	styles,
}: {
	children: ReactNode
	styles?: any
}) {
	return <main className={styles}>{children}</main>
}
