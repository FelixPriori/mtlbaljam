import Link from 'next/link'
import styles from './styles.module.scss'

export type OptionProps = {
	name: string
	href: string
	active: boolean
	first?: boolean
	last?: boolean
}

function Option({
	name,
	href,
	active,
	first = false,
	last = false,
}: OptionProps) {
	return (
		<Link
			className={`${styles.option} ${active && styles.active} ${
				first && styles.first
			} ${last && styles.last}`}
			href={href}
		>
			{name}
		</Link>
	)
}

export default function PillRadio({
	options = [],
}: {
	options: OptionProps[]
}) {
	return (
		<div className={styles.pillRadio}>
			{options.map((option, index) => (
				<Option
					key={option.name}
					first={index === 0}
					last={index === options.length - 1}
					{...option}
				/>
			))}
		</div>
	)
}
