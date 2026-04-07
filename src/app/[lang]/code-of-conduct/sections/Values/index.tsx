import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export default function Values({ blocks }: { blocks: PortableTextBlock[] }) {
	return (
		<section className={styles.valuesSection}>
			<div className={styles.content}>
				<PortableText value={blocks} />
			</div>
		</section>
	)
}
