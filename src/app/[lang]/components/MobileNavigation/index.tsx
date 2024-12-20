'use client'
import { useState } from 'react'
import NavTab from '../NavTab'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import LanguageSwitcher from '../LanguageSwitcher'
import { checkIsCurrent, getSlugFromPathname } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import { NavigationData, PageTabs } from '../Navigation'
import { Locales } from '@/i18n'

type MobileNavigationProps = {
	navigation: NavigationData
	lang: Locales
}

export default function MobileNavigation({
	navigation,
	lang,
}: MobileNavigationProps) {
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
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
					<h2 className={styles.title}>{navigation.title}</h2>

					<ul className={styles.navTabs}>
						{Object.keys(navigation).map((tab: string) => {
							const isTabOpen = tab === toggledTab
							if (tab === 'title') return
							return (
								<NavTab
									key={tab}
									tab={tab}
									isOpen={true}
									setToggledTab={() => setToggledTab(isOpen ? null : tab)}
									title={navigation[tab as PageTabs].title}
									isMobile
								>
									{navigation[tab as PageTabs].subtabs.map((page: any) => (
										<NavLink
											key={page.text}
											hidden={!isTabOpen}
											isCurrent={checkIsCurrent(page, slug)}
											mobileToggle={toggle}
											href={page.href}
											text={page.text}
										/>
									))}
								</NavTab>
							)
						})}
						<li className={styles.languageSwitcher}>
							<LanguageSwitcher lang={lang} />
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
