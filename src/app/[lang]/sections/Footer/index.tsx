import styles from './styles.module.scss'
import IconBox from '../../components/IconBox'
import { DictionaryType } from '../../dictionaries'

export default function Footer({
	copyright,
	iconAlts,
}: {
	copyright: DictionaryType['copyright']
	iconAlts: DictionaryType['iconAlts']
}) {
	return (
		<footer className={styles.footer}>
			<p>{copyright}</p>
			<IconBox
				src="/mbj-knife-white.png"
				alt={iconAlts.knife}
				width={50}
				height={50}
				position="centerLeft"
			/>
		</footer>
	)
}
