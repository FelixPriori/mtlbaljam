import Link from 'next/link'
import clsx from 'clsx'
import styles from './styles.module.scss'
import type { ReactNode } from 'react'

interface TextLinkProps {
	href: string
	children: ReactNode
	className?: string
}

export default function TextLink({ href, children, className }: TextLinkProps) {
	if (href.startsWith('/')) {
		return (
			<Link href={href} className={clsx(styles.textLink, className)}>
				{children}
			</Link>
		)
	}

	const isDirect = href.startsWith('mailto:') || href.startsWith('tel:')

	return (
		<a
			href={href}
			className={clsx(styles.textLink, className)}
			{...(!isDirect && { target: '_blank', rel: 'noopener noreferrer' })}
		>
			{children}
		</a>
	)
}
