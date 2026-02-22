'use client'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getDefaultToggledTab } from '@/util/navigationUtils'
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
	const orderOfNav = Object.keys(navigation)
		.filter(key => key !== 'title')
		.sort((a, b) => {
			if (a === 'about') {
				return -1
			}
			if (a === 'travel') {
				return 1
			}
			const year1 = a.split('202')[1]
			const year2 = b.split('202')[1]
			if (year1 < year2) {
				return 1
			}
			return -1
		})

	return (
		<div className={styles.navLinksWrapper}>
			<div className={styles.toasterWrapper}>
				<h2 className={styles.title}>{navigation.title}</h2>
			</div>
			<ul className={styles.navLinks}>
				{orderOfNav.map(tab => {
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
				})}
			</ul>
		</div>
	)
}
