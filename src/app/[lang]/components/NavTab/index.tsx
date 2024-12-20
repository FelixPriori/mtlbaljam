import Image from 'next/image'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

type NavTabProps = {
	tab: string
	isOpen: boolean
	isMobile?: boolean
	setToggledTab: () => void
	children: ReactNode
	title: string
}

export default function NavTab({
	tab,
	isOpen,
	setToggledTab,
	children,
	isMobile = false,
	title,
}: NavTabProps) {
	return (
		<li className={styles.parentTabs}>
			<button
				aria-expanded={isOpen || isMobile}
				aria-controls={`menu-${tab}`}
				type="button"
				onClick={setToggledTab}
				disabled={isMobile}
				tabIndex={isOpen || isMobile ? -1 : 0}
				className={`${styles.tabButton} ${
					isOpen || isMobile ? styles.activeTab : ''
				}`}
			>
				{title}
				<Image
					src="/mbj-knife-black.png"
					alt="Toaster"
					width={1584}
					height={1584}
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
