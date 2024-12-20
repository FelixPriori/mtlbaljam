import styles from './styles.module.scss'
import HalfCircle from '@/assets/svgs/half-circle'
import LinesCircle from '@/assets/svgs/lines-circle'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Title({
	visitingPage,
}: {
	visitingPage: DictionaryType['visitingPage']
}) {
	return (
		<div className={styles.titleSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<div className={styles.content}>
				<div className={styles.text}>
					<h2>{visitingPage.title}</h2>
				</div>
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</div>
	)
}
