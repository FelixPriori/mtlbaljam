'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

type NavTabProps = {
	tab: string
	isOpen: boolean
	isMobile?: boolean
	setToggledTab: (isOpen: string | null) => void
	children: ReactNode
	title?: string
}

export default function NavTab({
	tab,
	isOpen,
	setToggledTab,
	children,
	isMobile = false,
	title,
}: NavTabProps) {
	const t = useTranslations('MtlBalJam.navigation')
	return (
		<li className={styles.parentTabs}>
			<button
				aria-expanded={isOpen || isMobile}
				aria-controls={`menu-${tab}`}
				type="button"
				onClick={() => setToggledTab(isOpen ? null : tab)}
				disabled={isMobile}
				tabIndex={isOpen || isMobile ? -1 : 0}
				className={`${styles.tabButton} ${
					isOpen || isMobile ? styles.activeTab : ''
				}`}
			>
				{title ?? t(`${tab}.title`)}
				<Image
					src="/mbj-knife-black.png"
					alt="Toaster"
					width={18}
					height={18}
				/>
			</button>
			<ul
				id={`menu-${tab}`}
				aria-label={`${tab} submenu`}
				aria-hidden={!isOpen && !isMobile}
				className={`${styles.nestedTabs} ${isOpen ? styles.toggledTab : ''}`}
			>
				{children}
			</ul>
		</li>
	)
}
