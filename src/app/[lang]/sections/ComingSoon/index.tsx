import styles from './styles.module.scss'

export default function ComingSoon({ title, text }: { title?: string | null; text?: string | null }) {
	if (!title && !text) return null
	return (
		<section className={styles.comingSoonSection}>
			{title && <h2>{title}</h2>}
			{text && <p>{text}</p>}
		</section>
	)
}
