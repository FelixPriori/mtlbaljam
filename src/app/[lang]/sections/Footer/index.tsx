import styles from './styles.module.scss'
import IconBox from '../../components/IconBox'

export default function Footer({
	copyright,
	knifeAlt,
}: {
	copyright: string
	knifeAlt: string
}) {
	return (
		<footer className={styles.footer}>
			<p>{copyright}</p>
			<IconBox
				src="/mbj-knife-white.png"
				alt={knifeAlt}
				width={50}
				height={50}
				position="centerLeft"
			/>
		</footer>
	)
}
