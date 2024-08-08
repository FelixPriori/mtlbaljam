'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import NavTab from '../NavTab'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import LanguageSwitcher from '../LanguageSwitcher'
import EventTab from '../EventTab'
import { checkIsCurrent, getSlugFromPathname } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'

type MobileNavigationProps = {
	pageTabs: any
}

export default function MobileNavigation({ pageTabs }: MobileNavigationProps) {
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslations('MtlBalJam.navigation')
	const toggle = () => setIsOpen(!isOpen)
	const pathname = usePathname()
	const slug = getSlugFromPathname(pathname)

	return (
		<>
			<div
				className={`${styles.mbjButtonContainer} ${
					isOpen ? styles.active : ''
				}`}
				onClick={toggle}
			>
				<span className={styles.top}></span>
				<span className={styles.middle}></span>
				<span className={styles.bottom}></span>
			</div>
			<div className={`${styles.mbjOverlay} ${isOpen ? styles.open : ''}`}>
				<nav className={styles.overlayMenu}>
					<h2 className={styles.title}>{t('title')}</h2>

					<ul className={styles.navTabs}>
						{Object.keys(pageTabs).map((tab: string) => {
							const isTabOpen = tab === toggledTab
							if (tab === 'event') {
								return Object.keys(pageTabs[tab]).map((subTab: string) => {
									return (
										<EventTab
											key={subTab}
											tab={subTab}
											parentTab={tab}
											current={slug}
											pageTabs={pageTabs[tab][subTab]}
											isMobile
										/>
									)
								})
							}
							return (
								<NavTab
									key={tab}
									tab={tab}
									isOpen={true}
									setToggledTab={setToggledTab}
									isMobile
								>
									{pageTabs[tab].map((page: any) => (
										<NavLink
											key={page}
											hidden={!isTabOpen}
											isCurrent={checkIsCurrent(page, slug)}
											mobileToggle={toggle}
											href={t(`${tab}.subtabs.${page}.href`)}
											text={t(`${tab}.subtabs.${page}.text`)}
										/>
									))}
								</NavTab>
							)
						})}
						<li className={styles.languageSwitcher}>
							<LanguageSwitcher />
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
