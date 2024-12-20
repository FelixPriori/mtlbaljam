'use client'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getSlugFromPathname } from '@/util/navigationUtils'
import { usePathname } from 'next/navigation'
import { NavigationData, PageTabs } from '../Navigation'

export default function NavLinks({
	navigation,
}: {
	navigation: NavigationData
}) {
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const pathname = usePathname()
	const slug = getSlugFromPathname(pathname)

	return (
		<div className={styles.navLinksWrapper}>
			<div className={styles.toasterWrapper}>
				<h2 className={styles.title}>{navigation.title}</h2>
			</div>
			<ul className={styles.navLinks}>
				{Object.keys(navigation).map(tab => {
					const isOpen = tab === toggledTab
					if (tab === 'title') return
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
