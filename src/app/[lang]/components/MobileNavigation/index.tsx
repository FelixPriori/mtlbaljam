'use client'
import { useState } from 'react'
import clsx from 'clsx'
import NavTab from '../NavTab'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import LanguageSwitcher from '../LanguageSwitcher'
import { checkIsCurrent } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import type { NavigationConfig, NavSection } from '@/types/navigation'
import { Locales } from '@/i18n'

type MobileNavigationProps = {
	config: NavigationConfig
	lang: Locales
}

export default function MobileNavigation({ config, lang }: MobileNavigationProps) {
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const toggle = () => setIsOpen(!isOpen)
	const pathname = usePathname()

	const travelSection = config.mainSections.find(s => s.key === 'travel')
	const tabsBeforeTravel = config.mainSections.filter(s => s.key !== 'travel')

	const renderSection = (section: NavSection) => {
		const isTabOpen = section.key === toggledTab
		return (
			<NavTab
				key={section.key}
				tab={section.key}
				isOpen={true}
				setToggledTab={() => setToggledTab(isTabOpen ? null : section.key)}
				title={section.title}
				isMobile
			>
				{section.subtabs.map(page => (
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
				className={clsx(styles.mbjButtonContainer, isOpen && styles.active)}
				onClick={toggle}
			>
				<span className={styles.top}></span>
				<span className={styles.middle}></span>
				<span className={styles.bottom}></span>
			</div>
			<div className={clsx(styles.mbjOverlay, isOpen && styles.open)}>
				<nav className={styles.overlayMenu}>
					<h2 className={styles.title}>{config.menuTitle}</h2>

					<ul className={styles.navTabs}>
						{tabsBeforeTravel.map(renderSection)}
						{config.archiveEntries.length > 0 && (
							<NavTab
								tab="archive"
								isOpen={true}
								setToggledTab={() => {}}
								title={config.archiveLabel}
								isMobile
							>
								{config.archiveEntries.map(entry => {
									const yearNum = entry.href.split('/').pop() ?? ''
									return (
										<NavLink
											key={entry.key}
											hidden={false}
											isCurrent={pathname.split('/').includes(yearNum)}
											mobileToggle={toggle}
											href={entry.href}
											text={entry.title}
										/>
									)
								})}
							</NavTab>
						)}
						{travelSection && renderSection(travelSection)}
					</ul>

					<div className={styles.languageSwitcher}>
						<LanguageSwitcher lang={lang} />
					</div>
				</nav>
			</div>
		</>
	)
}
