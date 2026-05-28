import NavLinks from '../NavLinks'
import styles from './styles.module.scss'
import MobileNavigation from '../MobileNavigation'
import LanguageSwitcher from '../LanguageSwitcher'
import type { NavigationConfig } from '@/types/navigation'
import { Locales } from '@/i18n'

export default function Navigation({
	config,
	lang,
}: {
	config: NavigationConfig
	lang: Locales
}) {
	return (
		<>
			<nav className={styles.navigation}>
				<LanguageSwitcher lang={lang} />
				<NavLinks config={config} />
			</nav>
			<MobileNavigation config={config} lang={lang} />
		</>
	)
}
