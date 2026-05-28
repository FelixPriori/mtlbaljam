'use client'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getDefaultToggledTab } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import type { NavigationConfig, NavSection } from '@/types/navigation'

export default function NavLinks({ config }: { config: NavigationConfig }) {
	const pathname = usePathname()
	const [toggledTab, setToggledTab] = useState<string | null>(
		getDefaultToggledTab(pathname, config)
	)

	const travelSection = config.mainSections.find(s => s.key === 'travel')
	const tabsBeforeTravel = config.mainSections.filter(s => s.key !== 'travel')
	const archiveIsOpen = toggledTab === 'archive'

	const renderSection = (section: NavSection) => {
		const isOpen = section.key === toggledTab
		return (
			<NavTab
				key={section.key}
				tab={section.key}
				isOpen={isOpen}
				setToggledTab={() => setToggledTab(isOpen ? null : section.key)}
				title={section.title}
			>
				{section.subtabs.map(page => (
					<NavLink
						key={page.text}
						hidden={!isOpen}
						isCurrent={checkIsCurrent(page.href, pathname)}
						href={page.href}
						text={page.text}
					/>
				))}
			</NavTab>
		)
	}

	return (
		<div className={styles.navLinksWrapper}>
			<div className={styles.toasterWrapper}>
				<h2 className={styles.title}>{config.menuTitle}</h2>
			</div>
			<ul className={styles.navLinks}>
				{tabsBeforeTravel.map(renderSection)}
				{config.archiveEntries.length > 0 && (
					<NavTab
						tab="archive"
						isOpen={archiveIsOpen}
						setToggledTab={() => setToggledTab(archiveIsOpen ? null : 'archive')}
						title={config.archiveLabel}
					>
						{config.archiveEntries.map(entry => {
							const yearNum = entry.href.split('/').pop() ?? ''
							return (
								<NavLink
									key={entry.key}
									hidden={!archiveIsOpen}
									isCurrent={pathname.split('/').includes(yearNum)}
									href={entry.href}
									text={entry.title}
								/>
							)
						})}
					</NavTab>
				)}
				{travelSection && renderSection(travelSection)}
			</ul>
		</div>
	)
}
