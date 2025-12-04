import { Fragment } from 'react'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function ClassDescriptions({
	tracksPage,
}: {
	tracksPage: DictionaryType['mbj2025']['tracksPage']
}) {
	return (
		<section className={styles.classesSection}>
			<h2>{tracksPage.classes.title}</h2>
			<div className={styles.content}>
				<div>
					<h3>{tracksPage.classes.tapas.title}</h3>
					<ol className={styles.classList}>
						{tracksPage.classes.tapas.items.map((classItem, index) => (
							<li key={classItem.title} className={styles.classListItem}>
								<h4>
									{index + 1}. {classItem.teachers} - {classItem.title}
								</h4>
								<p>{classItem.description}</p>
							</li>
						))}
					</ol>
				</div>
				<div>
					<h3>{tracksPage.classes.paella.title}</h3>
					<ol className={styles.classList}>
						{tracksPage.classes.paella.items.map((classItem, index) => (
							<li key={classItem.title} className={styles.classListItem}>
								<h4>
									{index + 1}. {classItem.teachers} - {classItem.title}
								</h4>
								<p>{classItem.description}</p>
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	)
}
