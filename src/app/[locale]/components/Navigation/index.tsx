'use client'
import { usePathname } from 'next/navigation'
import NavLinks from '../../components/NavLinks'
import styles from './styles.module.scss'
import MobileNavigation from '../MobileNavigation'
import LanguageSwitcher from '../LanguageSwitcher'
import { getSlugFromPathname } from '@/util/navigationUtils'

const pageTabs = {
	about: ['about', 'code-of-conduct', 'volunteering'],
	event: {
		2024: [
			'instructors',
			'music',
			'venue',
			'competitions',
			'registration',
			'schedule',
			'extra',
		],
		2025: ['instructors', 'competitions', 'registration'],
	},
	travel: ['visiting', 'travel'],
}

export default function Navigation() {
	return (
		<>
			<nav className={styles.navigation}>
				<LanguageSwitcher />
				<NavLinks pageTabs={pageTabs} />
			</nav>
			<MobileNavigation pageTabs={pageTabs} />
		</>
	)
}
