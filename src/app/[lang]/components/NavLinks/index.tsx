'use client'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getSlugFromPathname } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import { NavigationData, PageTabs } from '../Navigation'

function getDefaultToggledTab(pathname: string, navigation: string[]) {
	// When the user starts browsing, we need to figure out which navigation
	// section to have expanded. This applies only when the user loads a page
	// directly, coming from an external source.
	//
	// If the user is viewing a page related to a specific event year, we should
	// expand that year's navigation section.
	const yearInPathname = pathname.match(/\d{4}/)
	if (yearInPathname != null && yearInPathname.length > 0) {
		const matchingKeys = navigation.filter(key => key.includes(yearInPathname[0]))
		if (matchingKeys.length == 1) {
			return matchingKeys[0]
		}
	// If the user is on the homepage, we should expand the navigation section
	// for the most recent event (to make the details more discoverable).
	} else if (pathname == "/en" || pathname == "/fr") {
		return navigation.filter(
			key => /\d{4}/.test(key)
		).sort().reverse()[0] ?? null
	}
	// For all other situations, we won't expand any tab by default.
	return null
}

export default function NavLinks({
	navigation,
}: {
	navigation: NavigationData
}) {
	const pathname = usePathname()
	const [toggledTab, setToggledTab] = useState<string | null>(
		getDefaultToggledTab(pathname, Object.keys(navigation))
	)
	const slug = getSlugFromPathname(pathname)

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
									isCurrent={checkIsCurrent(page, slug)}
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
