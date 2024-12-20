import styles from './styles.module.scss'
import { Fragment } from 'react'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type Values = keyof DictionaryType['codePage']['valuesSection']['values']

const keys: Values[] = ['kindness', 'safety', 'grow']

export default function Values({
	valuesSection,
}: {
	valuesSection: DictionaryType['codePage']['valuesSection']
}) {
	return (
		<section className={styles.valuesSection}>
			<h2>{valuesSection.title}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<Fragment key={key}>
						<h3 className={styles.djName}>{valuesSection.values[key].title}</h3>
						{valuesSection.values[key].content.map(line => (
							<p key={line}>{line}</p>
						))}
					</Fragment>
				))}
			</div>
		</section>
	)
}
