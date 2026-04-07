import styles from './styles.module.scss'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export default function Travel({ blocks }: { blocks: PortableTextBlock[] }) {
	return (
		<section className={styles.travelSection}>
			<div className={styles.content}>
				<PortableText
					value={blocks}
					components={{
						marks: {
							link: ({ value, children }) => (
								<a
									href={value?.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{children}
								</a>
							),
						},
					}}
				/>
			</div>
		</section>
	)
}
