import NavLinks from '../NavLinks'
import styles from './styles.module.scss'
import MobileNavigation from '../MobileNavigation'
import LanguageSwitcher from '../LanguageSwitcher'
import { DictionaryType } from '../../dictionaries'
import { Locales } from '@/i18n'

export type NavigationData = DictionaryType['navigation']

export type PageTabs = keyof Omit<NavigationData, 'title'>

export default function Navigation({
	navigation,
	lang,
}: {
	navigation: DictionaryType['navigation']
	lang: Locales
}) {
	return (
		<>
			<nav className={styles.navigation}>
				<LanguageSwitcher lang={lang} />
				<NavLinks navigation={navigation} />
			</nav>
			<MobileNavigation navigation={navigation} lang={lang} />
		</>
	)
}
