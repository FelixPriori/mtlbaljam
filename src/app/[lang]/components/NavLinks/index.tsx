'use client'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getDefaultToggledTab, getPastYearKeys, getSortedMainTabs } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import { NavigationData, PageTabs } from '../Navigation'

export default function NavLinks({
	navigation,
}: {
	navigation: NavigationData
}) {
	const pathname = usePathname()
	const [toggledTab, setToggledTab] = useState<string | null>(
		getDefaultToggledTab(pathname, navigation)
	)

	const pastYearKeys = getPastYearKeys(navigation)
	const mainTabs = getSortedMainTabs(navigation)

	const tabsBeforeTravel = mainTabs.filter(tab => tab !== 'travel')
	const hasTravel = mainTabs.includes('travel')
	const archiveIsOpen = toggledTab === 'archive'

	const renderTab = (tab: string) => {
		const isOpen = tab === toggledTab
		return (
			<NavTab
				key={tab}
				tab={tab}
				isOpen={isOpen}
				setToggledTab={() => setToggledTab(isOpen ? null : tab)}
				title={navigation[tab as PageTabs].title}
			>
				{navigation[tab as PageTabs].subtabs.map((page: any) => (
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
				<h2 className={styles.title}>{navigation.title}</h2>
			</div>
			<ul className={styles.navLinks}>
				{tabsBeforeTravel.map(renderTab)}
				{pastYearKeys.length > 0 && (
					<NavTab
						tab="archive"
						isOpen={archiveIsOpen}
						setToggledTab={() => setToggledTab(archiveIsOpen ? null : 'archive')}
						title={navigation.archiveLabel}
					>
						{pastYearKeys.map(key => {
							const yearNum = key.replace('mbj', '')
							const lang = pathname.split('/')[1]
							const href = `/${lang}/${yearNum}`
							return (
								<NavLink
									key={key}
									hidden={!archiveIsOpen}
									isCurrent={pathname.split('/').includes(yearNum)}
									href={href}
									text={navigation[key as PageTabs].title}
								/>
							)
						})}
					</NavTab>
				)}
				{hasTravel && renderTab('travel')}
			</ul>
		</div>
	)
}
