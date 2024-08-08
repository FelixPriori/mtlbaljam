'use client'
import { checkIsCurrent } from '@/util/navigationUtils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import NavLink from '../NavLink'
import NavTab from '../NavTab'

export default function EventTab({
	current,
	pageTabs,
	tab,
	parentTab,
	isMobile = false,
}: {
	current: string
	tab: string
	pageTabs: any
	parentTab: string
	isMobile?: boolean
}) {
	const t = useTranslations('MtlBalJam.navigation')
	const [toggledTab, setToggledTab] = useState<string | null>(null)
	const isOpen = tab === toggledTab

	return (
		<NavTab
			title={t(`${parentTab}.subtabs.${tab}.title`)}
			tab={tab}
			isOpen={isMobile ? true : isOpen}
			isMobile={isMobile}
			setToggledTab={setToggledTab}
		>
			{pageTabs.map((page: any) => (
				<NavLink
					key={page}
					hidden={!isOpen}
					isCurrent={checkIsCurrent(page, current)}
					href={t(`${parentTab}.subtabs.${tab}.${page}.href`)}
					text={t(`${parentTab}.subtabs.${tab}.${page}.text`)}
				/>
			))}
		</NavTab>
	)
}
