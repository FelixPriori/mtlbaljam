import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type Departments =
	keyof DictionaryType['volunteeringPage']['volunteeringSection']['departments']

const keys: Departments[] = [
	'reception',
	'maintenance',
	'food',
	'errands',
	'safety',
]

function Department({
	title,
	description,
}: {
	title: string
	description: string
}) {
	return (
		<div className={styles.department}>
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	)
}

export default function Volunteering({
	volunteeringSection,
}: {
	volunteeringSection: DictionaryType['volunteeringPage']['volunteeringSection']
}) {
	return (
		<section className={styles.volunteeringSection}>
			<h2 className={styles.title}>{volunteeringSection.title}</h2>
			<div className={styles.content}>
				<p>{volunteeringSection.description}</p>
				{keys.map(key => (
					<Department
						key={key}
						title={volunteeringSection.departments[key].title}
						description={volunteeringSection.departments[key].description}
					/>
				))}
			</div>
		</section>
	)
}
