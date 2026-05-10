'use client'
import { useState } from 'react'
import NavTab from '../NavTab'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import LanguageSwitcher from '../LanguageSwitcher'
import { checkIsCurrent, getPastYearKeys, getSortedMainTabs } from '@/util/navigationUtils'
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

	const pastYearKeys = getPastYearKeys(navigation)
	const mainTabs = getSortedMainTabs(navigation)
	const tabsBeforeTravel = mainTabs.filter(tab => tab !== 'travel')
	const hasTravel = mainTabs.includes('travel')

	const renderTab = (tab: string) => {
		const isTabOpen = tab === toggledTab
		return (
			<NavTab
				key={tab}
				tab={tab}
				isOpen={true}
				setToggledTab={() => setToggledTab(isTabOpen ? null : tab)}
				title={navigation[tab as PageTabs].title}
				isMobile
			>
				{navigation[tab as PageTabs].subtabs.map((page: any) => (
					<NavLink
						key={page.text}
						hidden={!isTabOpen}
						isCurrent={checkIsCurrent(page.href, pathname)}
						mobileToggle={toggle}
						href={page.href}
						text={page.text}
					/>
				))}
			</NavTab>
		)
	}

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
						{tabsBeforeTravel.map(renderTab)}
						{pastYearKeys.length > 0 && (
							<NavTab
								tab="archive"
								isOpen={true}
								setToggledTab={() => {}}
								title={navigation.archiveLabel}
								isMobile
							>
								{pastYearKeys.map(key => {
									const yearNum = key.replace('mbj', '')
									const lang = pathname.split('/')[1]
									const href = `/${lang}/${yearNum}`
									return (
										<NavLink
											key={key}
											hidden={false}
											isCurrent={pathname.split('/').includes(yearNum)}
											mobileToggle={toggle}
											href={href}
											text={navigation[key as PageTabs].title}
										/>
									)
								})}
							</NavTab>
						)}
						{hasTravel && renderTab('travel')}
						<li className={styles.languageSwitcher}>
							<LanguageSwitcher lang={lang} />
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}
