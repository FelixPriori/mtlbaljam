'use client'
import { useTranslations } from 'next-intl'
import NavLink from '../NavLink'
import styles from './styles.module.scss'
import { useState } from 'react'
import NavTab from '../NavTab'
import { checkIsCurrent, getSlugFromPathname } from '@/util/navigationUtils'
import EventTab from '../EventTab'
import { usePathname } from 'next/navigation'

export default function NavLinks({ pageTabs }: { pageTabs: any }) {
	const t = useTranslations('MtlBalJam.navigation')
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const pathname = usePathname()
	const slug = getSlugFromPathname(pathname)

	return (
		<div className={styles.navLinksWrapper}>
			<div className={styles.toasterWrapper}>
				<h2 className={styles.title}>{t('title')}</h2>
			</div>
			<ul className={styles.navLinks}>
				{Object.keys(pageTabs).map((tab: string) => {
					const isOpen = tab === toggledTab
					if (tab === 'event') {
						return Object.keys(pageTabs[tab]).map((subTab: string) => {
							return (
								<EventTab
									key={subTab}
									tab={subTab}
									parentTab={tab}
									current={slug}
									pageTabs={pageTabs[tab][subTab]}
								/>
							)
						})
					}
					return (
						<NavTab
							key={tab}
							tab={tab}
							isOpen={isOpen}
							setToggledTab={setToggledTab}
						>
							{pageTabs[tab].map((page: any) => (
								<NavLink
									key={page}
									hidden={!isOpen}
									isCurrent={checkIsCurrent(page, slug)}
									href={t(`${tab}.subtabs.${page}.href`)}
									text={t(`${tab}.subtabs.${page}.text`)}
								/>
							))}
						</NavTab>
					)
				})}
			</ul>
		</div>
	)
}
